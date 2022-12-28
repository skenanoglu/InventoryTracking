using Abp.Application.Services.Dto;

namespace InventoryTrackingSystem.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

