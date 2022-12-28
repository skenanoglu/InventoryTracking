using System.Threading.Tasks;
using InventoryTrackingSystem.Configuration.Dto;

namespace InventoryTrackingSystem.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
