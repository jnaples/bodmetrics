"use client";

import { useState } from "react";
import { Card } from "./card";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import WeightInput from "./weight-input";

export default function CheckinForm({
  index,
  averageWeight,
  setAverageWeightAtIndex,
}) {
  // Keep local state for 7 weigh-ins
  const [weighIns, setWeighIns] = useState(["", "", "", "", "", "", ""]);

  // Other form fields can be controlled similarly or left uncontrolled for now
  const [calorieGoal, setCalorieGoal] = useState("");
  const [bodyFatCaliper, setBodyFatCaliper] = useState("");
  const [bodyFatPercent, setBodyFatPercent] = useState("");
  const [waistMeasurement, setWaistMeasurement] = useState("");
  const [notes, setNotes] = useState("");

  function handleWeighInChange(index, value) {
    const newWeighIns = [...weighIns];
    newWeighIns[index] = value; // Set the input value typed by the user at the correct field index
    setWeighIns(newWeighIns);

    // Calculate average immediately after setting weighIns
    const weighInArray = newWeighIns
      .map((w) => parseFloat(w))
      .filter((n) => !isNaN(n));

    if (weighInArray.length === 0) {
      setAverageWeightAtIndex("");
    } else {
      const avg = weighInArray.reduce((a, b) => a + b, 0) / weighInArray.length;
      setAverageWeightAtIndex(avg.toFixed(1));
    }
  }

  return (
    <Card className="w-full p-6">
      <form className="flex flex-col gap-3 lg:flex-col">
        <div className="flex flex-col gap-4 lg:flex-row">
          {["5/1", "5/2", "5/3", "5/4", "5/5", "5/6", "5/7"].map((date, i) => (
            <div key={i}>
              <Label htmlFor="email">{date}/2025</Label>
              <Input
                type="number"
                value={weighIns[i]}
                onChange={(e) => handleWeighInChange(i, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          <div className="col-span-7 lg:col-span-1">
            <Label>Daily calorie goal</Label>
            <Input
              type="number"
              value={calorieGoal}
              onChange={(e) => setCalorieGoal(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-7">
          <div className="col-span-7 lg:col-span-1">
            <Label>Body fat caliper</Label>
            <Input
              type="number"
              value={bodyFatCaliper}
              onChange={(e) => setBodyFatCaliper(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-7">
          <div className="col-span-7 lg:col-span-1">
            <Label>Body fat %</Label>
            <Input
              type="number"
              value={bodyFatPercent}
              onChange={(e) => setBodyFatPercent(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-7">
          <div className="col-span-7 lg:col-span-1">
            <Label>Waist measurement</Label>
            <Input
              type="number"
              value={waistMeasurement}
              onChange={(e) => setWaistMeasurement(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-7">
          <div className="col-span-7 lg:col-span-1">
            <Label>Average weight</Label>
            <Input value={averageWeight} readOnly />
          </div>
        </div>
        <div>
          <Label>Notes</Label>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      </form>
    </Card>
  );
}
