import cors from "cors";
import express from "express";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/portfolio", async (_req, res) => {
  try {
    const jsonPath = path.join(rootDir, "data", "portfolio.json");
    const content = await readFile(jsonPath, "utf8");
    res.type("json").send(content);
  } catch (error) {
    res.status(500).json({
      error: "Unable to load portfolio data",
      detail: error.message
    });
  }
});

app.use(express.static(path.join(rootDir, "dist")));

app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(rootDir, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Portfolio server running on http://127.0.0.1:${port}`);
});
