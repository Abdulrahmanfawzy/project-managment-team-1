import type { ApiTask } from "../Api/tasksTypes";
import type { ChartDataItem } from "@/types/project";

/**
 * Builds the "Project overview" area-chart series from real task data.
 *
 * Metric: **remaining workload per month**. For each month bucket we sum
 * `(1 - progress/100)` across every task that is *active* during that month
 * (its date range overlaps the month). A task at 100% progress contributes 0;
 * a fresh task contributes 1. The result is a count of "remaining
 * task-equivalents", so the curve shows where the outstanding effort sits
 * across the timeline.
 */

interface MonthBucket {
  label: string;
  start: Date;
  end: Date;
}

/** Parse the API's date strings ("2026-07-01" or "2026-07-01 14:00:00"). */
function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const d = new Date(value.replace(" ", "T"));
  return Number.isNaN(d.getTime()) ? null : d;
}

function monthLabel(d: Date): string {
  return d.toLocaleString("en-US", { month: "short" });
}

/** Inclusive month buckets between two dates (capped at 24 to stay sane). */
export function monthBuckets(from: Date, to: Date): MonthBucket[] {
  // Guard against an inverted range.
  const [lo, hi] = from <= to ? [from, to] : [to, from];
  const buckets: MonthBucket[] = [];
  const cursor = new Date(lo.getFullYear(), lo.getMonth(), 1);
  const last = new Date(hi.getFullYear(), hi.getMonth(), 1);

  for (let i = 0; cursor <= last && i < 24; i++) {
    const start = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const end = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0, 23, 59, 59);
    buckets.push({ label: monthLabel(start), start, end });
    cursor.setMonth(cursor.getMonth() + 1);
  }
  return buckets;
}

/** The last `n` calendar months up to and including `ref`'s month. */
export function lastNMonths(n: number, ref: Date = new Date()): MonthBucket[] {
  const buckets: MonthBucket[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(ref.getFullYear(), ref.getMonth() - i, 1);
    const start = new Date(d.getFullYear(), d.getMonth(), 1);
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);
    buckets.push({ label: monthLabel(start), start, end });
  }
  return buckets;
}

/** All twelve months of `ref`'s calendar year (Jan → Dec). */
export function monthsOfYear(ref: Date = new Date()): MonthBucket[] {
  const buckets: MonthBucket[] = [];
  for (let m = 0; m < 12; m++) {
    const start = new Date(ref.getFullYear(), m, 1);
    const end = new Date(ref.getFullYear(), m + 1, 0, 23, 59, 59);
    buckets.push({ label: monthLabel(start), start, end });
  }
  return buckets;
}

/** Remaining-workload series for a set of tasks over the given month buckets. */
export function buildWorkloadSeries(
  tasks: ApiTask[],
  buckets: MonthBucket[],
): ChartDataItem[] {
  return buckets.map((bucket) => {
    let value = 0;
    for (const task of tasks) {
      const start = parseDate(task.start_date);
      const due = parseDate(task.due_date);
      // Active in this month if it starts on/before the month ends and
      // (has no due date, or is due on/after the month starts).
      const startsBeforeEnd = !start || start <= bucket.end;
      const endsAfterStart = !due || due >= bucket.start;
      if (startsBeforeEnd && endsAfterStart) {
        const progress = typeof task.progress === "number" ? task.progress : 0;
        value += Math.max(0, 1 - progress / 100);
      }
    }
    // One decimal is enough resolution for the area chart.
    return { month: bucket.label, value: Math.round(value * 10) / 10 };
  });
}

/** Earliest/latest task dates, used as a fallback timeline when the project
 *  has no start_date / deadline. */
function taskDateRange(tasks: ApiTask[]): { from: Date; to: Date } | null {
  const dates: Date[] = [];
  for (const t of tasks) {
    const s = parseDate(t.start_date);
    const d = parseDate(t.due_date);
    if (s) dates.push(s);
    if (d) dates.push(d);
  }
  if (dates.length === 0) return null;
  return {
    from: new Date(Math.min(...dates.map((d) => d.getTime()))),
    to: new Date(Math.max(...dates.map((d) => d.getTime()))),
  };
}

/** Project-details chart: workload across the project's own timeline. */
export function buildProjectWorkload(
  allTasks: ApiTask[],
  projectId: number,
  startDate: string | null,
  deadline: string | null,
): ChartDataItem[] {
  const projectTasks = allTasks.filter((t) => t.project_id === projectId);

  let from = parseDate(startDate);
  let to = parseDate(deadline);
  if (!from || !to) {
    const range = taskDateRange(projectTasks);
    from = from ?? range?.from ?? new Date();
    to = to ?? range?.to ?? from;
  }

  // A short project spans a single month → Recharts would draw just a dot.
  // Pad the timeline so the area/line always has room to breathe.
  const MIN_MONTHS = 6;
  let buckets = monthBuckets(from, to);
  if (buckets.length < MIN_MONTHS) {
    const paddedFrom = new Date(to.getFullYear(), to.getMonth() - (MIN_MONTHS - 1), 1);
    buckets = monthBuckets(paddedFrom, to);
  }

  return buildWorkloadSeries(projectTasks, buckets);
}
