using System.Threading.Tasks;
using InventoryTrackingSystem.Models.TokenAuth;
using InventoryTrackingSystem.Web.Controllers;
using Shouldly;
using Xunit;

namespace InventoryTrackingSystem.Web.Tests.Controllers
{
    public class HomeController_Tests: InventoryTrackingSystemWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}