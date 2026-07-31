import app from "./app";

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log("====================================");
  console.log("🚀 Smart Expense Tracker API");
  console.log(`🌐 Server running on http://localhost:${PORT}`);
  console.log(`❤️ Health Check: http://localhost:${PORT}/health`);
  console.log("====================================");
});