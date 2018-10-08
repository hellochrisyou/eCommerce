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
        public string Name { get; set; }
        [Required]
        [StringLength(255)]
        public string Address { get; set; }
        [Required]
        [StringLength(255)]
        public string Email { get; set; }
        [Required]
        [StringLength(20)]
        public string Phone { get; set; }
        [Required]
        [StringLength(255)]
        public string Username { get; set; }
        [Required]
        [StringLength(255)]
        public string Password { get; set; }        

        public ICollection<Order> Orders { get; set; }
        public ICollection<SaleItem> ItemForSales { get; set; }

        public Account()
        {
            Orders = new Collection<Order>();
            ItemForSales = new Collection<SaleItem>();            
            
        }
    }
}