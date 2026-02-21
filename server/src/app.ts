import "dotenv/config";
import express from "express";
import apiRouter from "./routes/api.router";
import serverConfig from "./config/serverConfig";
import type { Application } from "express";

const PORT = Number(process.env.PORT) || 3000;

const app: Application = express();
serverConfig(app);

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`server runs on port: ${PORT}`);
});
