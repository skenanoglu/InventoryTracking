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
using Abp.Authorization;
using InventoryTrackingSystem.Authorization;
using Abp.Application.Services.Dto;
using InventoryTrackingSystem.Debits.Dto;
using Microsoft.EntityFrameworkCore;

namespace InventoryTrackingSystem.Products
{
    [AbpAuthorize(PermissionNames.Pages_Damage)]
    public class DamageAppService : AsyncCrudAppService<Damage, DamageDto, int, DamageDto, DamageDto, DamageDto>, IDamageAppService
    {
        public DamageAppService(IRepository<Damage, int> repository) : base(repository)
        {
        }

        public override async Task<PagedResultDto<DamageDto>> GetAllAsync(DamageDto input)
        {

            var result = Repository.Query(x => x).Include(x => x.Product).Include(x => x.User).Include(x => x.Company).ToList();

            List<DamageDto> dtos = new List<DamageDto>();

            foreach (var item in result)
            {
                var dto = ObjectMapper.Map<DamageDto>(item);
                dtos.Add(dto);
            }

            return new PagedResultDto<DamageDto>
            {
                Items = dtos.ToList(),
                TotalCount = dtos.Count
            };
        }
    }
}

