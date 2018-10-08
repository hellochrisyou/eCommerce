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
     [Route("/api/Case")]
    public class CaseController : Controller
    {
        private readonly IMapper mapper;
        private readonly R13DbContext context;
        public CaseController(IMapper mapper, R13DbContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }
        [HttpPost]
        public async Task<IActionResult> CreateCase ([FromBody] KeyValuePairResource KeyValuePairResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var caseObject = mapper.Map<KeyValuePairResource, Case>(KeyValuePairResource);
            context.Cases.Add(caseObject);
            await context.SaveChangesAsync();
            var result = mapper.Map<Case, KeyValuePairResource>(caseObject);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCase (int id, [FromBody] KeyValuePairResource KeyValuePairResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var caseObject =await context.Cases.FindAsync(id);

            if (caseObject == null)
            return NotFound();
            
             mapper.Map<KeyValuePairResource, Case>(KeyValuePairResource, caseObject);
            await context.SaveChangesAsync();
            var result = mapper.Map<Case, KeyValuePairResource>(caseObject);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCase(int id)
        {
            var caseObject = await context.Cases.FindAsync(id);

            if (caseObject == null)
            return NotFound();

            context.Remove(caseObject);
            await context.SaveChangesAsync();

            return Ok(id);
        }

        [HttpGet]
        public async Task<IEnumerable<KeyValuePairResource>> GetCase()
        {
            var features = await context.Cases.ToListAsync();
      
            return mapper.Map<List<Case>, List<KeyValuePairResource>>(features);
        }
    }
}