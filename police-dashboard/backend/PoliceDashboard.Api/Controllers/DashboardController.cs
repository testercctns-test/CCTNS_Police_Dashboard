using Microsoft.AspNetCore.Mvc;
using PoliceDashboard.Api.Models;
using System.Text.Json;

namespace PoliceDashboard.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly string _dataPath;

        public DashboardController(IWebHostEnvironment env)
        {
            _env = env;
            _dataPath = Path.Combine(_env.ContentRootPath, "Data", "ticketsData.json");
        }

        private List<TicketMonth> LoadData()
        {
            if (!System.IO.File.Exists(_dataPath))
                return new List<TicketMonth>();

            var json = System.IO.File.ReadAllText(_dataPath);
            var data = JsonSerializer.Deserialize<List<TicketMonth>>(json,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return data ?? new List<TicketMonth>();
        }

        [HttpGet("raw")]
        public IActionResult Raw()
        {
            var data = LoadData();
            return Ok(data);
        }

        [HttpGet("monthly")]
        public IActionResult Monthly([FromQuery] string? from = null, [FromQuery] string? to = null)
        {
            var data = LoadData();
            var monthOrder = new List<string> { "January","February","March","April","May","June","July","August","September","October","November","December" };

            if (!string.IsNullOrWhiteSpace(from) && !string.IsNullOrWhiteSpace(to))
            {
                var fi = monthOrder.IndexOf(from);
                var ti = monthOrder.IndexOf(to);
                if (fi >= 0 && ti >= 0 && fi <= ti)
                {
                    data = data.Where(d => monthOrder.IndexOf(d.Month) >= fi && monthOrder.IndexOf(d.Month) <= ti)
                               .OrderBy(d => monthOrder.IndexOf(d.Month))
                               .ToList();
                }
            }

            return Ok(data);
        }

        [HttpGet("summary")]
        public IActionResult Summary()
        {
            var data = LoadData();
            var totalCompleted = data.Sum(d => d.Completed);
            var totalPending = data.Sum(d => d.Pending);
            var total = totalCompleted + totalPending;

            var latestMonth = data.LastOrDefault()?.Month ?? "";

            return Ok(new {
                totalCompleted,
                totalPending,
                total,
                latestMonth
            });
        }
    }
}