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
    [Route("/api/CoolingFan")]
    public class CoolingFanController : Controller
    {
        private readonly IMapper mapper;
        private readonly R13DbContext context;
        public CoolingFanController(IMapper mapper, R13DbContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }
        [HttpPost]
        public async Task<IActionResult> CreateCoolingFan ([FromBody] KeyValuePairResource KeyValuePairResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var coolingFan = mapper.Map<KeyValuePairResource, Coolingfan>(KeyValuePairResource);
            context.CoolingFans.Add(coolingFan);
            await context.SaveChangesAsync();
            var result = mapper.Map<Coolingfan, KeyValuePairResource>(coolingFan);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCoolingFan (int id, [FromBody] KeyValuePairResource KeyValuePairResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var coolingFan = await context.CoolingFans.FindAsync(id);

            if (coolingFan == null)
            return NotFound();
            
            mapper.Map<KeyValuePairResource, Coolingfan>(KeyValuePairResource, coolingFan);
            await context.SaveChangesAsync();
            var result = mapper.Map<Coolingfan, KeyValuePairResource>(coolingFan);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCoolingFan(int id)
        {
            var coolingFan = await context.CoolingFans.FindAsync(id);

            if (coolingFan == null)
            return NotFound();

            context.Remove(coolingFan);
            await context.SaveChangesAsync();

            return Ok(id);
        }

        [HttpGet]        public async Task<IEnumerable<KeyValuePairResource>> GetCoolingFan()
        {
            var features = await context.CoolingFans.ToListAsync();
      
            return mapper.Map<List<Coolingfan>, List<KeyValuePairResource>>(features);
        }
    }
}