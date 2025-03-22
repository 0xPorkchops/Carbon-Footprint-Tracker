"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { useUserContext } from "@/components/user-context";

const chartConfig = {
  emission: {
    label: "Your Carbon Emission (kgCO2e)",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function DataChart() {
  const { getAllEntries } = useUserContext();
  const carbonEntries = getAllEntries();

  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <BarChart accessibilityLayer data={carbonEntries}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="emission" fill="var(--color-emission)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
