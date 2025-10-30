Police Dashboard - Starter Project
=================================

Structure:
- backend/PoliceDashboard.Api : ASP.NET Core Web API (serves static JSON initially)
- frontend/ : React (Vite) + Tailwind + Recharts

Backend (run with .NET 8 SDK):
1. Open terminal:
   cd backend/PoliceDashboard.Api
   dotnet restore
   dotnet run

2. API endpoints (default https://localhost:5001):
   GET /api/dashboard/raw
   GET /api/dashboard/monthly?from=February&to=October
   GET /api/dashboard/summary

Frontend:
1. In another terminal:
   cd frontend
   npm install
   npm run dev

2. Open the Vite URL (http://localhost:5173)

Notes:
- Frontend attempts to call backend; if backend is not available, it falls back to local JSON in src/data.
- Replace Data/ticketsData.json with your real numbers exported from PPT.
- To connect to a real SQL Server, update DashboardController.LoadData() to query DB (EF Core or Dapper).