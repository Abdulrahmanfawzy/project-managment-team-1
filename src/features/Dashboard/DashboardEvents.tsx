import { CalendarDays } from "lucide-react";
import avatar2 from "@/assets/Avatar2.svg";
import avatar3 from "@/assets/Avatar3.svg";
import { Link } from "react-router-dom";
import { useMeetings } from "./hooks/UseMeetings";
import Spinner from "@/components/shared/Spinner";

export default function DashboardEvents() {
  const { data, isPending, error } = useMeetings();

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div className="lg:col-span-3 space-y-5 bg-white rounded-lg p-5 shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-black">Upcoming event</h2>
        <Link to="/meetings" className="text-blue-500 text-sm">
          View All
        </Link>
      </div>

      <div className="space-y-4 overflow-y-auto max-h-60 pr-1">
        {data?.data?.meetings?.map((event: any) => (
          <div key={event.id} className="rounded-md">
            <div className="flex justify-between items-start">
              <h2 className="text-sm font-medium text-gray-800">
                {event.title}
              </h2>

              <h2 className="flex items-center text-xs px-1.5 py-0.5 rounded font-medium">
                {event.date}
                <CalendarDays className="w-3 h-3 ml-1" />
              </h2>
            </div>

            <div className="flex justify-between items-center mt-2">
              <div className="flex">
                <img src={avatar2} className="w-6 h-6 rounded-full border-2 border-white" alt="" />
                
                <img
                  src={avatar3}
                  className="w-6 h-6 rounded-full border-2 border-white"
                  alt=""
                />
                <img
                  src={avatar2}
                  className="w-6 h-6 rounded-full border-2 border-white"
                  alt=""
                />
              </div>

              <h2 className="text-xs text-gray-400 font-medium">
                {event.start_time} - {event.end_time}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}