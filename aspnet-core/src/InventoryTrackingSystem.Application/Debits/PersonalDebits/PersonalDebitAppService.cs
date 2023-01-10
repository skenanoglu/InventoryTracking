using Abp.Application.Services;
using Abp.Domain.Repositories;
using InventoryTrackingSystem.Debits.Dto;

namespace InventoryTrackingSystem.Debits.PersonalDebits
{
    public class PersonalDebitAppService : AsyncCrudAppService<PersonalDebit, PersonalDebitDto, int, PersonalDebitDto, PersonalDebitDto, PersonalDebitDto>, IPersonalDebitAppService
    {
        public PersonalDebitAppService(IRepository<PersonalDebit, int> repository) : base(repository)
        {
        }
    }
}
