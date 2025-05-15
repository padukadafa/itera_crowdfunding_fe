import { DollarSign, Flag, User } from "lucide-react";
import DashboardLayout from "./Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const DashboardPage = () => {
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  return (
    <>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 w-full">
        <div className="p-6 flex flex-col gap-y-6 w-full rounded-xl border shadow">
          <div className="flex items-center justify-between">
            <p className="font-medium text-lg">Total Donasi</p>
            <DollarSign />
          </div>
          <p className="font-bold text-2xl">Rp. 124.652.180</p>
        </div>
        <div className="p-6 flex flex-col gap-y-6 w-full rounded-xl border shadow">
          <div className="flex items-center justify-between">
            <p className="font-medium text-lg">Total Donatur</p>
            <User />
          </div>
          <p className="font-bold text-2xl">18.721</p>
        </div>
        <div className="p-6 flex flex-col gap-y-6 w-full rounded-xl border shadow">
          <div className="flex items-center justify-between">
            <p className="font-medium text-lg">Total Kampanye</p>
            <Flag />
          </div>
          <p className="font-bold text-2xl">1.210</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-12 mt-12">
        <div className="col-span-2 rounded-xl shadow border p-6">
          <h2 className="text-xl font-bold">Overview</h2>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />

              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="rounded-xl col-span-1 shadow border p-6 h-min">
          <h2 className="text-xl font-bold">Donasi Terbaru</h2>
          <p className="text-slate-600">Total donasi bulan ini 127 donasi</p>
          <div className="flex flex-col gap-y-6 mt-12">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((_) => {
              return (
                <div className="flex justify-between">
                  <div className="flex gap-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="https://clarity-tailwind.preview.uideck.com/images/user-02.png" />
                      <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-lg font-medium">Dona Olivia</p>
                      <p className="text-slate-600">Teknik Informatika</p>
                    </div>
                  </div>
                  <p className="text-lg font-medium">Rp. 132.000</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
