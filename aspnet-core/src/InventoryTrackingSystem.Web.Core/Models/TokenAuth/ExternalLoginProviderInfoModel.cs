using Abp.AutoMapper;
using InventoryTrackingSystem.Authentication.External;

namespace InventoryTrackingSystem.Models.TokenAuth
{
    [AutoMapFrom(typeof(ExternalLoginProviderInfo))]
    public class ExternalLoginProviderInfoModel
    {
        public string Name { get; set; }

        public string ClientId { get; set; }
    }
}
