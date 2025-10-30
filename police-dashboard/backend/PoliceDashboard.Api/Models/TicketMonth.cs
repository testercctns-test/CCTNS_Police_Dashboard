namespace PoliceDashboard.Api.Models
{
    public class TicketMonth
    {
        public string Month { get; set; } = "";
        public int Completed { get; set; }
        public int Pending { get; set; }
    }
}