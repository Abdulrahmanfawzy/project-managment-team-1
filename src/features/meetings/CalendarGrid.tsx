import type { Meeting } from "./Types/meeting.types";
import MeetingCard from "./MeetingCard";
import { TIME_SLOTS, hourOf, type CalendarDay } from "./utils/calendar";

interface CalendarGridProps {
  days: CalendarDay[];
  meetings: Meeting[];
}

export default function CalendarGrid({ days, meetings }: CalendarGridProps) {
  const getMeetingsAt = (dateStr: string, slot: string) => {
    const slotHour = hourOf(slot);
    return meetings.filter(
      (m) => m.date === dateStr && hourOf(m.start_time) === slotHour,
    );
  };

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

          {days.map((day) => {
            const dayMeetings = getMeetingsAt(day.dateStr, slot);

            return (
              <div
                key={day.dateStr}
                className={`p-3 flex flex-col gap-2 border-r border-[#F3F4F6] last:border-r-0 relative justify-center items-center ${
                  day.isToday
                    ? "bg-[#EEF3FF] !items-stretch !justify-start"
                    : "bg-transparent"
                }`}
              >
                {dayMeetings.map((meeting) => (
                  <div key={meeting.id} className="w-full z-10">
                    <MeetingCard meeting={meeting} highlighted={day.isToday} />
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
