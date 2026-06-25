import type { Meeting } from "./Types/meeting.types";
import MeetingCard from "./MeetingCard";
import { TIME_SLOTS, WEEK_DAYS } from "./data/mockMeetings";

interface CalendarGridProps {
  meetings: Meeting[];
}

export default function CalendarGrid({ meetings }: CalendarGridProps) {
  const getMeetingsAt = (dayIndex: number, timeSlot: string) =>
    meetings.filter((m) => m.dayIndex === dayIndex && m.startTime === timeSlot);

  return (
    <div className="flex flex-col">
      {TIME_SLOTS.map((slot) => (
        <div
          key={slot}
          className="grid grid-cols-[78px_repeat(5,1fr)] min-h-[100px] border-b border-[#F3F4F6] last:border-b-0"
        >
          <div className="py-4 px-2 text-[12px] text-[#A6B2CF] font-medium text-left pl-3 flex items-start border-r border-[#F3F4F6]">
            {slot}
          </div>

          {WEEK_DAYS.map((day, dayIndex) => {
            const isToday = dayIndex === 0;
            const dayMeetings = getMeetingsAt(dayIndex, slot);

            return (
              <div
                key={dayIndex}
                className={`p-3 flex flex-col gap-2 border-r border-[#F3F4F6] last:border-r-0 relative justify-center items-center ${
                  isToday
                    ? "bg-[#EEF3FF] !items-stretch !justify-start"
                    : "bg-transparent"
                }`}
              >
                {!isToday && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0">
                    <p className="text-[12px] font-medium text-slate-400/70 leading-tight">
                      {day.label}
                    </p>
                    <p className="text-[14px] font-semibold text-slate-700/70">
                      {day.date}
                    </p>
                  </div>
                )}

                {dayMeetings.map((meeting) => (
                  <div key={meeting.id} className="w-full z-10">
                    <MeetingCard meeting={meeting} highlighted={isToday} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
