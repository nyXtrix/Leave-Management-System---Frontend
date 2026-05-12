"use client";

import React, { useMemo } from "react";
import { Pie, PieChart, Label } from "recharts";

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
  type ChartConfig,
} from "@/components/ui/Chart";

export interface DonutChartProps {
  data: any[];
  config: ChartConfig;
  title?: string;
  description?: string;
  dataKey?: string;
  nameKey?: string;
}

export function DonutChart({
  data,
  config,
  title,
  description,
  dataKey = "value",
  nameKey = "name",
}: DonutChartProps) {
  const totalValue = useMemo(() => {
    return data.reduce((acc, curr) => acc + (Number(curr[dataKey]) || 0), 0);
  }, [data, dataKey]);

  return (
    <Card className="flex flex-col rounded-xl h-full shadow-sm border-slate-200">
      {(title || description) && (
        <CardHeader className="items-start pb-2 pt-5 px-6 border-b border-slate-100 bg-white/50">
          {title && (
            <CardTitle className="text-lg font-bold text-slate-800">
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className="text-xs font-medium">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className="flex-1 pb-6 pt-8 bg-white">
        <ChartContainer
          config={config}
          className="mx-auto aspect-square max-h-[40dvh] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={100}
              outerRadius={140}
              strokeWidth={3}
              paddingAngle={3}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-slate-900 text-3xl font-bold"
                        >
                          {totalValue}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-slate-500 text-sm font-medium"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
