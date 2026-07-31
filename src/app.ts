import express, {
    Application,
    NextFunction,
    Request,
    Response,
  } from "express";
  import cors from "cors";
  
  import expenseRoutes from "./routes/expense.routes";
  import swaggerUi from "swagger-ui-express";
  import { specs } from "./swagger/swagger";
  const app: Application = express();
  
  /**
   * Global middleware
   */
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  /**
   * Health Check Endpoint
   */
  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "Expense Tracker API is running.",
    });
  });
  
  /**
   * API Routes
   */
  app.use("/api", expenseRoutes);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  /**
   * Handle unknown routes
   */
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: `Route '${req.originalUrl}' not found.`,
    });
  });
  
  /**
   * Global error handler
   */
  app.use(
    (
      err: Error,
      _req: Request,
      res: Response,
      _next: NextFunction
    ) => {
      console.error(err);
  
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  );
  
  export default app;