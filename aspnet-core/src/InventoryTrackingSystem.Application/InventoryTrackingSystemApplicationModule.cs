using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using InventoryTrackingSystem.Authorization;

namespace InventoryTrackingSystem
{
    [DependsOn(
        typeof(InventoryTrackingSystemCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class InventoryTrackingSystemApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<InventoryTrackingSystemAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(InventoryTrackingSystemApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
