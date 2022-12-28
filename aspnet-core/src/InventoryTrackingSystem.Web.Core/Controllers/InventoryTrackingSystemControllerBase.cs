using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace InventoryTrackingSystem.Controllers
{
    public abstract class InventoryTrackingSystemControllerBase: AbpController
    {
        protected InventoryTrackingSystemControllerBase()
        {
            LocalizationSourceName = InventoryTrackingSystemConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
