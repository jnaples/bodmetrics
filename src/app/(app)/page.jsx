"use client";

import { startOfWeek, addDays, format, parse } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CheckinForm from "@/components/ui/checkin-form";
import { BodyWeightLineGraph } from "@/components/ui/body-weight-line-graph";
import { WaistMeasurementLineGraph } from "@/components/ui/waist-measurement-line-graph";
import { BodyFatLineGraph } from "@/components/ui/body-fat-line-graph";
import { useConvertToMonths } from "@/hooks/useConverToMonths";
import PageHeader from "@/components/ui/page-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [checkIns, setCheckIns] = useState([]);

  const weightData = checkIns
    .filter((entry) => entry.averageWeight && entry.startDate)
    .map((entry) => ({
      date: entry.startDate,
      average: parseFloat(entry.averageWeight),
      waist: entry.waistMeasurement ? parseFloat(entry.waistMeasurement) : null,
      bodyFat: entry.bodyFatPercentage
        ? parseFloat(entry.bodyFatPercentage)
        : null,
    }));

  const waistData = checkIns
    .filter((entry) => entry.waistMeasurement && entry.startDate)
    .map((entry) => ({
      date: entry.startDate,
      waist: parseFloat(entry.waistMeasurement),
    }));

  const bodyFatData = checkIns
    .filter((entry) => entry.bodyFatPercentage && entry.startDate)
    .map((entry) => ({
      date: entry.startDate,
      bodyFat: parseFloat(entry.bodyFatPercentage),
    }));

  // Log the weight data to see average weights week over week
  console.log(
    "Complete weekly data:",
    checkIns.map((week, index) => ({
      weekNumber: index + 1,
      ...week,
    })),
  );

  const {
    rolledUpData: rolledUpWeightData,
    view,
    setView,
  } = useConvertToMonths(weightData);
  const { rolledUpData: rolledUpWaistData } = useConvertToMonths(
    waistData,
    view,
  );
  const { rolledUpData: rolledUpBodyFatData } = useConvertToMonths(
    bodyFatData,
    view,
  );

  function addCheckinCard() {
    setCheckIns((prev) => {
      let newStartDate;

      if (prev.length === 0 || !prev.at(-1)?.startDate) {
        // check if this is the first check-in card being added
        const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 }); // date fns function to get most recent Sunday
        newStartDate = format(weekStart, "yyyy-MM-dd"); // turn this Sunday into "6/2/2025"
      } else {
        // if it's not the first check-in card get the startDate
        const lastStartDate = prev.at(-1).startDate;
        const parsedDate = parse(lastStartDate, "yyyy-MM-dd", new Date()); // update format
        const nextWeekStart = addDays(parsedDate, 7); // date-fns to add 7 days to the parsed last start date
        newStartDate = format(nextWeekStart, "yyyy-MM-dd"); // set the value of the new start date
      }

      // Generate full week of formatted dates
      const parsedStart = parse(newStartDate, "yyyy-MM-dd", new Date());
      const weekDates = Array.from({ length: 7 }, (_, i) =>
        format(addDays(parsedStart, i), "yyyy-MM-dd"),
      );

      return [
        // Return the updated checkIns array with the new week
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
          <div className="mb-4 flex items-center justify-between">
            <PageHeader title="Body tracking" />
            <div className="flex items-center space-x-2">
              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Fit phase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Weight loss</SelectItem>
                  <SelectItem value="option2">Weight gain</SelectItem>
                  <SelectItem value="option3">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={view} onValueChange={setView}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="sticky grid w-full auto-rows-min gap-4 md:grid-cols-3">
            <BodyWeightLineGraph
              title="Body weight"
              weightData={rolledUpWeightData}
            />
            <WaistMeasurementLineGraph
              title="Waist measurement"
              waistData={rolledUpWaistData}
            />
            <BodyFatLineGraph
              title="Body fat %"
              bodyFatData={rolledUpBodyFatData}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Body tracking</h2>
        </div>
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
