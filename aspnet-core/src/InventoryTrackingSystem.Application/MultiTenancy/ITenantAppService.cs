using Abp.Application.Services;
using InventoryTrackingSystem.MultiTenancy.Dto;

namespace InventoryTrackingSystem.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

