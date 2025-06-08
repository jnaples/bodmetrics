"use client";

import { startOfWeek, addDays, format, parse } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LineGraph } from "@/components/ui/line-graph";
import CheckinForm from "@/components/ui/checkin-form";
import { BodyWeightLineGraph } from "@/components/body-weight-line-graph";

export default function Home() {
  const [checkIns, setCheckIns] = useState([]);

  function addCheckinCard() {
    setCheckIns((prev) => {
      let newStartDate;

      if (prev.length === 0 || !prev.at(-1)?.startDate) {
        const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
        newStartDate = format(weekStart, "M/d/yyyy");
      } else {
        const lastStartDate = prev.at(-1).startDate;
        const parsedDate = parse(lastStartDate, "M/d/yyyy", new Date());
        const nextWeekStart = addDays(parsedDate, 7);
        newStartDate = format(nextWeekStart, "M/d/yyyy");
      }

      // Generate full week of formatted dates
      const parsedStart = parse(newStartDate, "M/d/yyyy", new Date());
      const weekDates = Array.from({ length: 7 }, (_, i) =>
        format(addDays(parsedStart, i), "M/d"),
      );

      return [
        ...prev,
        {
          weighIns: ["", "", "", "", "", "", ""],
          averageWeight: "",
          startDate: newStartDate,
          dates: weekDates, // ✅ send all week dates
        },
      ];
    });
  }

  function updateCheckInAtIndex(index, updateData) {
    setCheckIns((prev) => {
      // Create new one so we don't mutate the original data
      const newCheckIns = [...prev];
      newCheckIns[index] = { ...newCheckIns[index], ...updateData };

      return newCheckIns;
    });
  }

  return (
    <>
      <div className="relative mx-auto flex max-h-screen w-full flex-col gap-6 p-6 pb-20 lg:max-w-7xl">
        <div className="sticky top-0">
          <p>{checkIns.at(-1)?.averageWeight || "—"} lbs</p>
          <div className="sticky grid w-full auto-rows-min gap-4 md:grid-cols-4">
            <BodyWeightLineGraph title="Body weight" data={checkIns} />
            <LineGraph title="Waist measurement" />
            <LineGraph title="Body fat %" />
            <LineGraph title="Steps walked" />
          </div>
        </div>
        <h2 className="text-xl font-bold">Body tracking</h2>
        {checkIns.length > 0 && (
          <div className="flex w-full flex-col gap-6 overflow-scroll">
            {checkIns.map((checkIn, index) => (
              <CheckinForm
                key={index}
                index={index}
                data={checkIn}
                onUpdate={updateCheckInAtIndex}
              />
            ))}
          </div>
        )}
        <Button
          className="w-full font-bold uppercase lg:w-fit"
          onClick={addCheckinCard}
        >
          Add new week
        </Button>
      </div>
    </>
  );
}
