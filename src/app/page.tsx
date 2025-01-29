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

export default function Home() {
  return (
    <>
      <div className="mx-auto w-full p-4 lg:max-w-7xl lg:pt-10">
        <PageHeader title="Dashboard" />
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <StatCard />
            <StatCard />
            <StatCard />
          </div>
          <LineGraph title="Weight Loss" />
        </div>
      </div>
    </>
  );
}
