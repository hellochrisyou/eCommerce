using System.ComponentModel.DataAnnotations;

namespace CYouEcommerce.Core.EFTables
{
    public class Photo
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string FileName { get; set; }
        public int itemId { get; set; }
    }
}