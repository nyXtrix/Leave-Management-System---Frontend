import React, { useMemo } from "react";
import { Bar, BarChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/Chart";

export type ChartData = {
  month: string;
} & Record<string, string | number | undefined>;

interface BarChartProps {
  data: ChartData[];
}

const ALL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CHART_PALETTE = [
  "var(--color-primary-600)",
  "var(--color-primary-500)",
  "var(--color-primary-400)",
  "var(--color-primary-300)",
  "var(--color-primary-200)",
];

export function ChartBarDefault({ data = [] }: BarChartProps) {
  const uniqueLeaveTypes = useMemo(() => {
    return Array.from(
      new Set(data.flatMap((d) => Object.keys(d).filter((k) => k !== "month"))),
    );
  }, [data]);

  const chartData = useMemo(() => {
    return ALL_MONTHS.map((m) => {
      const existing = data.find((d) => d.month === m) || {};
      const monthData: any = { month: m };
      uniqueLeaveTypes.forEach((type) => {
        monthData[type] = (existing as any)[type] || 0;
      });
      return monthData;
    });
  }, [data, uniqueLeaveTypes]);

  const chartConfig = useMemo(() => {
    return uniqueLeaveTypes.reduce((acc, type, index) => {
      acc[type] = {
        label: type,
        color: CHART_PALETTE[index % CHART_PALETTE.length],
      };
      return acc;
    }, {} as ChartConfig);
  }, [uniqueLeaveTypes]);

  return (
    <Card className="py-4 hover:shadow-none shadow-none bg-transparent rounded-xl">
      <CardHeader className="px-6">
        <CardTitle className="text-xl">Leave Summary</CardTitle>
        <CardDescription>
          Timeline of leaves taken in the current year
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="h-[240px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              fontSize={10}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend
              content={<ChartLegendContent />}
              className="flex-wrap justify-center gap-x-4 gap-y-1 mt-4"
            />

            {uniqueLeaveTypes.map((type, index) => (
              <Bar
                key={type}
                dataKey={type}
                stackId="a"
                fill={CHART_PALETTE[index % CHART_PALETTE.length]}
                radius={
                  index === uniqueLeaveTypes.length - 1
                    ? [4, 4, 0, 0]
                    : [0, 0, 0, 0]
                }
                barSize={32}
                background={
                  index === 0
                    ? { fill: "var(--color-secondary-200)", radius: 4 }
                    : undefined
                }
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
