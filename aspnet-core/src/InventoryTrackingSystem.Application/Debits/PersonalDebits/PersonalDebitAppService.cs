using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.UI;
using InventoryTrackingSystem.Authorization;
using InventoryTrackingSystem.Debits.Dto;
using InventoryTrackingSystem.Products;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryTrackingSystem.Debits.PersonalDebits
{
    [AbpAuthorize(PermissionNames.Pages_PersonalDebits)]
    public class PersonalDebitAppService : AsyncCrudAppService<PersonalDebit, PersonalDebitDto, int, PersonalDebitDto, PersonalDebitDto, PersonalDebitDto>, IPersonalDebitAppService
    {

        private readonly IRepository<Product> _productRepository;

        public PersonalDebitAppService(IRepository<PersonalDebit, int> repository,
            IRepository<Product> productRepository) : base(repository)
        {
            _productRepository = productRepository;
        }

        public override Task<PersonalDebitDto> UpdateAsync(PersonalDebitDto input)
        {
            var product = _productRepository.FirstOrDefault(x => x.Id == input.ProductId);
            var personalDebit = Repository.FirstOrDefault(x => x.Id == input.Id);
            
            if (product.TotalCount < input.ProductCount)
            {
                throw new UserFriendlyException("Zimmet Verilecek Ürün Sayısı Mevcut Ürün Mevcut Ürün Sayısından Büyük Olamaz.");
            }
            else
            {
                if (input.ProductCount > personalDebit.ProductCount)
                {
                    product.CountInDebit = input.ProductCount;
                    product.TotalCount = product.TotalCount - (input.ProductCount - personalDebit.ProductCount);
                }
                else {
                    product.CountInDebit = input.ProductCount;
                    product.TotalCount = product.TotalCount + (personalDebit.ProductCount - input.ProductCount );
                }
                _productRepository.Update(product);
            }

            return base.UpdateAsync(input);
        }


        public override Task<PersonalDebitDto> CreateAsync(PersonalDebitDto input)
        {
            var product = _productRepository.FirstOrDefault(x => x.Id == input.ProductId);
            if (product.TotalCount < input.ProductCount)
            {
                throw new UserFriendlyException("Zimmet Verilecek Ürün Sayısı Mevcut Ürün Mevcut Ürün Sayısından Büyük Olamaz.");
            }
            else {
                 product.TotalCount = product.TotalCount - input.ProductCount;
                 product.CountInDebit = input.ProductCount;
                _productRepository.Update(product);
            }

            return base.CreateAsync(input);
        }

        public override async Task<PagedResultDto<PersonalDebitDto>> GetAllAsync(PersonalDebitDto input)
        {

            var result = Repository.Query(x => x).Include(x => x.Product).ToList();

            List<PersonalDebitDto> dtos = new List<PersonalDebitDto>();

            foreach (var item in result)
            {
                var dto = ObjectMapper.Map<PersonalDebitDto>(item);
                dtos.Add(dto);
            }

            return new PagedResultDto<PersonalDebitDto>
            {
                Items = dtos.ToList(),
                TotalCount = dtos.Count
            };
        }
    }
}
