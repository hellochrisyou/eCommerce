using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace CYouEcommerce.Core.EFTables
{
    public class Order
    {
        public int Id { get; set; }
        public Account AccountInfoOrder { get; set; }
        public int AccountInfoOrderId { get; set; }
        [Required]        
        public int Order_Number { get; set; }
        // [Required]                
        // public DateTime Date { get; set; }       
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
    }
}