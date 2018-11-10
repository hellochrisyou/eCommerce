using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using CyouEcommerce.Controllers.Resources;
using CYouEcommerce.Core.EFTables;
using CYouEcommerce.Core.EFTables.Hardware;
using CYouEcommerce.Persistence;

namespace CyouEcommerce.Controllers
{
    [Route("/api/ItemForSale/{itemId}/photos")]
    public class PhotosController : Controller
    {
        
        public readonly IHostingEnvironment host;
        private readonly IMapper mapper;
        private readonly PhotoSettings photoSettings;
        public R13DbContext context { get; set; }
        public PhotosController(IHostingEnvironment host, R13DbContext context, IMapper mapper, IOptionsSnapshot<PhotoSettings> options)
        {
            this.context = context;
            this.photoSettings = options.Value;
            this.mapper = mapper;        
            this.host = host;
        }        

        [HttpGet]
        public async Task<IEnumerable<PhotoResource>> GetPhotos(int itemId)
        {
            var photos = await GetTaskPhotos(itemId);

            return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int itemId, IFormFile file)
        {
            var saleItem = await GetSaleItem(itemId);
            if (saleItem == null)
            {
                return NotFound();
            }

            if (file == null) return BadRequest("Null file");
            if (file.Length == 0) return BadRequest("Empty file");
            if (file.Length > photoSettings.MaxBytes) return BadRequest("Max file size exceeded");
            if (!photoSettings.IsSupported(file.FileName)) return BadRequest("Invalide file type");

            var uploadsFolderePath = Path.Combine(host.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolderePath))
            {
                Directory.CreateDirectory(uploadsFolderePath);
            }

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolderePath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            //generate thumbnail Here? System.Drawing 

            var photo = new Photo { FileName = fileName, itemId = itemId };
            saleItem.Photos.Add(photo);
            await CompleteAsync();

            return Ok(mapper.Map<Photo, PhotoResource>(photo));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhotoItem(int id)
        {
            var photoItem = await context.Photos
                .Where(p => p.itemId == id)
                .ToListAsync();
            
            if (photoItem == null)
            {
                return Ok(id);            
            }
            
            foreach (var tmp in photoItem) 
            {
                context.Remove(tmp);    
            }                                  

            await context.SaveChangesAsync();
            
            return Ok(id);
        }
        public async Task<SaleItem> GetSaleItem(int id)
        {
            return await context.SaleItems.FindAsync(id);
        }
        public async Task CompleteAsync()
        {
        await context.SaveChangesAsync();
        }                
        public async Task<IEnumerable<Photo>> GetTaskPhotos(int itemId)
        {
            return await context.Photos
                .Where(p => p.itemId == itemId)
                .ToListAsync(); 
        }
    }
}