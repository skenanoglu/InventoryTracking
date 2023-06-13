using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using InventoryTrackingSystem.Authorization.Users;
using InventoryTrackingSystem.Companies;
using InventoryTrackingSystem.MultiTenancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryTrackingSystem.Products.Dto
{
    [AutoMapTo(typeof(Damage))]
    [AutoMapFrom(typeof(Damage))]
    public class DamageDto : EntityDto
    {
        public int ProductId { get; set; }
        public int? UserId { get; set; }
        public int? CompanyId { get; set; }

        public int CompanyOrUser { get; set; }


        public string DamageDescription { get; set; }
        public int Count { get; set; }
        public decimal RepairCost { get; set; }
        public string RepairDate { get; set; }
        public string RepairDescription { get; set; }
        public bool IsRepaired { get; set; }

        public virtual Product Product { get; set; }
        public virtual Company Company { get; set; }
        public virtual User User { get; set; }
    }
}
