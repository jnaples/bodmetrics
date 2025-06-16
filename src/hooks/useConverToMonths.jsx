import { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";

export function useConvertToMonths(data) {
  const [view, setView] = useState("weekly"); // weekly, monthly, yearly

  const rolledUpData = useMemo(() => {
    if (!data?.length) return [];

    if (view === "weekly") {
      // Just return data as-is for weekly view
      return data;
    }

    // Determine date format based on view
    const dateFormat = view === "monthly" ? "yyyy-MM" : "yyyy";

    // Aggregate by month or year
    const grouped = data.reduce((acc, entry) => {
      const key = format(parseISO(entry.date), dateFormat);

      if (!acc[key]) {
        acc[key] = {
          date: `${key}-01`, // normalize to first of the month
          averageSum: 0,
          count: 0,
        };
      }

      acc[key].averageSum += entry.average;
      acc[key].count += 1;

      return acc;
    }, {});

    return Object.values(grouped).map(({ date, averageSum, count }) => ({
      date,
      average: parseFloat((averageSum / count).toFixed(1)),
    }));
  }, [data, view]);

  return { rolledUpData, view, setView };
}
