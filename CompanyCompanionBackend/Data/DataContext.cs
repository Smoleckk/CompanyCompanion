using CompanyCompanionBackend.Models.CompanyModel;
using CompanyCompanionBackend.Models.CustomerModel;
using CompanyCompanionBackend.Models.InvoiceModel;
using CompanyCompanionBackend.Models.ProdMagazine;
using CompanyCompanionBackend.Models.UserModel;
using Microsoft.EntityFrameworkCore;

namespace CompanyCompanionBackend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options) { }

        public DbSet<Company> Companies { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<ProductMagazine> ProductMagazines { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Company>().HasMany(c => c.Users).WithOne(e => e.Company);
            //.OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<User>().HasOne(e => e.Company).WithMany(c => c.Users);
            //.OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Company>().HasMany(c => c.Invoices).WithOne(e => e.Company);
            //.OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Invoice>().HasOne(e => e.Company).WithMany(c => c.Invoices);
            //.OnDelete(DeleteBehavior.SetNull);
        }
    }
}
