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
    [Route("/api/Motherboard")]
    public class MotherboardController : Controller
    {
        private readonly IMapper mapper;
        private readonly R13DbContext context;
        public MotherboardController(IMapper mapper, R13DbContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }
        [HttpPost]
        public async Task<IActionResult> CreateMotherboard ([FromBody] KeyValuePairResource KeyValuePairResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var motherboard = mapper.Map<KeyValuePairResource, Motherboard>(KeyValuePairResource);
            context.Motherboards.Add(motherboard);
            await context.SaveChangesAsync();
            var result = mapper.Map<Motherboard, KeyValuePairResource>(motherboard);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMotherboard (int id, [FromBody] KeyValuePairResource KeyValuePairResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var motherboard = await context.Motherboards.FindAsync(id);

            if (motherboard == null)
            return NotFound();
            
            mapper.Map<KeyValuePairResource, Motherboard>(KeyValuePairResource, motherboard);
            await context.SaveChangesAsync();
            var result = mapper.Map<Motherboard, KeyValuePairResource>(motherboard);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMotherboard(int id)
        {
            var motherboard = await context.Motherboards.FindAsync(id);

            if (motherboard == null)
            return NotFound();

            context.Remove(motherboard);
            await context.SaveChangesAsync();

            return Ok(id);
        }

        [HttpGet]
        public async Task<IEnumerable<KeyValuePairResource>> GetMotherboard()
        {
            var features = await context.Motherboards.ToListAsync();
      
            return mapper.Map<List<Motherboard>, List<KeyValuePairResource>>(features);
        }
    }
}