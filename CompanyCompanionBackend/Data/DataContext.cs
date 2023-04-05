using CompanyCompanionBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace CompanyCompanionBackend.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Company> Companies { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
