import { useForm, useWatch } from "react-hook-form";
import { Card } from "./card";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import WeightInput from "./weight-input";

export default function CheckinForm() {
  const { register, control } = useForm({
    defaultValues: {
      weighIns: Array(7).fill(""),
      calorieGoal: "",
      bodyFatCaliper: "",
      bodyFatPercent: "",
      waistMeasurement: "",
      notes: "",
    },
  });

  // Watch the weights array to calculate the average
  const weighIns = useWatch({ control, name: "weighIns" });

  const averageWeight = (() => {
    const nums = weighIns
      .map((weighIn) => parseFloat(weighIn))
      .filter((n) => !isNaN(n));

    if (nums.length === 0) return "";

    return (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1);
  })();

  return (
    <Card className="w-full p-6">
      <form className="flex flex-col gap-3 lg:flex-col">
        <div className="flex flex-col gap-4 lg:flex-row">
          {["5/1", "5/2", "5/3", "5/4", "5/5", "5/6", "5/7"].map((date, i) => (
            <div key={i}>
              <Label htmlFor="email">{date}/2025</Label>
              <Input type="number" {...register(`weighIns.${i}`)} />
            </div>
          ))}

          {/* <div>
            <Label htmlFor="email">5/1/2025</Label>
            <WeightInput />
          </div>
          <div>
            <Label htmlFor="email">5/2/2025</Label>
            <WeightInput />
          </div>
          <div>
            <Label htmlFor="email">5/3/2025</Label>
            <WeightInput />
          </div>
          <div>
            <Label htmlFor="email">5/4/2025</Label>
            <WeightInput />
          </div>
          <div>
            <Label htmlFor="email">5/5/2025</Label>
            <WeightInput />
          </div>
          <div>
            <Label htmlFor="email">5/6/2025</Label>
            <WeightInput />
          </div>
          <div>
            <Label htmlFor="email">5/7/2025</Label>
            <WeightInput />
          </div> */}
        </div>
        <div className="grid grid-cols-7">
          <div className="col-span-7 lg:col-span-1">
            <Label>Daily calorie goal</Label>
            <Input type="number" />
          </div>
        </div>
        <div className="grid grid-cols-7">
          <div className="col-span-7 lg:col-span-1">
            <Label>Body fat caliper</Label>
            <Input type="number" />
          </div>
        </div>
        <div className="grid grid-cols-7">
          <div className="col-span-7 lg:col-span-1">
            <Label>Body fat %</Label>
            <Input type="number" />
          </div>
        </div>
        <div className="grid grid-cols-7">
          <div className="col-span-7 lg:col-span-1">
            <Label>Waist measurement</Label>
            <Input />
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
          <Textarea />
        </div>
      </form>
    </Card>
  );
}
