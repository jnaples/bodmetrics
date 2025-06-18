"use client";

import { format, parseISO } from "date-fns";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Body Fat",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

// Utility function to calculate date range
function getDateRange(data: { date: string; bodyFat: number }[]) {
  if (!data || data.length === 0) {
    return "No data available";
  }

  try {
    const dates = data
      .filter((item) => item && item.date) // Filter out any undefined or null items
      .map((item) => parseISO(item.date))
      .filter((date) => !isNaN(date.getTime())) // Filter out invalid dates
      .sort((a, b) => a.getTime() - b.getTime());

    if (dates.length === 0) {
      return "No valid data available";
    }

    const startDate = dates[0];
    const endDate = dates[dates.length - 1];

    const startFormatted = format(startDate, "MMMM");
    const endFormatted = format(endDate, "MMMM yyyy");

    if (startDate.getFullYear() === endDate.getFullYear()) {
      if (startDate.getMonth() === endDate.getMonth()) {
        return `${startFormatted} ${startDate.getFullYear()}`;
      }
      return `${startFormatted} - ${endFormatted}`;
    }

    return `${startFormatted} ${startDate.getFullYear()} - ${endFormatted}`;
  } catch (error) {
    console.error("Error calculating date range:", error);
    return "Date range unavailable";
  }
}

export function BodyFatLineGraph({
  title,
  description,
  bodyFatData,
}: {
  title: string;
  description?: string;
  bodyFatData: { date: string; bodyFat: number }[];
}) {
  const dateRange = getDateRange(bodyFatData);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={bodyFatData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              interval={0}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => format(parseISO(value), "M/d")}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="bodyFat"
              name="Body Fat %"
              type="linear"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {dateRange}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
