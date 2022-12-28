using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using InventoryTrackingSystem.Configuration;

namespace InventoryTrackingSystem.Web.Host.Startup
{
    [DependsOn(
       typeof(InventoryTrackingSystemWebCoreModule))]
    public class InventoryTrackingSystemWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public InventoryTrackingSystemWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(InventoryTrackingSystemWebHostModule).GetAssembly());
        }
    }
}
