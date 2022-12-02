using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class addLocationCoords : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "location",
                table: "adverts");

            migrationBuilder.AddColumn<double>(
                name: "locationLat",
                table: "AspNetUsers",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "locationLng",
                table: "AspNetUsers",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "locationLat",
                table: "adverts",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "locationLng",
                table: "adverts",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "locationLat",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "locationLng",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "locationLat",
                table: "adverts");

            migrationBuilder.DropColumn(
                name: "locationLng",
                table: "adverts");

            migrationBuilder.AddColumn<string>(
                name: "location",
                table: "adverts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
