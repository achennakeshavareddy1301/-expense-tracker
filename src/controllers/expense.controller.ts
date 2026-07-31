import { Request, Response } from "express";
import { expenseService } from "../services/expense.service";
import { CreateExpenseDto } from "../models/Expense";

export class ExpenseController {
  /**
   * Creates a new expense.
   * POST /expenses
   */
  public async createExpense(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { title, amount, category, date } =
        req.body as CreateExpenseDto;

      // Validate required fields
      if (!title?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Title is required.",
        });
      }

      if (amount === undefined || amount === null) {
        return res.status(400).json({
          success: false,
          message: "Amount is required.",
        });
      }

      if (Number(amount) <= 0) {
        return res.status(400).json({
          success: false,
          message: "Amount must be greater than zero.",
        });
      }

      if (!category?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Category is required.",
        });
      }

      if (!date) {
        return res.status(400).json({
          success: false,
          message: "Date is required.",
        });
      }

      const parsedDate = new Date(date);

      if (Number.isNaN(parsedDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid date format.",
        });
      }

      const expense = await expenseService.createExpense({
        title,
        amount: Number(amount),
        category,
        date,
      });

      return res.status(201).json({
        success: true,
        data: expense,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      });
    }
  }

  /**
   * Returns all expenses or filters by category.
   * GET /expenses
   */
  public async getExpenses(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const category =
        typeof req.query.category === "string"
          ? req.query.category
          : undefined;

      const expenses = await expenseService.getAllExpenses(category);

      return res.status(200).json({
        success: true,
        data: expenses,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      });
    }
  }

  /**
   * Returns expense summary.
   * GET /expenses/summary
   */
  public async getExpenseSummary(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const category =
        typeof req.query.category === "string"
          ? req.query.category
          : undefined;

      const summary =
        await expenseService.getExpenseSummary(category);

      return res.status(200).json({
        success: true,
        data: summary,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      });
    }
  }

  /**
   * Deletes an expense by ID.
   * DELETE /expenses/:id
   */
  public async deleteExpense(
    req: Request<{ id: string }>,

    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Expense ID is required.",
        });
      }

      const deleted = await expenseService.deleteExpense(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Expense not found.",
        });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      });
    }
  }
}

/**
 * Singleton controller instance.
 */
export const expenseController = new ExpenseController();