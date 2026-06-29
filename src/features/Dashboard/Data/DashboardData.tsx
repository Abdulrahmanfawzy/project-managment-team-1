
import pdf from "@/assets/[CITYPNG.COM]PDF File Document Red Icon - 1000x1000 1.svg"
import jsx from "@/assets/image 1837.svg"
import sql from "@/assets/image 1838.svg"
import { ClipboardCheck, ClipboardClock, ClipboardList } from "lucide-react"
export const statistics = [
  {
    title: "Pending Tasks",
    value: "32",
    progressValue: "32/94",
    subValue: "+9% from last month",
    icon: <ClipboardClock/>,
    color: "bg-[#FA9E00]",
    backgroundColor: "bg-[#FFF5E6]",
    iconColor: "#FA9E00"
  },
  {
    title: "In Progress",
    value: "40",
    progressValue: "40/94",
    subValue: "+12% from last month",
    icon: <ClipboardList />,
    color: "bg-[#005AFB]",
    backgroundColor: "bg-[#E6EFFF]",
    iconColor: "#005AFB"
  },
  {
    title: "Completed",
    value: "32",
    progressValue: "22/94",
    subValue: "+16% from last month",
    icon: <ClipboardCheck />,
    color: "bg-[#2BA52E]",
    backgroundColor: "bg-[#EAF6EA]",
    iconColor: "#2BA52E"
  },
];

export const progresses = [
  {
    Name: "Mohaned habib ",
    progressValue: "12/14",
    progress: "w-9/12",
  },
  {
    Name: "Sara Hassan",
    progressValue: "10/16",
    progress: "w-8/12"
  },
  {
    Name: "Ali Moahamed",
    progressValue: "4/12",
    progress: "w-2/6",

  },
  {
    Name: "Khalid Mousa",
    progressValue: "11/16",
    progress: "w-4/6"
  },
  {
    Name: "Mahmoud Salah",
    progressValue: "6/12",
    progress: "w-6/12"
  }
]
export const events = [
  {
    title: "Design review",
    date: "Today",
    time: "14:00-15:00"
  },
  {
    title: "Sprint Planning Meeting",
    date: "Dec 12",
    time: "13:00-13:30"
  },
  {
    title: "UX Feedback Session",
    date: "Dec 18",
    time: "14:00-15:00"
  },
]
export const files = [
  {
    img: pdf,
    name: "UX_Research_Summary.pdf",
    personName: "Mohanad Wahib",
    time: "13:00"
  },
  {
    img: jsx,
    name: "Dashboard_Layout_React.jsx",
    personName: "Wahib Salem",
    time: "14:06"
  },
  {
    img: sql,
    name: "Database_Schema_v2.sql",
    personName: "Mohanad Nadir",
    time: "13:00"
  },
]
export const Active = [
  {
    ProjectName: "Alpha",
    iconColor: "text-[#7D2D7E]",
    backgroundColor: "bg-[#F2EAF2]",
    tasks: "100/140",
    progressColor: "bg-[#7D2D7E]"
  },
  {
    ProjectName: "SepetGo",
    iconColor: "text-[#04B5AE]",
    backgroundColor: "bg-[#E6F8F7]",
    tasks: "52/120",
    progressColor: "bg-[#04B5AE]"
  }
]
export const Tasks = [
  {
    taskName: "Create Wireframes",
    taskDeadline: "Today",
    priority: "High",
    priorityBackground: "bg-red-100",
    priorityColor: "text-red-700",
    taskProgress: "82%",
  },
  {
    taskName: "User Research",
    taskDeadline: "Dec 18",
    priority: "Medium",
    priorityBackground: "bg-[#FFFAE7]",
    priorityColor: "text-[#E6BA0E]",
    taskProgress: "52%",
  },
  {
    taskName: "Design System Updates",
    taskDeadline: "Dec 20",
    priority: "Low",
    priorityBackground: "bg-[#EAF6EA]",
    priorityColor: "text-[#2BA52E]",
    taskProgress: "42%",
  },
]