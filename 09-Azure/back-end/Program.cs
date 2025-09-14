using Microsoft.EntityFrameworkCore;
using tour_of_heroes_api.Models;
using Microsoft.AspNetCore.HttpLogging;
using tour_of_heroes_api.Data;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    EnvironmentName = Environments.Development
});

builder.Services.AddScoped<IHeroRepository, HeroRepository>();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? "Server=(localdb)\\MSSQLLocalDB;Database=heroes;Trusted_Connection=True;";

builder.Services.AddDbContext<HeroContext>(opt => opt.UseSqlServer(connectionString));
builder.Services.AddControllers();


builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "tour_of_heroes_api", Version = "v1" });
});


builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

var app = builder.Build();

app.UseDeveloperExceptionPage();
app.UseCors("CorsPolicy");
app.UseSwagger();
app.UseSwaggerUI();


using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<HeroContext>();
    DbSeeder.Seed(context); 
}

app.MapControllers();

app.Run();

