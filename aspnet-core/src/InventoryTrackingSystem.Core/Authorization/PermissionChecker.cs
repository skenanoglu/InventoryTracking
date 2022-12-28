using Abp.Authorization;
using InventoryTrackingSystem.Authorization.Roles;
using InventoryTrackingSystem.Authorization.Users;

namespace InventoryTrackingSystem.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
