using System.Collections.Generic;
using System.Collections.ObjectModel;
using CYouEcommerce.Core.EFTables;
using CYouEcommerce.Core.EFTables.Hardware;
using CYouEcommerce.Persistence;

namespace CyouEcommerce.Controllers.Resources
{
    public class SaleItemResource
    {
        public int Id { get; set; }
        public Account AccountSaleItem { get; set; } 
        public int AccountSaleItemId { get; set; }
        public string Type { get; set; }
        public string SellerName { get; set; }
        public string CPU { get; set; } 
        public string Motherboard { get; set; }
        public string RAM { get; set; } 
        public string Storage { get; set; }
        public string GPU { get; set; } 
        public string Power_Supply { get; set; }
        public string Cooling_Fan { get; set; } 
        public string Case { get; set; }
        public float Total_Price { get; set; }         
        public ICollection<PhotoResource> Photos { get; set; }        
        public SaleItemResource()
        {
            Photos = new Collection<PhotoResource>();     
        }
    }
}