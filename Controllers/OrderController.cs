using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CyouEcommerce.Controllers.Resources;
using CYouEcommerce.Core.EFTables;
using CYouEcommerce.Core.EFTables.Hardware;
using CYouEcommerce.Persistence;

namespace CyouEcommerce.Controllers
{
     [Route("/api/Order")]
    public class OrderController : Controller
    {
        private readonly IMapper mapper;
        private readonly R13DbContext context;
        public OrderController(IMapper mapper, R13DbContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }
        [HttpPost]
        public async Task<IActionResult> CreateOrder ([FromBody] OrderResource orderResource)
        {
            // if (!ModelState.IsValid)
            // {
            //     return BadRequest(ModelState);
            // }
            var order = mapper.Map<OrderResource, Order>(orderResource);

            var dateAndTime = DateTime.Now;
            order.OrderDate = dateAndTime.Date;
            
            context.Orders.Add(order);
            await context.SaveChangesAsync();
            var result = mapper.Map<Order, OrderResource>(order);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder (int id, [FromBody] OrderResource orderResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var order = await context.Orders.FindAsync(id);
            
            if (order == null)
            return NotFound();
            
            mapper.Map<OrderResource, Order>(orderResource, order);
            await context.SaveChangesAsync();
            var result = mapper.Map<Order, OrderResource>(order);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await context.Orders.FindAsync(id);

            if (order == null)
            return NotFound();

            context.Remove(order);
            await context.SaveChangesAsync();

            return Ok(id);
        }

        [HttpGet]
        public async Task<IEnumerable<OrderResource>> GetOrder(int id)
        {
            var order = await context.Orders.ToListAsync();      
            return mapper.Map<List<Order>, List<OrderResource>>(order);           
        }
    }
}