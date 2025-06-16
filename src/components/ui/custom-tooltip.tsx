import { TooltipProps } from "recharts";

function CustomTooltip({ active, payload, label }: TooltipProps) {
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
