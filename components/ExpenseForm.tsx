"use client";

import { useState } from "react";
import { useExpenseStore } from "@/store/useExpenseStore";
import { Category, CATEGORIES } from "@/types/expense";

export const ExpenseForm = () => {
  const addExpense = useExpenseStore((state) => state.addExpense);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Food & Dining");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const parsedAmount = parseFloat(amount);
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid amount greater than 0");
      return;
    }
    if (!description.trim()) {
      setError("Please enter a description");
      return;
    }
    if (!date) {
      setError("Please select a date");
      return;
    }

    addExpense({
      amount: parsedAmount,
      description: description.trim(),
      category,
      date,
    });

    // Reset form
    setAmount("");
    setDescription("");
    setCategory("Food & Dining");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 shadow-sm"
    >
      <h2 className="mb-4 text-xl font-semibold text-foreground">
        Add Expense
      </h2>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="mb-1 block text-sm font-medium text-foreground/70"
          >
            Amount (฿)
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-foreground/15 bg-background px-4 py-2.5 text-foreground placeholder:text-foreground/30 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium text-foreground/70"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="What did you spend on?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-foreground/15 bg-background px-4 py-2.5 text-foreground placeholder:text-foreground/30 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="mb-1 block text-sm font-medium text-foreground/70"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full rounded-lg border border-foreground/15 bg-background px-4 py-2.5 text-foreground focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="mb-1 block text-sm font-medium text-foreground/70"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-foreground/15 bg-background px-4 py-2.5 text-foreground focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 w-full rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 sm:w-auto"
      >
        Add Expense
      </button>
    </form>
  );
};
