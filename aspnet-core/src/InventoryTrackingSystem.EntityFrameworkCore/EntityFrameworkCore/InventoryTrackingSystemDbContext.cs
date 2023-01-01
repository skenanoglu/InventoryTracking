﻿using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using InventoryTrackingSystem.Authorization.Roles;
using InventoryTrackingSystem.Authorization.Users;
using InventoryTrackingSystem.MultiTenancy;
using System;

namespace InventoryTrackingSystem.EntityFrameworkCore
{
    public class InventoryTrackingSystemDbContext : AbpZeroDbContext<Tenant, Role, User, InventoryTrackingSystemDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public InventoryTrackingSystemDbContext(DbContextOptions<InventoryTrackingSystemDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);


        }
    }
}
