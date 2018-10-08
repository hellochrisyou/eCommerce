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
     [Route("/api/CPU")]
    public class CPUController : Controller
    {
        private readonly IMapper mapper;
        private readonly R13DbContext context;
        public CPUController(IMapper mapper, R13DbContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }
        [HttpPost]
        public async Task<IActionResult> CreateCPU ([FromBody] KeyValuePairResource KeyValuePairResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var cpu = mapper.Map<KeyValuePairResource, CPU>(KeyValuePairResource);
            context.CPUs.Add(cpu);
            await context.SaveChangesAsync();
            var result = mapper.Map<CPU, KeyValuePairResource>(cpu);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCPU (int id, [FromBody] KeyValuePairResource KeyValuePairResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var cpu = await context.CPUs.FindAsync(id);

            if (cpu == null)
            return NotFound();
            
            mapper.Map<KeyValuePairResource, CPU>(KeyValuePairResource, cpu);
            await context.SaveChangesAsync();
            var result = mapper.Map<CPU, KeyValuePairResource>(cpu);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCPU(int id)
        {
            var cpu = await context.CPUs.FindAsync(id);

            if (cpu == null)
            return NotFound();

            context.Remove(cpu);
            await context.SaveChangesAsync();

            return Ok(id);
        }

        [HttpGet]
        public async Task<IEnumerable<KeyValuePairResource>> GetCPU()
        {
            var features = await context.CPUs.ToListAsync();
      
            return mapper.Map<List<CPU>, List<KeyValuePairResource>>(features);
        }
    }
}