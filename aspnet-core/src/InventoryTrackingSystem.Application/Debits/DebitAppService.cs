using Abp.Application.Services;
using InventoryTrackingSystem.Authorization.Roles;
using InventoryTrackingSystem.Roles.Dto;
using InventoryTrackingSystem.Roles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InventoryTrackingSystem.Products.Dto;
using Abp.Domain.Repositories;
using InventoryTrackingSystem.Debits.Dto;

namespace InventoryTrackingSystem.Debits
{
    public class DebitAppService : AsyncCrudAppService<CorporateDebit, CorporateDebitDto, int, CorporateDebitDto, CorporateDebitDto, CorporateDebitDto>, IDebitAppService
    {
        public DebitAppService(IRepository<CorporateDebit, int> repository) : base(repository)
        {
        }
    }
}
