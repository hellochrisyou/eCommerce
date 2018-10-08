using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace CYouEcommerce.Core.EFTables
{
    public class SaleItem
    {
        public int Id { get; set; }
        public Account AccountSaleItem { get; set; } 
        public int AccountSaleItemId { get; set; }        
        [Required]
        [StringLength(255)]
        public string SellerName { get; set; }
        [Required]
        [StringLength(255)]
        public string Type { get; set; }
        [Required]
        [StringLength(255)]
        public string CPU { get; set; } 
        [Required]
        [StringLength(255)]
        public string Motherboard { get; set; }
        [Required]
        [StringLength(255)]
        public string RAM { get; set; } 
        [Required]
        [StringLength(255)]
        public string Storage { get; set; }
        [Required]
        [StringLength(255)]
        public string GPU { get; set; } 
        [Required]
        [StringLength(255)]
        public string Power_Supply { get; set; }
        [Required]
        [StringLength(255)]
        public string Cooling_Fan { get; set; } 
        [Required]
        [StringLength(255)]
        public string Case { get; set; }
        [Required]        
        public float Total_Price { get; set; }     
        public ICollection<Photo> Photos { get; set; }

        public SaleItem()
        {
            Photos = new Collection<Photo>();
        }
    }
}