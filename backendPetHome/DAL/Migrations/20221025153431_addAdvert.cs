using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class addAdvert : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "age",
                table: "users");

            migrationBuilder.DropColumn(
                name: "year",
                table: "users");

            migrationBuilder.RenameColumn(
                name: "Surname",
                table: "users",
                newName: "surname");

            migrationBuilder.AddColumn<string>(
                name: "email",
                table: "users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "phoneNumber",
                table: "users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "adverts",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ownerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_adverts", x => x.id);
                    table.ForeignKey(
                        name: "FK_adverts_users_ownerId",
                        column: x => x.ownerId,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_adverts_ownerId",
                table: "adverts",
                column: "ownerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "adverts");

            migrationBuilder.DropColumn(
                name: "email",
                table: "users");

            migrationBuilder.DropColumn(
                name: "name",
                table: "users");

            migrationBuilder.DropColumn(
                name: "phoneNumber",
                table: "users");

            migrationBuilder.RenameColumn(
                name: "surname",
                table: "users",
                newName: "Surname");

            migrationBuilder.AddColumn<int>(
                name: "age",
                table: "users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "year",
                table: "users",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
