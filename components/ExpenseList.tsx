"use client";

import { useState } from "react";
import { useExpenseStore } from "@/store/useExpenseStore";
import { Category, CATEGORIES } from "@/types/expense";

const categoryColors: Record<Category, string> = {
  "Food & Dining": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Transport: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Shopping: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  Entertainment: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "Bills & Utilities": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Other: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
};

export const ExpenseList = () => {
  const expenses = useExpenseStore((state) => state.expenses);
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);
  const [filter, setFilter] = useState<Category | "All">("All");

  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((e) => e.category === filter);

  const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-foreground">Expenses</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Category | "All")}
          className="rounded-lg border border-foreground/15 bg-background px-3 py-2 text-sm text-foreground focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Total */}
      <div className="mb-4 rounded-lg bg-blue-50 px-4 py-3 dark:bg-blue-900/20">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          Total:{" "}
        </span>
        <span className="text-lg font-bold text-blue-700 dark:text-blue-300">
          ฿{total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>

      {/* List */}
      {filteredExpenses.length === 0 ? (
        <div className="py-12 text-center text-foreground/40">
          <p className="text-lg font-medium">No expenses yet</p>
          <p className="mt-1 text-sm">Add your first expense above to get started.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filteredExpenses.map((expense) => (
            <li
              key={expense.id}
              className="flex items-center justify-between rounded-lg border border-foreground/8 bg-background px-4 py-3 transition-colors hover:border-foreground/15"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium text-foreground">
                    {expense.description}
                  </span>
                  <span
                    className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${categoryColors[expense.category]}`}
                  >
                    {expense.category}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-foreground/50">
                  {new Date(expense.date + "T00:00:00").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="ml-4 flex items-center gap-3">
                <span className="text-lg font-semibold text-foreground">
                  ฿{expense.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="rounded-lg p-1.5 text-foreground/30 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                  aria-label={`Delete ${expense.description}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
