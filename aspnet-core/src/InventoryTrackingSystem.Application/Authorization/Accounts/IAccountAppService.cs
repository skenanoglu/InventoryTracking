using System.Threading.Tasks;
using Abp.Application.Services;
using InventoryTrackingSystem.Authorization.Accounts.Dto;

namespace InventoryTrackingSystem.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
