"use client";

import { use, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { LineGraph } from "@/components/ui/line-graph";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { StatCard } from "@/components/ui/stat-card";
import PageHeader from "@/components/ui/page-header";

import TopNavBar from "@/components/ui/top-navbar";

import WeightInput from "@/components/ui/weight-input";
import CheckinForm from "@/components/ui/checkin-form";
import { BodyWeightLineGraph } from "@/components/body-weight-line-graph";

export default function Home() {
  const [checkIns, setCheckins] = useState([]);
  const [averageWeight, setAverageWeight] = useState("");
  const [weeklyAverageWeight, setWeeklyAverageWeight] = useState([]);

  const weeklyAverage = weeklyAverageWeight.join(", ");

  const addCheckinCard = () => {
    setCheckins((prev) => [...prev, prev.length]);
  };

  return (
    <>
      <div className="relative mx-auto flex max-h-screen w-full flex-col gap-6 p-6 pb-20 lg:max-w-7xl">
        <div className="sticky top-0">
          <PageHeader title="Dashboard" />
          <p>{weeklyAverage} lbs</p>
          <div className="sticky grid w-full auto-rows-min gap-4 md:grid-cols-4">
            <BodyWeightLineGraph
              title="Body weight"
              averageWeight={averageWeight}
            />
            <LineGraph title="Waist measurement" />
            <LineGraph title="Body fat %" />
            <LineGraph title="Steps walked" />
          </div>
        </div>
        <h2 className="text-xl font-bold">Body tracking</h2>
        {checkIns.length > 0 && (
          <div className="flex w-full flex-col gap-6 overflow-scroll">
            {checkIns.map((checkinID, index) => (
              <CheckinForm
                key={checkinID}
                index={index}
                averageWeight={weeklyAverageWeight[index] || ""}
                setAverageWeightAtIndex={(value) => {
                  setWeeklyAverageWeight((prev) => {
                    const updated = [...prev];
                    updated[index] = value;
                    return updated;
                  });
                }}
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
