using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using InventoryTrackingSystem.MultiTenancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryTrackingSystem.Products.Dto
{
    [AutoMapTo(typeof(Product))]
    [AutoMapFrom(typeof(Product))]
    public class ProductDto : EntityDto
    {
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Capacity { get; set; }
        public string Weight { get; set; }
        public string Description { get; set; }
        public int Count { get; set; }
    }
}
