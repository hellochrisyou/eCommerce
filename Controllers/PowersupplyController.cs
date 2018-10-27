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
    [Route("/api/PowerSupply")]
    public class PowerSupplyController : Controller
    {
        private readonly IMapper mapper;
        private readonly R13DbContext context;
        public PowerSupplyController(IMapper mapper, R13DbContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }
        [HttpPost]
        public async Task<IActionResult> CreatePowerSupply ([FromBody] KeyValuePairResource KeyValuePairResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var powerSupply = mapper.Map<KeyValuePairResource, Powersupply>(KeyValuePairResource);
            context.PowerSupplys.Add(powerSupply);
            await context.SaveChangesAsync();
            var result = mapper.Map<Powersupply, KeyValuePairResource>(powerSupply);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePowerSupply (int id, [FromBody] KeyValuePairResource KeyValuePairResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var powerSupply = await context.PowerSupplys.FindAsync(id);

            if (powerSupply == null)
            return NotFound();
            
            mapper.Map<KeyValuePairResource, Powersupply>(KeyValuePairResource, powerSupply);
            await context.SaveChangesAsync();
            var result = mapper.Map<Powersupply, KeyValuePairResource>(powerSupply);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePowerSupply(int id)
        {
            var powerSupply = await context.PowerSupplys.FindAsync(id);

            if (powerSupply == null)
            return NotFound();

            context.Remove(powerSupply);
            await context.SaveChangesAsync();

            return Ok(id);
        }

        [HttpGet]
        public async Task<IEnumerable<KeyValuePairResource>> GetPowerSupply()
        {
            var features = await context.PowerSupplys.ToListAsync();      
            return mapper.Map<List<Powersupply>, List<KeyValuePairResource>>(features);
        }
    }
}