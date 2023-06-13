using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryTrackingSystem.Migrations
{
    public partial class tablolarbaglandi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "PersonalDebit");

            migrationBuilder.DropColumn(
                name: "SurName",
                table: "PersonalDebit");

            migrationBuilder.DropColumn(
                name: "TCNO",
                table: "PersonalDebit");

            migrationBuilder.DropColumn(
                name: "EmployeeName",
                table: "CorporateDebit");

            migrationBuilder.RenameColumn(
                name: "EmployeeId",
                table: "CorporateDebit",
                newName: "CompanyId");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "PersonalDebit",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "UserId1",
                table: "PersonalDebit",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PersonalDebit_UserId1",
                table: "PersonalDebit",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_CorporateDebit_CompanyId",
                table: "CorporateDebit",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_CorporateDebit_Company_CompanyId",
                table: "CorporateDebit",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonalDebit_AbpUsers_UserId1",
                table: "PersonalDebit",
                column: "UserId1",
                principalTable: "AbpUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CorporateDebit_Company_CompanyId",
                table: "CorporateDebit");

            migrationBuilder.DropForeignKey(
                name: "FK_PersonalDebit_AbpUsers_UserId1",
                table: "PersonalDebit");

            migrationBuilder.DropIndex(
                name: "IX_PersonalDebit_UserId1",
                table: "PersonalDebit");

            migrationBuilder.DropIndex(
                name: "IX_CorporateDebit_CompanyId",
                table: "CorporateDebit");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "PersonalDebit");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "PersonalDebit");

            migrationBuilder.RenameColumn(
                name: "CompanyId",
                table: "CorporateDebit",
                newName: "EmployeeId");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "PersonalDebit",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SurName",
                table: "PersonalDebit",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TCNO",
                table: "PersonalDebit",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmployeeName",
                table: "CorporateDebit",
                type: "text",
                nullable: true);
        }
    }
}
