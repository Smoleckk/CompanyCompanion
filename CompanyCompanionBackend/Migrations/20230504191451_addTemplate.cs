using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CompanyCompanionBackend.Migrations
{
    public partial class addTemplate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Template",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Template",
                table: "Companies");
        }
    }
}
