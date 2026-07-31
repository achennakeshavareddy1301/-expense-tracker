export interface Expense {
    id: string;
    title: string;
    amount: number;
    category: string;
    date: string;
  }
  
  export interface CreateExpenseDto {
    title: string;
    amount: number;
    category: string;
    date: string;
  }
  
  export interface ExpenseQueryDto {
    category?: string;
  }
  
  export interface ExpenseSummary {
    total: number;
    category?: string;
  }
  
  export interface ApiSuccessResponse<T> {
    success: true;
    data: T;
  }
  
  export interface ApiErrorResponse {
    success: false;
    message: string;
  }