namespace PoliceDashboard.Api.Models
{
    public class TicketMonth
    {
        public string Month { get; set; } = "";
        public int Total { get; set; }
        public int Closed { get; set; }
        public int CarryForwardClosed { get; set; }
        public int Pending { get; set; }
    }
}
