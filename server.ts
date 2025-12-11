import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import { logger } from "./libraries/logger";
import morgan from "morgan";
import cors from "cors";
import parser from "cookie-parser";
import { join, resolve } from "path";
import http from "http";
import { Server } from "socket.io";
import { appLimiter as limiter } from "./config/limiter.config";
import routes from "./src/routes/index.route";
import redisClient, { redisInit } from "./libraries/redis";
import swaggerUi from "swagger-ui-express";
import swaggerSettings from "./libraries/swagger.json";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(parser());
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "50kb" }));
app.use(express.static(join(__dirname, "public")));
app.use(limiter);
app.set("trust proxy", 1); // Enable proxy trust for Render

// specify paths
global.paths = {
  logs: resolve("logs"), // does process.cwd() by default
};

// socket.io
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*", // adjust in production
  },
});

// Handle socket connections
io.on("connection", (socket) => {
  logger.info("A user connected:", socket.id);

  socket.on("message", (data) => {
    logger.info("Message received:", data);
    io.emit("message", data); // broadcast to all clients
  });

  socket.on("disconnect", () => {
    logger.warn("User disconnected:", socket.id);
  });
});

// Health check route for services like Datadog
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
  });
});

// Route management abstraction layer
app.use("/api", routes);

// API documentation using swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSettings));

// Not found handler
app.use((req, res, next) => {
  res.status(404).json({
    message: "Not Found",
    error: `404: Cannot ${req.method} ${req.url}`,
  });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Caught error:", err.message);
  console.log(err.stack);
  res.status(500).json({ status: "error", message: err.message });
});

app.listen(PORT, async () => {
  await import("./config/index.config.js");
  await redisInit();
  logger.info(`Server running on http://localhost:${PORT}`);
  logger.info(
    `Swagger documentation available at http://localhost:${PORT}/api-docs`
  );
});

// Catches unexpected runtime failures
process.on("uncaughtException", async (err, origin) => {
  logger.error("Uncaught exception detected: Initiating clean exit");
  console.log(err.stack);
  process.exit(1);
});

process.on("unhandledRejection", async (err: Error) => {
  logger.error("Unhandled rejection detected: Initiating clean exit");
  console.log(err.stack);
  process.exit(1);
});
