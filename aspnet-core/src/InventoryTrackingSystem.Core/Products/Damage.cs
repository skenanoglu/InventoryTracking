using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InventoryTrackingSystem.Authorization.Users;
using InventoryTrackingSystem.Companies;

namespace InventoryTrackingSystem.Products
{
    public class Damage : Entity, IFullAudited
    {
        public int ProductId { get; set; }
        public int? UserId { get; set; }
        public int? CompanyId { get; set; }

        public int CompanyOrUser { get; set; }

        public int Count { get; set; }
        public string DamageDescription { get; set; }
        public decimal RepairCost { get; set; }
        public string RepairDate { get; set; }
        public string RepairDescription { get; set; }
        public bool IsRepaired { get; set; }

        public virtual Product Product { get; set; }
        public virtual Company Company { get; set; }
        public virtual User User { get; set; }

        public long? CreatorUserId { get; set; }
        public DateTime CreationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? DeleterUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public bool IsDeleted { get; set; }
    }
}
