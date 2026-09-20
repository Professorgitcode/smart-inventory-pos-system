using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<User> Users { get; set; }


        // ====================================
        // DATABASE MODEL CONFIGURATION
        // ====================================

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ====================================
            // USER CONFIGURATION
            // ====================================

            // Each username must be unique.
            // This prevents two users from having
            // the same login username.
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();
        }

    }
}
