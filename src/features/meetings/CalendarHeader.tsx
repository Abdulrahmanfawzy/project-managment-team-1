import type { CalendarDay } from "./utils/calendar";

interface CalendarHeaderProps {
  days: CalendarDay[];
}

export default function CalendarHeader({ days }: CalendarHeaderProps) {
  return (
    <div className="grid grid-cols-[78px_repeat(5,1fr)] border-b border-[#F3F4F6]">
      <div className="py-3 px-2 text-[12px] font-medium text-slate-400 border-r border-[#F3F4F6]">
        Time
      </div>

      {days.map((day) => (
        <div
          key={day.dateStr}
          className={`py-3 text-center border-r border-[#F3F4F6] last:border-r-0 ${
            day.isToday ? "bg-[#EEF3FF] rounded-t-xl" : ""
          }`}
        >
          <p
            className={`text-[12px] font-medium ${day.isToday ? "text-[#005AFB]" : "text-slate-400"}`}
          >
            {day.label}
          </p>
          <p
            className={`text-[14px] font-semibold ${day.isToday ? "text-[#005AFB]" : "text-slate-700"}`}
          >
            {day.date}
          </p>
        </div>
      ))}
    </div>
  );
}
