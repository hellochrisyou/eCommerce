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
     [Route("/api/GPU")]
    public class GPUController : Controller
    {
        private readonly IMapper mapper;
        private readonly R13DbContext context;
        public GPUController(IMapper mapper, R13DbContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }
        [HttpPost]
        public async Task<IActionResult> CreateGPU ([FromBody] KeyValuePairResource KeyValuePairResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var gpu = mapper.Map<KeyValuePairResource, GPU>(KeyValuePairResource);
            context.GPUs.Add(gpu);
            await context.SaveChangesAsync();
            var result = mapper.Map<GPU, KeyValuePairResource>(gpu);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGPU (int id, [FromBody] KeyValuePairResource KeyValuePairResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var gpu = await context.GPUs.FindAsync(id);

            if (gpu == null)
            return NotFound();
            
            mapper.Map<KeyValuePairResource, GPU>(KeyValuePairResource, gpu);
            await context.SaveChangesAsync();
            var result = mapper.Map<GPU, KeyValuePairResource>(gpu);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGPU(int id)
        {
            var gpu = await context.GPUs.FindAsync(id);

            if (gpu == null)
            return NotFound();

            context.Remove(gpu);
            await context.SaveChangesAsync();

            return Ok(id);
        }

        [HttpGet]
        public async Task<IEnumerable<KeyValuePairResource>> GetGPU()
        {
            var features = await context.GPUs.ToListAsync();      
            return mapper.Map<List<GPU>, List<KeyValuePairResource>>(features);
        }
    }
}