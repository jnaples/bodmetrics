"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import WeightInput from "@/components/ui/weight-input";
import CheckinForm from "@/components/ui/checkin-form";
import { BodyWeightLineGraph } from "@/components/body-weight-line-graph";

export default function Home() {
  const [checkIns, setCheckins] = useState([]);
  const [averageWeight, setAverageWeight] = useState("");

  const addCheckinCard = () => {
    setCheckins((prev) => [...prev, prev.length]);
  };

  return (
    <>
      <div className="mx-auto w-full p-4 pb-20 lg:max-w-7xl lg:pt-10">
        <PageHeader title="Dashboard" />
        <div className="flex flex-col items-start gap-4">
          <p>{averageWeight} lbs</p>
          <div className="grid w-full auto-rows-min gap-4 md:grid-cols-4">
            <BodyWeightLineGraph
              title="Body weight"
              averageWeight={averageWeight}
            />
            <LineGraph title="Waist measurement" />
            <LineGraph title="Body fat %" />
            <LineGraph title="Steps walked" />
          </div>
          <h2 className="text-xl font-bold">Body tracking</h2>

          <div className="flex w-full flex-col gap-10">
            {checkIns.map((checkinID) => (
              <CheckinForm
                key={checkinID}
                averageWeight={averageWeight}
                setAverageWeight={setAverageWeight}
              />
            ))}
          </div>
          <Button
            className="w-full font-bold uppercase lg:w-fit"
            onClick={addCheckinCard}
          >
            Add new week
          </Button>
        </div>
      </div>
    </>
  );
}
