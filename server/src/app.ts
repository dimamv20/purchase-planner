import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import storeRoutes from "./routes/store.routes.js";
import priceRoutes from "./routes/price.routes.js";
import userRoutes from "./routes/user.routes.js";
import shoppingListRoutes from "./routes/shoppingList.routes.js";
import shoppingListItemRoutes  from "./routes/shoppingListItems.routes.js";
import authRoutes from "./routes/auth.routes.js";
import comparisonRoutes from "./routes/comparison.route.js"

import { ZodError } from "zod";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/prices", priceRoutes);
app.use("/api/shopping-lists", shoppingListRoutes);
app.use("/api/shopping-list-items", shoppingListItemRoutes);
app.use("/api/comparisons", comparisonRoutes);
app.use("/api/auth", authRoutes);
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

        if (error instanceof ZodError) {
            return response.status(400).json({
                status: "error",
                message: "Validation failed",
                errors: error.issues,
            });
        }

        return response.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    },
);

export default app;