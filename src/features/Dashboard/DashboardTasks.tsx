import { Link } from "react-router-dom";
import { Tasks } from "./Data/DashboardData";


export default function DashboardTasks() {
    return (
              <div className="lg:col-span-3 space-y-4 bg-white rounded-lg p-5 shadow-sm flex flex-col justify-between ">
          <div className="flex justify-between items-center">
            <h2 className="text-black font-bold">Tasks</h2>
            <Link to="/tasks" className="text-blue-500 text-sm">View All</Link>
          </div>
          {Tasks.map((task) => (
            <div className="rounded-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-medium truncate max-w-[70%]">{task.taskName}</h2>
                <h2 className={`${task.priorityBackground} rounded-full ${task.priorityColor} px-2.5 py-0.5 text-xs font-semibold`}>{task.priority}</h2>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <h2>Due: {task.taskDeadline}</h2>
                <p>{task.taskProgress}</p>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-1 mt-1">
                <div className={`h-1 bg-blue-800 rounded-full `}  style={{width:`${task.taskProgress}`}}></div>
              </div>
            </div>
          ))}
        </div>
    )
}