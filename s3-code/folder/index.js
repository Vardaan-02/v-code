// server.js
const express = require("express");
const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  res.send("🚀 Server is live, boss!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
