using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartHR.DataApi.Migrations.Data
{
    public partial class hr_v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OfficeHourType",
                table: "WorkHours");

            migrationBuilder.AddColumn<int>(
                name: "OfficeHourTypeId",
                table: "WorkHours",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "OfficeHourType",
                columns: table => new
                {
                    OfficeHourTypeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OfficeHourTypeName = table.Column<string>(maxLength: 40, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OfficeHourType", x => x.OfficeHourTypeId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkHours_OfficeHourTypeId",
                table: "WorkHours",
                column: "OfficeHourTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkHours_OfficeHourType_OfficeHourTypeId",
                table: "WorkHours",
                column: "OfficeHourTypeId",
                principalTable: "OfficeHourType",
                principalColumn: "OfficeHourTypeId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkHours_OfficeHourType_OfficeHourTypeId",
                table: "WorkHours");

            migrationBuilder.DropTable(
                name: "OfficeHourType");

            migrationBuilder.DropIndex(
                name: "IX_WorkHours_OfficeHourTypeId",
                table: "WorkHours");

            migrationBuilder.DropColumn(
                name: "OfficeHourTypeId",
                table: "WorkHours");

            migrationBuilder.AddColumn<int>(
                name: "OfficeHourType",
                table: "WorkHours",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
