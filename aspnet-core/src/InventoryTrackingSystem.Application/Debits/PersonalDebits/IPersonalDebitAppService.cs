using Abp.Application.Services;
using InventoryTrackingSystem.Debits.Dto;

namespace InventoryTrackingSystem.Debits.PersonalDebits
{
    public interface IPersonalDebitAppService : IAsyncCrudAppService<PersonalDebitDto, int, PersonalDebitDto, PersonalDebitDto, PersonalDebitDto>
    {
    }
}
