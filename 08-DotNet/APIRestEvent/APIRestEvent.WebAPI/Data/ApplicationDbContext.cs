using APIRestEvent.WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace APIRestEvent.WebAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Event> Events { get; set; }
        public DbSet<Participant> Participants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Event>()
                .HasMany(e => e.Participants)
                .WithMany(p => p.Events);

            modelBuilder.Entity<Event>()
                .Property(e => e.StartDate)
                .HasColumnType("date");

            modelBuilder.Entity<Event>()
                .Property(e => e.EndDate)
                .HasColumnType("date")
                .IsRequired(false)
                .HasDefaultValue(null)
                .HasAnnotation("CheckConstraint", "EndDate >= StartDate");
        }
    }
}