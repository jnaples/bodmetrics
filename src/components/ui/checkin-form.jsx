"use client";
import { useState } from "react";
import { Card } from "./card";
import { Input } from "./input";
import { Label } from "./label";

export default function CheckinForm({
  index,
  averageWeight,
  setAverageWeightAtIndex,
}) {
  // Keep local state for 7 weigh-ins
  const [weighIns, setWeighIns] = useState(["", "", "", "", "", "", ""]);

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
            <Label>Average weight</Label>
            <Input value={averageWeight} readOnly />
          </div>
        </div>
      </form>
    </Card>
  );
}
