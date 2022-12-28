using System.ComponentModel.DataAnnotations;

namespace InventoryTrackingSystem.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}