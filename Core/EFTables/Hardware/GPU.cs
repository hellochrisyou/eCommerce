using System.ComponentModel.DataAnnotations;

namespace CYouEcommerce.Core.EFTables.Hardware
{
    public class GPU
    {
        public int Id { get; set; }   
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        [Required]        
        public float Price { get; set; }
        public string Brand { get; set; }
        public string Series { get; set; }
        public string Model { get; set; }
        public string Details { get; set; }
    }
}