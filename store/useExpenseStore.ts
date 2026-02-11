import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Expense } from "@/types/expense";

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
}

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set) => ({
      expenses: [],

      addExpense: (expense) =>
        set((state) => ({
          expenses: [
            { ...expense, id: crypto.randomUUID() },
            ...state.expenses,
          ],
        })),

      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),
    }),
    {
      name: "expense-tracker-storage",
    }
  )
);
