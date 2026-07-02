import { Link } from "react-router-dom";
import { useTasks } from "@/features/Dashboard/hooks/UseTasks";

export default function DashboardTasks() {
  const { data, isPending, error } = useTasks();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div className="lg:col-span-3 space-y-4 bg-white rounded-lg p-5 shadow-sm flex flex-col justify-between overflow-scroll max-h-80 overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      <div className="flex justify-between items-center">
        <h2 className="text-black font-bold">Tasks</h2>
        <Link to="/tasks" className="text-blue-500 text-sm">
          View All
        </Link>
      </div>

      {data?.data.map((task: any) => (
        <div key={task.id} className="rounded-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-medium truncate max-w-[70%]">
              {task.title}
            </h2>

            <h2
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold
                ${
                  task.priority === "high"
                    ? "bg-red-100 text-red-600"
                    : task.priority === "medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
            >
              {task.priority}
            </h2>
          </div>

          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <h2>Due: {task.due_date}</h2>
            <p>{task.progress}%</p>
          </div>

          <div className="w-full bg-blue-200 rounded-full h-1 mt-1">
            <div
              className="h-1 bg-blue-800 rounded-full transition-all duration-500"
              style={{ width: `${task.progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}