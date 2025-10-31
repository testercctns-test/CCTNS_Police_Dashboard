using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
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

        private async Task<List<TicketMonth>> LoadDataAsync()
        {
            if (!System.IO.File.Exists(_dataPath))
                return new List<TicketMonth>();

            using var fs = System.IO.File.OpenRead(_dataPath);
            var data = await JsonSerializer.DeserializeAsync<List<TicketMonth>>(fs, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            var months = new[]
            {
                "January","February","March","April","May","June",
                "July","August","September","October","November","December"
            };

            return data?
                .OrderBy(d => Array.IndexOf(months, d.Month))
                .ToList() ?? new List<TicketMonth>();
        }

        [HttpGet("monthly")]
        public async Task<IActionResult> GetMonthly([FromQuery] string? from, [FromQuery] string? to)
        {
            var data = await LoadDataAsync();
            var months = new[]
            {
                "January","February","March","April","May","June",
                "July","August","September","October","November","December"
            };

            if (!string.IsNullOrEmpty(from) && !string.IsNullOrEmpty(to))
            {
                var fi = Array.IndexOf(months, from);
                var ti = Array.IndexOf(months, to);

                if (fi >= 0 && ti >= 0 && fi <= ti)
                {
                    data = data
                        .Where(d => Array.IndexOf(months, d.Month) >= fi && Array.IndexOf(months, d.Month) <= ti)
                        .OrderBy(d => Array.IndexOf(months, d.Month))
                        .ToList();
                }
            }

            // ✅ Compute carry-forward pending across months
            int carryPending = 0;
            foreach (var month in data)
            {
                month.Pending = (carryPending + month.Total) - (month.Closed + month.CarryForwardClosed);
                if (month.Pending < 0) month.Pending = 0;
                carryPending = month.Pending;
            }

            return Ok(data);
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary([FromQuery] string? from, [FromQuery] string? to)
        {
            var res = await GetMonthly(from, to) as OkObjectResult;
            if (res?.Value is not List<TicketMonth> data || data.Count == 0)
            {
                return Ok(new
                {
                    totalTickets = 0,
                    totalClosed = 0,
                    totalCarryForwardClosed = 0,
                    totalPending = 0,
                    latestMonth = string.Empty
                });
            }

            // ✅ Last month after carry-forward
            var latest = data.Last();

            return Ok(new
            {
                totalTickets = latest.Total,
                totalClosed = latest.Closed,
                totalCarryForwardClosed = latest.CarryForwardClosed,
                totalPending = latest.Pending,
                latestMonth = latest.Month
            });
        }
    }
}
