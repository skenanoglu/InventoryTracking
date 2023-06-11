using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryTrackingSystem.Migrations
{
    public partial class productcount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Count",
                table: "Product",
                newName: "TotalCount");

            migrationBuilder.AddColumn<int>(
                name: "CountInDebit",
                table: "Product",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PersonalDebit_ProductId",
                table: "PersonalDebit",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_CorporateDebit_ProductId",
                table: "CorporateDebit",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_CorporateDebit_Product_ProductId",
                table: "CorporateDebit",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonalDebit_Product_ProductId",
                table: "PersonalDebit",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CorporateDebit_Product_ProductId",
                table: "CorporateDebit");

            migrationBuilder.DropForeignKey(
                name: "FK_PersonalDebit_Product_ProductId",
                table: "PersonalDebit");

            migrationBuilder.DropIndex(
                name: "IX_PersonalDebit_ProductId",
                table: "PersonalDebit");

            migrationBuilder.DropIndex(
                name: "IX_CorporateDebit_ProductId",
                table: "CorporateDebit");

            migrationBuilder.DropColumn(
                name: "CountInDebit",
                table: "Product");

            migrationBuilder.RenameColumn(
                name: "TotalCount",
                table: "Product",
                newName: "Count");
        }
    }
}
