import "dotenv/config";

import app from "./app.js";

const port = Number(process.env.PORT) || 5000;

const server = app.listen(port, () => {
  console.log(`Purchase Planner API is running on port ${port}`);
});

const shutdown = (signal: string): void => {
  console.log(`${signal} received. Shutting down server...`);

  server.close(() => {
    console.log("Server stopped.");
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));