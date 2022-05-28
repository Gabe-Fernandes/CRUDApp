using Microsoft.EntityFrameworkCore;
using CRUDApp.Models;
namespace CRUDApp.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

    public DbSet<Study> Studies { get; set; }
}
