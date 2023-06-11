using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using InventoryTrackingSystem.Authorization;
using InventoryTrackingSystem.Debits.Dto;

namespace InventoryTrackingSystem.Debits.PersonalDebits
{
    [AbpAuthorize(PermissionNames.Pages_PersonalDebits)]
    public class PersonalDebitAppService : AsyncCrudAppService<PersonalDebit, PersonalDebitDto, int, PersonalDebitDto, PersonalDebitDto, PersonalDebitDto>, IPersonalDebitAppService
    {
        public PersonalDebitAppService(IRepository<PersonalDebit, int> repository) : base(repository)
        {
        }
    }
}
