import type { Meeting, CalendarMeeting } from "../Types/meeting.types";
import type { WeekDay } from "../utils/weekDays";

/**
 * بياخد calendar response (grouped by date من الـ backend) ويحولها
 * لـ CalendarMeeting[] بالـ dayIndex اللي CalendarGrid فاهمها.
 */
export function mapCalendarToCalendarMeetings(
  calendarDays: { date: string; meetings: Meeting[] }[],
  weekDays: WeekDay[]
): CalendarMeeting[] {
  const result: CalendarMeeting[] = [];

  calendarDays.forEach((day) => {
    const dayIndex = weekDays.findIndex((w) => w.fullDate === day.date);
    if (dayIndex === -1) return; // اليوم ده مش ضمن الأسبوع المعروض حاليًا

    day.meetings.forEach((meeting) => {
      result.push({
        id: meeting.id,
        title: meeting.title,
        startTime: meeting.start_time,
        endTime: meeting.end_time,
        dayIndex,
        location: meeting.location,
        meetingLink: meeting.meeting_link,
        participants: meeting.participants ?? [],
        raw: meeting,
      });
    });
  });

  return result;
}

/** بيحول تاريخ + وقت لصيغة "YYYY-MM-DD HH:mm:ss" اللي الـ backend عايزها */
export function toBackendDateTime(date: string, time: string): string {
  // date: "2026-07-03", time: "10:00" => "2026-07-03 10:00:00"
  return `${date} ${time}:00`;
}