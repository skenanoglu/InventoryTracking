using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryTrackingSystem.Debits
{
    public class PersonalDebit : Entity, IFullAudited
    {
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Description { get; set; }
        public string TCNO { get; set; }
        public int ProductId { get; set; }
        public int ProductCount { get; set; }

        public long? CreatorUserId { get ; set; }
        public DateTime CreationTime { get; set; }
        public long? LastModifierUserId { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? DeleterUserId { get; set; }
        public DateTime? DeletionTime { get; set; }
        public bool IsDeleted { get; set; }
    }
}
