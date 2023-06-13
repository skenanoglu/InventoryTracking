using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using InventoryTrackingSystem.Authorization.Users;
using InventoryTrackingSystem.Debits;
using InventoryTrackingSystem.Products;

namespace InventoryTrackingSystem.Debits.Dto
{
    [AutoMapTo(typeof(PersonalDebit))]
    [AutoMapFrom(typeof(PersonalDebit))]
    public class PersonalDebitDto : EntityDto
    {
        public string Description { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int ProductCount { get; set; }

        public virtual Product Product { get; set; }
        public virtual User User { get; set; }
    }
}

