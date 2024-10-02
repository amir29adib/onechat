import express from "express";
import { createServer } from "http";

const app = express();
export const httpServer = createServer(app);

app.use(express.static("../public"));

app.get("/api/users", (req, res) => {
  // to-do
});

const PORT = process.env.PORT || 9000;
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
