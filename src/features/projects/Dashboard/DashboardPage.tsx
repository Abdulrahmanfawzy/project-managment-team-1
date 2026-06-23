import {
  ArrowUpRight,
  ClipboardCheck,
  ClipboardClock,
  ClipboardList,
  Gauge,
} from "lucide-react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import StatsCard from "@/components/shared/StatsCard";
export const description = "A line chart with dots";
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
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;
const statistics = [
  {
    title: "Pending Tasks",
    value: "32",
    subValue: "+9% from last month",
    icon: <ClipboardClock />,
  },
  {
    title: "In Progress",
    value: "40",
    subValue: "+12% from last month",
    icon: <ClipboardList />,
  },
  {
    title: "Completed",
    value: "32",
    subValue: "+16% from last month",
    icon: <ClipboardCheck />,
  },
];
export default function DashboardPage() {
  return (
    <div className="container mx-auto my-6">
      <div className="flex justify-center flex-wrap gap-4 p-2">
        {statistics.map((item) => (
          <StatsCard
            title={item.title}
            value={item.value}
            subValue={item.subValue}
            icon={item.icon}
          />
        ))}

        <div className="flex justify-between p-4 shadow-sm text-black  space-y-2 rounded-sm">
          <div className="space-y-3">
            <h2>Completion Rate</h2>
            <h2 className="text-2xl font-bold">33%</h2>
            <div className="flex items-center gap-2">
              <ArrowUpRight size={18} className="text-green-700" />
              <span className="text-sm text-gray-500">
                +10% From the last month
              </span>
            </div>
          </div>
          <div>
            <Gauge />
          </div>
        </div>
      </div>{" "}
      {/* First Row */}
      <div className="grid grid-cols-4 ">
        <div className="col-span-2  ">
          <Card className="h-96 p-5">
            <CardHeader>
              <CardTitle>Line Chart - Dots</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                  style={{
                    height: "305px",
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="desktop"
                    type="natural"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={{
                      fill: "var(--color-desktop)",
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 leading-none font-medium">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="Second">
          <div className="flex justify-around">
            <h2>Active Projects</h2>
            <a>See All</a>
          </div>
        </div>

        <div className="third">
          <div className="flex justify-around">
            <h2>Recent files</h2>
            <p>See all</p>
          </div>
        </div>
      </div>
      {/* second row */}
    </div>
  );
}
