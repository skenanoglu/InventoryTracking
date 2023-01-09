using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using InventoryTrackingSystem.Debits;
using InventoryTrackingSystem.MultiTenancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    }
}

