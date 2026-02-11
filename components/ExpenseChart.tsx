"use client";

import { useExpenseStore } from "@/store/useExpenseStore";
import { Category, CATEGORIES } from "@/types/expense";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const CHART_COLORS: Record<Category, string> = {
  "Food & Dining": "#f97316",
  Transport: "#3b82f6",
  Shopping: "#ec4899",
  Entertainment: "#a855f7",
  "Bills & Utilities": "#eab308",
  Other: "#6b7280",
};

export const ExpenseChart = () => {
  const expenses = useExpenseStore((state) => state.expenses);

  // Aggregate spending by category
  const data = CATEGORIES.map((cat) => {
    const total = expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0);
    return { name: cat, value: total };
  }).filter((d) => d.value > 0);

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Spending by Category
        </h2>
        <div className="flex h-64 items-center justify-center text-foreground/40">
          <p className="text-center">
            <span className="block text-lg font-medium">No data yet</span>
            <span className="mt-1 block text-sm">
              Add expenses to see your spending breakdown.
            </span>
          </p>
        </div>
      </div>
    );
  }

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-foreground">
        Spending by Category
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            label={({ name, value }) =>
              `${name}: ฿${value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
            }
            labelLine={false}
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={CHART_COLORS[entry.name as Category]}
                stroke="none"
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => {
              const num = Number(value);
              return [
                `฿${num.toLocaleString("en-US", { minimumFractionDigits: 2 })} (${((num / total) * 100).toFixed(1)}%)`,
                "Amount",
              ];
            }}
            contentStyle={{
              borderRadius: "0.75rem",
              border: "1px solid rgba(0,0,0,0.08)",
              fontSize: "0.875rem",
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value: string) => (
              <span className="text-sm text-foreground/70">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
