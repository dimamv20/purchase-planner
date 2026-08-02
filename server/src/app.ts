import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request: Request, response: Response) => {
  response.status(200).json({
    status: "success",
    message: "Purchase Planner API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use(
  (
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction,
  ) => {
    console.error(error);

    response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  },
);

export default app;