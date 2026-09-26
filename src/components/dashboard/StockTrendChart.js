import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const weeklyMovement = [
  { day: "Mon", received: 120, delivered: 80 },
  { day: "Tue", received: 90, delivered: 60 },
  { day: "Wed", received: 60, delivered: 110 },
  { day: "Thu", received: 140, delivered: 70 },
  { day: "Fri", received: 100, delivered: 130 },
  { day: "Sat", received: 40, delivered: 30 },
  { day: "Sun", received: 20, delivered: 10 },
];

export default function Chart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={weeklyMovement} barGap={4} margin={{ left: -20 }}>
        <CartesianGrid vertical={false} stroke="#e1e5e8" />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: "#5c6b73" }}
        />
        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#5c6b73" }} />
        <Tooltip
          contentStyle={{
            fontSize: 12,
            borderRadius: 6,
            border: "1px solid #e1e5e8",
          }}
        />
        <Bar dataKey="received" name="Received" fill="#2f5fae" radius={[3, 3, 0, 0]} />
        <Bar dataKey="delivered" name="Delivered" fill="#c67b1e" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}