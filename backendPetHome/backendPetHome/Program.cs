global using Microsoft.EntityFrameworkCore;
using BAL.Services;
using DAL.Data;
using DAL.Models;
using DAL.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:3000");
        });
});
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<UserService>();
builder.Services.AddTransient<IRepository<User>,userRepository>();
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("CORSPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
