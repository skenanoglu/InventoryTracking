using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using InventoryTrackingSystem.EntityFrameworkCore;
using InventoryTrackingSystem.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace InventoryTrackingSystem.Web.Tests
{
    [DependsOn(
        typeof(InventoryTrackingSystemWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class InventoryTrackingSystemWebTestModule : AbpModule
    {
        public InventoryTrackingSystemWebTestModule(InventoryTrackingSystemEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(InventoryTrackingSystemWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(InventoryTrackingSystemWebMvcModule).Assembly);
        }
    }
}