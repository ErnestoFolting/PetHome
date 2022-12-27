using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class addDbFunctions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            string[] fileNames = Directory.GetFiles(Path.Combine(Directory.GetCurrentDirectory(), "Data/FunctionsUp"), "*.sql");
            fileNames.OrderBy(el => new FileInfo(el).CreationTime);
            foreach (string file in fileNames)
            {
                var sql = File.ReadAllText(file);
                migrationBuilder.Sql(sql);
            }
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            string[] fileNames = Directory.GetFiles(Path.Combine(Directory.GetCurrentDirectory(), "Data/FunctionsDown"), "*.sql");
            fileNames.OrderByDescending(el => new FileInfo(el).CreationTime);
            foreach (string file in fileNames)
            {
                var sql = File.ReadAllText(file);
                migrationBuilder.Sql(sql);
            }
        }
    }
}
