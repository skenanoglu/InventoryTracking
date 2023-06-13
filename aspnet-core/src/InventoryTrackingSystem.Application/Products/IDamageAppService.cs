using Abp.Application.Services;
using InventoryTrackingSystem.MultiTenancy.Dto;
using InventoryTrackingSystem.Products.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryTrackingSystem.Products
{
    public interface IDamageAppService : IAsyncCrudAppService<DamageDto, int, DamageDto, DamageDto, DamageDto>
    {
    }
}
