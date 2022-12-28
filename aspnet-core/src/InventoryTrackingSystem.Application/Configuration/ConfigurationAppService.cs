using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using InventoryTrackingSystem.Configuration.Dto;

namespace InventoryTrackingSystem.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : InventoryTrackingSystemAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
