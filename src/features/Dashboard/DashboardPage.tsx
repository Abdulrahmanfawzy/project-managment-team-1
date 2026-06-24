import {
  ArrowUpRight,
  Backpack,
  ClipboardCheck,
  ClipboardClock,
  ClipboardList,
  Download,
  FileText,
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
import { Link } from "react-router-dom";
export const description = "A line chart with dots";
import pdf from "@/assets/[CITYPNG.COM]PDF File Document Red Icon - 1000x1000 1.svg"
import jsx from "@/assets/image 1837.svg"
import sql from "@/assets/image 1838.svg"
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
    progressValue: "32/94",
    subValue: "+9% from last month",
    icon: <ClipboardClock />,
    color: "bg-[#FA9E00]",
    backgroundColor: "bg-[#FFF5E6]",
    iconColor:"#FA9E00"
  },
  {
    title: "In Progress",
    value: "40",
    progressValue: "40/94",
    subValue: "+12% from last month",
    icon: <ClipboardList />,
    color: "bg-[#005AFB]",
    backgroundColor: "bg-[#E6EFFF]",
    iconColor:"#005AFB"
  },
  {
    title: "Completed",
    value: "32",
    progressValue: "22/94",
    subValue: "+16% from last month",
    icon: <ClipboardCheck />,
    color: "bg-[#2BA52E]",
    backgroundColor: "bg-[#EAF6EA]",
    iconColor:"#2BA52E"
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
            color={item.color}
            backgroundColor={item.backgroundColor}
            progressValue={item.progressValue}
            iconColor={item.iconColor}
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
      <div className="flex justify-center   m-auto mt-5 w-[93%] space-x-4">
        <div className="w-[53.5%]  max-h-60">
          <Card className=" p-5">
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

        <div className="Second space-y-4 w-[26.5%] bg-white max-h-60 rounded-lg p-5 shadow-sm ">
          <div className="flex justify-between">
            <h2>Active Projects</h2>
            <Link to="/"  className="text-blue-500">See All</Link>
          </div>
          <div className=" rounded-sm h-1/6 my-4 ">
            <div className="flex space-x-0.5">
              <Backpack />
              <h2>Alpha</h2>
            </div>
            <div className="w-full bg-[#F2EAF2] rounded-full h-2">
              <div className="bg-purple-900 h-2 rounded-full w-1/2 mt-3" ></div>
              <h2>Task: 100/140</h2>
            </div>
          </div>

          <div className="rounded-sm h-1/6 py-6">
            <div className="flex space-x-0.5 ">
              <Backpack />
              <h2>SepetGo</h2>
            </div>
            <div className={`w-full bg-[#E6F8F7] rounded-full h-2`}>
              <div className={`bg-[#04B5AE] h-2 rounded-full w-5/12 mt-3`} ></div>
              <h2>Task: 52/120</h2>
            </div>
          </div>
        </div>


        <div className="third w-[20%]  space-y-4 rounded-lg  max-h-60  bg-white py-5 px-3 shadow-sm" >
          <div className="flex justify-between">
            <h2>Recent files</h2>
            <Link to="/"  className="text-blue-500">See All</Link>
          </div>
           

           <div className="flex justify-between  items-center space-x-1.5 pdf border-b-gray-600">
               <div>
                    <img src={pdf}/>
               </div>
               <div className="text-xs">
                  <h2>UX_Research_Summary.pdf</h2>
                  <p>By Mohanad Wahib • 13:00</p>
               </div>
               <div>
                 <Download />
               </div>
           </div>
             <div className="flex justify-around items-center space-x-1.5">
               <div>
                    <img src={jsx}/>
               </div>
               <div className="text-xs">
                  <h2>Dashboard_Layout_React.jsx</h2>
                  <p>By Wahib salem • 14:06</p>
               </div>
               <div>
                 <Download />
               </div>
           </div>
             <div className="flex justify-between items-center space-x-1.5">
               <div>
                    <img src={sql}/>
               </div>
               <div className="text-xs">
                  <h2>Database_Schema_v2.sql</h2>
                  <p>By Mohamed Nadir • 13:00</p>
               </div>
               <div>
                 <Download />
               </div>
           </div>      
        </div>
      </div>
      {/* second row */}
      

    </div>
  
  )};