using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class addOtherTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Interval",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userId = table.Column<int>(type: "int", nullable: false),
                    startTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    endTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Interval", x => x.id);
                    table.ForeignKey(
                        name: "FK_Interval_users_userId",
                        column: x => x.userId,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Request",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userId = table.Column<int>(type: "int", nullable: false),
                    advertId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Request", x => x.id);
                    table.ForeignKey(
                        name: "FK_Request_adverts_advertId",
                        column: x => x.advertId,
                        principalTable: "adverts",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Request_users_userId",
                        column: x => x.userId,
                        principalTable: "users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Interval_userId",
                table: "Interval",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_Request_advertId",
                table: "Request",
                column: "advertId");

            migrationBuilder.CreateIndex(
                name: "IX_Request_userId",
                table: "Request",
                column: "userId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Interval");

            migrationBuilder.DropTable(
                name: "Request");
        }
    }
}
