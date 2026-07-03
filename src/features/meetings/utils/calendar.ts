/** Fixed hourly rows shown in the weekly calendar grid. */
export const TIME_SLOTS = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

export interface CalendarDay {
  /** Column heading, e.g. "Today", "Mon", "Tue". */
  label: string;
  /** Day of month, e.g. 4. */
  date: number;
  /** Local ISO date used to match meetings, e.g. "2026-07-04". */
  dateStr: string;
  isToday: boolean;
}

/** Local `YYYY-MM-DD` (no UTC shift). */
export function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Build `count` consecutive day columns starting at `start`. */
export function buildWeek(start: Date, count = 5): CalendarDay[] {
  const todayStr = toDateStr(new Date());
  const days: CalendarDay[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    const dateStr = toDateStr(d);
    const isToday = dateStr === todayStr;
    days.push({
      label: isToday ? "Today" : d.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.getDate(),
      dateStr,
      isToday,
    });
  }
  return days;
}

/** The hour component of a "HH:MM" (or "HH:MM:SS") time string. */
export function hourOf(time: string | null | undefined): number | null {
  if (!time) return null;
  const h = Number.parseInt(time.split(":")[0], 10);
  return Number.isNaN(h) ? null : h;
}

/** Header label for the visible range, e.g. "Jul 4 – 8, 2026". */
export function rangeLabel(days: CalendarDay[]): string {
  if (days.length === 0) return "";
  const first = new Date(days[0].dateStr);
  const last = new Date(days[days.length - 1].dateStr);
  const month = first.toLocaleDateString("en-US", { month: "short" });
  const lastMonth = last.toLocaleDateString("en-US", { month: "short" });
  const year = last.getFullYear();
  return month === lastMonth
    ? `${month} ${first.getDate()} – ${last.getDate()}, ${year}`
    : `${month} ${first.getDate()} – ${lastMonth} ${last.getDate()}, ${year}`;
}
