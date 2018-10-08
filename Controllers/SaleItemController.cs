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
    [Route("/api/ItemForSale")]
    public class SaleItemController : Controller
    {
        private readonly IMapper mapper;
        private readonly R13DbContext context;
        public SaleItemController(IMapper mapper, R13DbContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }
        [HttpPost]
        public async Task<IActionResult> CreateSaleItem([FromBody] SaleItemResource saleItemResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var saleItem = mapper.Map<SaleItemResource, SaleItem>(saleItemResource);
            context.SaleItems.Add(saleItem);
            await context.SaveChangesAsync();
            var result = mapper.Map<SaleItem, SaleItemResource>(saleItem);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSaleItem(int id, [FromBody] SaleItemResource saleItemResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var saleItem = await context.SaleItems.FindAsync(id);

            if (saleItem == null)
                return NotFound();

            mapper.Map<SaleItemResource, SaleItem>(saleItemResource, saleItem);
            await context.SaveChangesAsync();
            var result = mapper.Map<SaleItem, SaleItemResource>(saleItem);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSaleItem(int id)
        {
            var saleItem = await context.SaleItems.FindAsync(id);

            if (saleItem == null)
                return NotFound();

            context.Remove(saleItem);
            await context.SaveChangesAsync();

            return Ok(id);
        }

        [HttpGet]
        public async Task<IEnumerable<SaleItemResource>> GetAllSaleItem()
        {
            var saleItems = await context.SaleItems.ToListAsync();
            return mapper.Map<List<SaleItem>, List<SaleItemResource>>(saleItems);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSaleItem(int id)
        {
            var saleItem = await GetSaleItemTask(id);

            if (saleItem == null)
                return NotFound();

            var saleResource = mapper.Map<SaleItem, SaleItemResource>(saleItem);

            return Ok(saleResource);
        }

        public async Task<SaleItem> GetSaleItemTask(int id)
        {
            return await context.SaleItems.FindAsync(id);
        }
    }
}