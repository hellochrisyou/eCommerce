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
    [Route("/api/RAM")]
    public class RAMController : Controller
    {
        private readonly IMapper mapper;
        private readonly R13DbContext context;
        public RAMController(IMapper mapper, R13DbContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }
        [HttpPost]
        public async Task<IActionResult> CreateRam ([FromBody] KeyValuePairResource KeyValuePairResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var ram = mapper.Map<KeyValuePairResource, RAM> (KeyValuePairResource);
            context.RAMs.Add(ram);
            await context.SaveChangesAsync();
            var result = mapper.Map<RAM, KeyValuePairResource>(ram);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRam (int id, [FromBody] KeyValuePairResource KeyValuePairResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var ram = await context.RAMs.FindAsync(id);

            if (ram == null)
            return NotFound();
            
            mapper.Map<KeyValuePairResource, RAM> (KeyValuePairResource, ram);
            await context.SaveChangesAsync();
            var result = mapper.Map<RAM, KeyValuePairResource>(ram);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRam(int id)
        {
            var ram = await context.RAMs.FindAsync(id);

            if (ram == null)
            return NotFound();

            context.Remove(ram);
            await context.SaveChangesAsync();

            return Ok(id);
        }

        [HttpGet]
        public async Task<IEnumerable<KeyValuePairResource>> GetRam()
        {
            var features = await context.RAMs.ToListAsync();      
            return mapper.Map<List<RAM>, List<KeyValuePairResource>>(features);
        }
    }
}