using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using InventoryTrackingSystem.Companies;
using InventoryTrackingSystem.Debits;
using InventoryTrackingSystem.Products;

namespace InventoryTrackingSystem.Debits.Dto
{
    [AutoMapTo(typeof(CorporateDebit))]
    [AutoMapFrom(typeof(CorporateDebit))]
    public class CorporateDebitDto : EntityDto
    {
        public string EmployeeDepartment { get; set; }
        public int CompanyId { get; set; }
        public int ProductId { get; set; }
        public int ProductCount { get; set; }

        public virtual Product Product { get; set; }
        public virtual Company Company { get; set; }

    }
}

