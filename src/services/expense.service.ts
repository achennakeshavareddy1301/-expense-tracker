import { v4 as uuidv4 } from "uuid";
import {
  Expense,
  CreateExpenseDto,
  ExpenseSummary,
} from "../models/Expense";
import { fileStorage } from "../utils/fileStorage";

export class ExpenseService {
  /**
   * Creates a new expense and persists it to storage.
   */
  public async createExpense(
    dto: CreateExpenseDto
  ): Promise<Expense> {
    const expenses = await fileStorage.readExpenses();

    const newExpense = this.buildExpense(dto);

    expenses.push(newExpense);

    await fileStorage.writeExpenses(expenses);

    return newExpense;
  }

  /**
   * Returns all expenses.
   * If category is provided, returns only matching expenses.
   */
  public async getAllExpenses(category?: string): Promise<Expense[]> {
    const expenses = await fileStorage.readExpenses();

    const filteredExpenses = category
      ? this.filterByCategory(expenses, category)
      : expenses;

    return filteredExpenses.sort(
      (firstExpense, secondExpense) =>
        new Date(secondExpense.date).getTime() -
        new Date(firstExpense.date).getTime()
    );
  }

  /**
   * Calculates total expenses.
   * If category is provided, calculates only for that category.
   */
  public async getExpenseSummary(
    category?: string
  ): Promise<ExpenseSummary> {
    const expenses = await fileStorage.readExpenses();

    const filteredExpenses = category
      ? this.filterByCategory(expenses, category)
      : expenses;

    const total = filteredExpenses.reduce(
      (runningTotal, expense) => runningTotal + expense.amount,
      0
    );

    return {
      total,
      ...(category && { category }),
    };
  }

  /**
   * Deletes an expense by ID.
   * Returns true if deleted, otherwise false.
   */
  public async deleteExpense(id: string): Promise<boolean> {
    const expenses = await fileStorage.readExpenses();

    const expenseExists = expenses.some(
      (expense) => expense.id === id
    );

    if (!expenseExists) {
      return false;
    }

    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== id
    );

    await fileStorage.writeExpenses(updatedExpenses);

    return true;
  }

  /**
   * Creates a normalized Expense object.
   */
  private buildExpense(dto: CreateExpenseDto): Expense {
    return {
      id: uuidv4(),
      title: dto.title.trim(),
      amount: dto.amount,
      category: dto.category.trim(),
      date: dto.date,
    };
  }

  /**
   * Filters expenses using a case-insensitive category comparison.
   */
  private filterByCategory(
    expenses: Expense[],
    category: string
  ): Expense[] {
    const normalizedCategory = category.trim().toLowerCase();

    return expenses.filter(
      (expense) =>
        expense.category.trim().toLowerCase() === normalizedCategory
    );
  }
}

/**
 * Singleton instance used throughout the application.
 */
export const expenseService = new ExpenseService();