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

namespace InventoryTrackingSystem.Products
{
    public class ProductAppService : AsyncCrudAppService<Product, ProductDto, int, ProductDto, ProductDto, ProductDto>, IProductAppService
    {
        public ProductAppService(IRepository<Product, int> repository) : base(repository)
        {
        }
    }
}
