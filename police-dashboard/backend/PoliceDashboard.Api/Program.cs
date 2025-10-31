var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();

// Allow the frontend origin (Vite default)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowFrontend");
app.UseStaticFiles(); // optional if you serve static assets
app.MapControllers();

app.Run();
