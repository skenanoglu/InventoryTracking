using System.Threading.Tasks;
using Abp.Application.Services;
using InventoryTrackingSystem.Sessions.Dto;

namespace InventoryTrackingSystem.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
