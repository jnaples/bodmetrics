"use client";
import { format, addDays, startOfWeek } from "date-fns";

import { useState } from "react";
import { Card } from "./card";
import { Input } from "./input";
import { Label } from "./label";

export default function CheckinForm({ index, data, onUpdate }) {
  // const dates = ["5/1", "5/2", "5/3", "5/4", "5/5", "5/6", "5/7"];

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 }); // Monday
  const dates = Array.from({ length: 7 }, (_, i) =>
    format(addDays(weekStart, i), "M/d"),
  );

  function handleWeighInChange(i, value) {
    const newWeighIns = [...data.weighIns];
    newWeighIns[i] = value;

    const nums = newWeighIns
      .map((w) => parseFloat(w))
      .filter((n) => Number.isFinite(n));

    const avg =
      nums.length > 0
        ? (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1)
        : "";

    onUpdate(index, {
      weighIns: newWeighIns,
      averageWeight: avg,
      startDate: dates[0],
    });
  }

  return (
    <Card className="w-full p-6">
      <form className="flex flex-col gap-3 lg:flex-col">
        <div className="flex flex-col gap-4 lg:flex-row">
          {dates.map((date, i) => (
            <div key={i}>
              <Label htmlFor="email">{date}/2025</Label>
              <Input
                type="number"
                value={data.weighIns[i]}
                onChange={(e) => handleWeighInChange(i, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          <div className="col-span-7 lg:col-span-1">
            <Label>Average weight</Label>
            <Input value={data.averageWeight} readOnly />
          </div>
        </div>
      </form>
    </Card>
  );
}
