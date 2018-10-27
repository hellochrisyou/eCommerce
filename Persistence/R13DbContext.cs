using System.Linq;
using Microsoft.EntityFrameworkCore;
using CYouEcommerce.Core.EFTables;
using CYouEcommerce.Core.EFTables.Hardware;

namespace CYouEcommerce.Persistence
{
    public class R13DbContext :DbContext
    {
        public DbSet<Case> Cases { get; set; }
        public DbSet<Coolingfan> CoolingFans { get; set; }
        public DbSet<CPU> CPUs { get; set; }
        public DbSet<GPU> GPUs { get; set; }
        public DbSet<Motherboard> Motherboards { get; set; }
        public DbSet<Powersupply> PowerSupplys { get; set; }
        public DbSet<RAM> RAMs { get; set; }
        public DbSet<Storage> Storages { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<SaleItem> SaleItems { get; set; } 
        public DbSet<Order> Orders { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public R13DbContext(DbContextOptions<R13DbContext> options):base(options) {}        
        

    }

}