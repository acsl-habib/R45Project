using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartHR.DataApi.Migrations.Data
{
    public partial class HR_3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "date",
                table: "SalaryPays",
                newName: "PaymentDate");

            migrationBuilder.AlterColumn<DateTime>(
                name: "PaymentDate",
                table: "SalaryPays",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PaymentDate",
                table: "SalaryPays",
                newName: "date");

            migrationBuilder.AlterColumn<DateTime>(
                name: "date",
                table: "SalaryPays",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "date");
        }
    }
}
