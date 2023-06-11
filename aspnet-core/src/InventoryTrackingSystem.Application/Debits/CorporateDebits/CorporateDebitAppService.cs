using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using InventoryTrackingSystem.Authorization;
using InventoryTrackingSystem.Debits.Dto;

namespace InventoryTrackingSystem.Debits.CorporateDebits
{
    [AbpAuthorize(PermissionNames.Pages_CorporateDebits)]
    public class CorporateDebitAppService : AsyncCrudAppService<CorporateDebit, CorporateDebitDto, int, CorporateDebitDto, CorporateDebitDto, CorporateDebitDto>, ICorporateDebitAppService
    {
        public CorporateDebitAppService(IRepository<CorporateDebit, int> repository) : base(repository)
        {
        }
    }
}
