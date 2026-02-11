"use client";

import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { ExpenseChart } from "@/components/ExpenseChart";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Expense Tracker
          </h1>
          <p className="mt-2 text-lg text-foreground/60">
            Track your daily spending by category
          </p>
        </header>

        {/* Expense Form */}
        <div className="mb-8">
          <ExpenseForm />
        </div>

        {/* Chart and List */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <ExpenseList />
          </div>
          <div className="order-1 lg:order-2">
            <ExpenseChart />
          </div>
        </div>
      </div>
    </div>
  );
}
