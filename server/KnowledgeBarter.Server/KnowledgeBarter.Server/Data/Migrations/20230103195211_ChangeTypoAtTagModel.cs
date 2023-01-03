using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KnowledgeBarter.Server.Data.Migrations
{
    public partial class ChangeTypoAtTagModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ReviewText",
                table: "Tags",
                newName: "Text");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Text",
                table: "Tags",
                newName: "ReviewText");
        }
    }
}
