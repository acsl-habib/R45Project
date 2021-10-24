using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartHR.DataApi.Migrations.Data
{
    public partial class hr_v2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaritialStatus",
                table: "Employees");

            migrationBuilder.AddColumn<int>(
                name: "MaritalStatus",
                table: "Employees",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaritalStatus",
                table: "Employees");

            migrationBuilder.AddColumn<int>(
                name: "MaritialStatus",
                table: "Employees",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
