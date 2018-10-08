using System.Collections.Generic;
using System.Collections.ObjectModel;
using CYouEcommerce.Core.EFTables;
using CYouEcommerce.Core.EFTables.Hardware;
using CYouEcommerce.Persistence;
namespace CyouEcommerce.Controllers.Resources
{
    public class AccountResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Username { get; set; }
        public string Password { get; set; } 
        public ICollection<OrderResource> Orders { get; set; }
        public ICollection<SaleItemResource> ItemForSales { get; set; }        
        public AccountResource()
        {
            Orders = new Collection<OrderResource>();
            ItemForSales = new Collection<SaleItemResource>();
        }
    }
}