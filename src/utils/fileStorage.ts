import { promises as fs } from "fs";
import path from "path";
import { Expense } from "../models/Expense";

export class FileStorage {
  private readonly dataDirectory: string;
  private readonly dataFile: string;

  constructor() {
    this.dataDirectory = path.join(__dirname, "..", "data");
    this.dataFile = path.join(this.dataDirectory, "expenses.json");
  }

  /**
   * Ensures the storage directory and JSON file exist.
   */
  private async ensureStorage(): Promise<void> {
    try {
      await fs.access(this.dataFile);
    } catch {
      await fs.mkdir(this.dataDirectory, { recursive: true });
      await fs.writeFile(this.dataFile, "[]", "utf-8");
    }
  }

  /**
   * Reads all expenses from the JSON file.
   */
  public async readExpenses(): Promise<Expense[]> {
    await this.ensureStorage();

    try {
      const data = await fs.readFile(this.dataFile, "utf-8");

      if (!data.trim()) {
        return [];
      }

      const expenses = JSON.parse(data);

      return Array.isArray(expenses) ? (expenses as Expense[]) : [];
    } catch (error) {
      throw new Error(
        `Unable to read expense data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Persists the provided expenses to the JSON file.
   */
  public async writeExpenses(expenses: Expense[]): Promise<void> {
    await this.ensureStorage();

    try {
      const formattedData = JSON.stringify(expenses, null, 2);

      await fs.writeFile(this.dataFile, formattedData, "utf-8");
    } catch (error) {
      throw new Error(
        `Unable to write expense data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}

/**
 * Singleton instance shared across the application.
 */
export const fileStorage = new FileStorage();