using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace InventoryTrackingSystem.EntityFrameworkCore
{
    public static class InventoryTrackingSystemDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<InventoryTrackingSystemDbContext> builder, string connectionString)
        {
            builder.UseNpgsql(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<InventoryTrackingSystemDbContext> builder, DbConnection connection)
        {
            builder.UseNpgsql(connection);
        }
    }
}
