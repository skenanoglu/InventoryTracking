using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using InventoryTrackingSystem.Debits;
using InventoryTrackingSystem.Products;

namespace InventoryTrackingSystem.Debits.Dto
{
    [AutoMapTo(typeof(CorporateDebit))]
    [AutoMapFrom(typeof(CorporateDebit))]
    public class CorporateDebitDto : EntityDto
    {
        public int EmployeeId { get; set; }
        public string EmployeeDepartment { get; set; }
        public string EmployeeName { get; set; }
        public int ProductId { get; set; }
        public int ProductCount { get; set; }

        public virtual Product Product { get; set; }

    }
}

