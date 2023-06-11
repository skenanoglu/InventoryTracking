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

namespace InventoryTrackingSystem.Companies
{
    [AbpAuthorize(PermissionNames.Pages_Companies)]
    public class CompanyAppService : AsyncCrudAppService<Company, CompanyDto, int, CompanyDto, CompanyDto, CompanyDto>, ICompanyAppService
    {
        public CompanyAppService(IRepository<Company, int> repository) : base(repository)
        {
        }
    }
}
