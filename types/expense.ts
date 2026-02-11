export type Category =
  | "Food & Dining"
  | "Transport"
  | "Shopping"
  | "Entertainment"
  | "Bills & Utilities"
  | "Other";

export const CATEGORIES: Category[] = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Other",
];

export type Expense = {
  id: string;
  amount: number;
  description: string;
  category: Category;
  date: string; // ISO date string (YYYY-MM-DD)
};
