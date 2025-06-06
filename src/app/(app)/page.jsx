"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LineGraph } from "@/components/ui/line-graph";
import PageHeader from "@/components/ui/page-header";
import CheckinForm from "@/components/ui/checkin-form";
import { BodyWeightLineGraph } from "@/components/body-weight-line-graph";

export default function Home() {
  const [checkIns, setCheckIns] = useState([]);

  function addCheckinCard() {
    setCheckIns((prev) => [
      ...prev,
      {
        weighIns: ["", "", "", "", "", "", ""],
        averageWeight: "",
        startDate: "",
      },
    ]);
  }

  function updateCheckInAtIndex(index, updateData) {
    setCheckIns((prev) => {
      // Create new one so we don't mutate the original data
      const newCheckIns = [...prev];
      newCheckIns[index] = { ...newCheckIns[index], ...updateData };

      return newCheckIns;
    });
  }

  useEffect(() => {
    console.log("checkIns state changed:", checkIns[0]);
  }, [checkIns]);

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
