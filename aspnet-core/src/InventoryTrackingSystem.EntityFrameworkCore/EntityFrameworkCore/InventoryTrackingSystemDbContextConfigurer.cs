using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace InventoryTrackingSystem.EntityFrameworkCore
{
    public static class InventoryTrackingSystemDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<InventoryTrackingSystemDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<InventoryTrackingSystemDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
