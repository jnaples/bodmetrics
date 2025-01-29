import * as React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export function StatCard() {
  return (
    <Card className="flex h-full w-full flex-col justify-between">
      <CardHeader>
        <div className="flex space-x-3">
          <CardTitle>
            <div className="flex items-center gap-3 text-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-weight"
                >
                  <circle cx="12" cy="5" r="3" />
                  <path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z" />
                </svg>
              </div>
              <span className="text-base">Total Weight Loss</span>
            </div>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-center gap-3">
          <div className="text-2xl font-bold lg:text-4xl">23 lbs</div>
          <div className="flex items-center text-green-500"></div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center space-x-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-trending-down text-green-600"
          >
            <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
            <polyline points="16 17 22 17 22 11" />
          </svg>
          <p className="text-muted-foreground">
            <span className="text-green-600">3 lbs</span> from last month
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
