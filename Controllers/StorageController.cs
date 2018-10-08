using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CyouEcommerce.Controllers.Resources;
using CYouEcommerce.Core.EFTables;
using CYouEcommerce.Core.EFTables.Hardware;
using CYouEcommerce.Persistence;

namespace CyouEcommerce.Controllers
{
    [Route("/api/Storage")]
    public class StorageController : Controller
    {
        private readonly IMapper mapper;
        private readonly R13DbContext context;
        public StorageController(IMapper mapper, R13DbContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }
        [HttpPost]
        public async Task<IActionResult> CreateStorage ([FromBody] KeyValuePairResource KeyValuePairResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var storage = mapper.Map<KeyValuePairResource, Storage>(KeyValuePairResource);
            context.Storages.Add(storage);
            await context.SaveChangesAsync();
            var result = mapper.Map<Storage, KeyValuePairResource>(storage);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStorage (int id, [FromBody] KeyValuePairResource KeyValuePairResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var storage = await context.Storages.FindAsync(id);
            
            if (storage == null)
            return NotFound();
            
            mapper.Map<KeyValuePairResource, Storage>(KeyValuePairResource, storage);
            await context.SaveChangesAsync();
            var result = mapper.Map<Storage, KeyValuePairResource>(storage);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStorage(int id)
        {
            var storage = await context.Storages.FindAsync(id);

            if (storage == null)
            return NotFound();

            context.Remove(storage);
            await context.SaveChangesAsync();

            return Ok(id);
        }

        [HttpGet]
        public async Task<IEnumerable<KeyValuePairResource>> GetStorage()
        {
            var features = await context.Storages.ToListAsync();
      
            return mapper.Map<List<Storage>, List<KeyValuePairResource>>(features); 
        }
    }
}