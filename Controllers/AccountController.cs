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
    [Route("/api/Account")]
    public class AccoutnController : Controller
    {
        private readonly IMapper mapper;
        private readonly R13DbContext context;

        public AccoutnController(IMapper mapper, R13DbContext context)
        {
            this.context = context;
            this.mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> CreateAccount([FromBody] AccountResource accountResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var accountInfo = mapper.Map<AccountResource, Account>(accountResource);
            context.Accounts.Add(accountInfo);
            await context.SaveChangesAsync();
            var result = mapper.Map<Account, AccountResource>(accountInfo);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> CreateAccountInfo(int id, [FromBody] AccountResource accountInfoResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var account = await context.Accounts.FindAsync(id);

            if (account == null)
            return NotFound();
            
            mapper.Map<AccountResource, Account>(accountInfoResource, account);
            await context.SaveChangesAsync();
            var result = mapper.Map<Account, AccountResource>(account);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccountInfo(int id)
        {
            var account = await context.Accounts.FindAsync(id);

            if (account == null)
            return NotFound();

            context.Remove(account);
            await context.SaveChangesAsync();

            return Ok(id);
        }

        [HttpGet]
        public async Task<IEnumerable<AccountResource>> GetAccountInfo()
        {
            var features = await context.Accounts.ToListAsync();
      
            return mapper.Map<List<Account>, List<AccountResource>>(features);
        }
    }
}