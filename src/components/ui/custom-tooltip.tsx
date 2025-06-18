import { TooltipProps } from "recharts";

interface CustomTooltipProps extends TooltipProps<any, any> {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0];

  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #ccc",
        padding: 8,
        borderRadius: 4,
        fontSize: 12,
      }}
    >
      <div>
        <strong>{data.name}:</strong>{" "}
        <span style={{ marginLeft: 8 }}>{data.value}</span>
      </div>
      <div>{label}</div> {/* if you want to show the date or label */}
    </div>
  );
}

export default CustomTooltip;
