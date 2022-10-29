using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class addSomeRelationships : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "cost",
                table: "adverts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "endTime",
                table: "adverts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "location",
                table: "adverts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "performerId",
                table: "adverts",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "startTime",
                table: "adverts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "status",
                table: "adverts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_adverts_performerId",
                table: "adverts",
                column: "performerId");

            migrationBuilder.AddForeignKey(
                name: "FK_adverts_users_performerId",
                table: "adverts",
                column: "performerId",
                principalTable: "users",
                principalColumn: "id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_adverts_users_performerId",
                table: "adverts");

            migrationBuilder.DropIndex(
                name: "IX_adverts_performerId",
                table: "adverts");

            migrationBuilder.DropColumn(
                name: "cost",
                table: "adverts");

            migrationBuilder.DropColumn(
                name: "endTime",
                table: "adverts");

            migrationBuilder.DropColumn(
                name: "location",
                table: "adverts");

            migrationBuilder.DropColumn(
                name: "performerId",
                table: "adverts");

            migrationBuilder.DropColumn(
                name: "startTime",
                table: "adverts");

            migrationBuilder.DropColumn(
                name: "status",
                table: "adverts");
        }
    }
}
