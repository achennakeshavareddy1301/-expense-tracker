import { Router } from "express";
import { expenseController } from "../controllers/expense.controller";

const router = Router();

/**
 * Create a new expense.
 * POST /expenses
 */
router.post(
  "/expenses",
  expenseController.createExpense.bind(expenseController)
);

/**
 * Get all expenses.
 * Optional query:
 * GET /expenses?category=Food
 */
router.get(
  "/expenses",
  expenseController.getExpenses.bind(expenseController)
);

/**
 * Get expense summary.
 * GET /expenses/summary
 * GET /expenses/summary?category=Food
 */
router.get(
  "/expenses/summary",
  expenseController.getExpenseSummary.bind(expenseController)
);

/**
 * Delete an expense.
 * DELETE /expenses/:id
 */
router.delete(
  "/expenses/:id",
  expenseController.deleteExpense.bind(expenseController)
);

export default router;