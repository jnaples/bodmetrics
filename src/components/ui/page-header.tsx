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
     
    </div>
  );
}
