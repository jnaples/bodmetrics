"use client";

import { Card } from "./card";
import { Input } from "./input";
import { Label } from "./label";

export default function CheckinForm({ index, data, onUpdate }) {
  const dates = data.dates; // ✅ coming from parent

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
      // ✅ don't touch startDate or dates
    });
  }

  function handleWaistChange(value) {
    onUpdate(index, {
      waistMeasurement: value,
      // ✅ don't touch other fields
    });
  }

  function handleBodyFatChange(value) {
    onUpdate(index, {
      bodyFatPercentage: value,
      // ✅ don't touch other fields
    });
  }

  return (
    <Card className="w-full p-6">
      <form className="flex flex-col gap-3 lg:flex-col">
        <div className="flex flex-col gap-4 lg:flex-row">
          {dates.map((date, i) => (
            <div key={i}>
              <Label>{date}/2025</Label>
              <Input
                type="number"
                value={data.weighIns[i]}
                onChange={(e) => handleWeighInChange(i, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4">
          <div className="col-span-7 lg:col-span-1">
            <Label>Average weight</Label>
            <Input value={data.averageWeight} readOnly />
          </div>
          <div className="col-span-7 lg:col-span-1">
            <Label>Waist measurement</Label>
            <Input
              type="number"
              value={data.waistMeasurement || ""}
              onChange={(e) => handleWaistChange(e.target.value)}
            />
          </div>
          <div className="col-span-7 lg:col-span-1">
            <Label>Body fat %</Label>
            <Input
              type="number"
              step="0.1"
              value={data.bodyFatPercentage || ""}
              onChange={(e) => handleBodyFatChange(e.target.value)}
            />
          </div>
        </div>
      </form>
    </Card>
  );
}
