﻿using Abp.Application.Services;
using InventoryTrackingSystem.Debits.Dto;
using InventoryTrackingSystem.MultiTenancy.Dto;
using InventoryTrackingSystem.Products.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryTrackingSystem.Debits.CorporateDebits
{
    public interface ICorporateDebitAppService : IAsyncCrudAppService<CorporateDebitDto, int, CorporateDebitDto, CorporateDebitDto, CorporateDebitDto>
    {
    }
}
