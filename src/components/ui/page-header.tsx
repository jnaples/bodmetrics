import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="mb-4 flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <div className="flex items-center space-x-2">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Fit phase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Weight loss</SelectItem>
            <SelectItem value="option2">Weight gain</SelectItem>
            <SelectItem value="option3">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
