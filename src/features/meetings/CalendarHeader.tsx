import { WEEK_DAYS } from "./data/mockMeetings";

export default function CalendarHeader() {
  return (
    <div className="grid grid-cols-[78px_repeat(5,1fr)] border-b border-[#F3F4F6]">
      <div className="py-3 px-2 text-[12px] font-medium text-slate-400 border-r border-[#F3F4F6]">
        Time
      </div>

      {WEEK_DAYS.map((day, i) => (
        <div
          key={i}
          className={`py-3 text-center border-r border-[#F3F4F6] last:border-r-0 ${
            i === 0 ? "bg-[#EEF3FF] rounded-t-xl" : ""
          }`}
        >
          <p
            className={`text-[12px] font-medium ${i === 0 ? "text-[#005AFB]" : "text-slate-400"}`}
          >
            {day.label}
          </p>
          <p
            className={`text-[14px] font-semibold ${i === 0 ? "text-[#005AFB]" : "text-slate-700"}`}
          >
            {day.date}
          </p>
        </div>
      ))}
    </div>
  );
}
