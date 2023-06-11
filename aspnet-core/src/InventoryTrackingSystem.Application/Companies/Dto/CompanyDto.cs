using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using InventoryTrackingSystem.Companies;
using InventoryTrackingSystem.MultiTenancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryTrackingSystem.Products.Dto
{
    [AutoMapTo(typeof(Company))]
    [AutoMapFrom(typeof(Company))]
    public class CompanyDto : EntityDto
    {
        public string CompanyName { get; set; }
        public long TaxNo { get; set; }
        public string Description { get; set; }
    }
}
