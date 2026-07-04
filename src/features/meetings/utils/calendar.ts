
/** Fixed hourly rows shown in the weekly calendar grid. */
export const TIME_SLOTS = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

export type FilterOption =
  | "Today"
  | "This Week"
  | "This Month"
  | "Last Three Month"
  | "This Year";

export const FILTER_OPTIONS: FilterOption[] = [
  "Today",
  "This Week",
  "This Month",
  "Last Three Month",
  "This Year",
];

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
  const firstMonth = first.toLocaleDateString("en-US", { month: "short" });
  const lastMonth = last.toLocaleDateString("en-US", { month: "short" });
  const firstYear = first.getFullYear();
  const lastYear = last.getFullYear();

  if (days.length === 1) {
    return `${firstMonth} ${first.getDate()}, ${firstYear}`;
  }

  if (firstYear !== lastYear) {
    return `${firstMonth} ${first.getDate()}, ${firstYear} – ${lastMonth} ${last.getDate()}, ${lastYear}`;
  }

  return firstMonth === lastMonth
    ? `${firstMonth} ${first.getDate()} – ${last.getDate()}, ${lastYear}`
    : `${firstMonth} ${first.getDate()} – ${lastMonth} ${last.getDate()}, ${lastYear}`;
}

/** Number of whole days between two local dates, inclusive of both ends. */
function daysBetweenInclusive(start: Date, end: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const a = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const b = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.round((b.getTime() - a.getTime()) / msPerDay) + 1;
}

/**
 * Given a filter option and a reference date, compute the first visible day
 * and how many consecutive days should be shown.
 */
export function computeRange(
  filter: FilterOption,
  ref: Date,
): { start: Date; count: number } {
  switch (filter) {
    case "Today": {
      const start = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate());
      return { start, count: 1 };
    }
    case "This Week": {
      // Sunday -> Saturday of the week containing `ref`.
      const start = new Date(
        ref.getFullYear(),
        ref.getMonth(),
        ref.getDate() - ref.getDay(),
      );
      return { start, count: 7 };
    }
    case "This Month": {
      const start = new Date(ref.getFullYear(), ref.getMonth(), 1);
      const end = new Date(ref.getFullYear(), ref.getMonth() + 1, 0);
      return { start, count: daysBetweenInclusive(start, end) };
    }
    case "Last Three Month": {
      // Current month plus the two before it.
      const start = new Date(ref.getFullYear(), ref.getMonth() - 2, 1);
      const end = new Date(ref.getFullYear(), ref.getMonth() + 1, 0);
      return { start, count: daysBetweenInclusive(start, end) };
    }
    case "This Year": {
      const start = new Date(ref.getFullYear(), 0, 1);
      const end = new Date(ref.getFullYear(), 11, 31);
      return { start, count: daysBetweenInclusive(start, end) };
    }
    default: {
      const start = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate());
      return { start, count: 7 };
    }
  }
}

/**
 * Move the reference date by one "unit" of the given filter, in the given
 * direction (-1 = previous, 1 = next). Used by the prev/next arrows.
 */
export function shiftReference(
  filter: FilterOption,
  ref: Date,
  direction: 1 | -1,
): Date {
  const next = new Date(ref);
  switch (filter) {
    case "Today":
      next.setDate(next.getDate() + direction);
      break;
    case "This Week":
      next.setDate(next.getDate() + direction * 7);
      break;
    case "This Month":
      next.setDate(1); // avoid month-length overflow (e.g. Jan 31 -> Mar)
      next.setMonth(next.getMonth() + direction);
      break;
    case "Last Three Month":
      next.setDate(1);
      next.setMonth(next.getMonth() + direction * 3);
      break;
    case "This Year":
      next.setDate(1);
      next.setFullYear(next.getFullYear() + direction);
      break;
  }
  return next;
}