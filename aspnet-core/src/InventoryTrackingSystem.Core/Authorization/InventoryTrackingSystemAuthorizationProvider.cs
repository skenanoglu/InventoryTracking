using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace InventoryTrackingSystem.Authorization
{
    public class InventoryTrackingSystemAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Users_Activation, L("UsersActivation"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Companies, L("Kurumlar"));
            context.CreatePermission(PermissionNames.Pages_Products, L("Ürünler"));
            context.CreatePermission(PermissionNames.Pages_PersonalDebits, L("Kişisel Zimmet"));
            context.CreatePermission(PermissionNames.Pages_CorporateDebits, L("Kurumsal Zimmet"));
            context.CreatePermission(PermissionNames.Pages_Damage, L("Hasar"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, InventoryTrackingSystemConsts.LocalizationSourceName);
        }
    }
}
