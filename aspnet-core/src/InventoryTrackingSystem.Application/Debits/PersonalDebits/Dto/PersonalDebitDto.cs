using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using InventoryTrackingSystem.Debits;

namespace InventoryTrackingSystem.Debits.Dto
{
    [AutoMapTo(typeof(PersonalDebit))]
    [AutoMapFrom(typeof(PersonalDebit))]
    public class PersonalDebitDto : EntityDto
    {
        public string Name { get; set; } // frontendde maplanıp tek gösterilecek
        public string SurName { get; set; }
        public string Description { get; set; }
        public string TCNO { get; set; }
        public int ProductId { get; set; }
        public int ProductCount { get; set; }
    }
}

