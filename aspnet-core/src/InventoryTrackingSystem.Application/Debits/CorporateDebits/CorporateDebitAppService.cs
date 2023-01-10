using Abp.Application.Services;
using Abp.Domain.Repositories;
using InventoryTrackingSystem.Debits.Dto;

namespace InventoryTrackingSystem.Debits.CorporateDebits
{
    public class CorporateDebitAppService : AsyncCrudAppService<CorporateDebit, CorporateDebitDto, int, CorporateDebitDto, CorporateDebitDto, CorporateDebitDto>, ICorporateDebitAppService
    {
        public CorporateDebitAppService(IRepository<CorporateDebit, int> repository) : base(repository)
        {
        }
    }
}
