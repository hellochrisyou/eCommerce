using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace CYouEcommerce.Core.EFTables
{
    public class Account
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Email { get; set; }        
        public ICollection<Order> Orders { get; set; }
        public ICollection<SaleItem> ItemForSales { get; set; }

        public Account()
        {
            Orders = new Collection<Order>();
            ItemForSales = new Collection<SaleItem>();            
            
        }
    }
}