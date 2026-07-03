import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Chart, { type ChartFilterOption } from "@/components/ui/chart";
import TasksService from "@/features/projects/Api/tasksService";
import { useProjects } from "@/features/projects/hooks/useProjects";
import {
  buildWorkloadSeries,
  lastNMonths,
  monthsOfYear,
} from "@/features/projects/utils/workloadChart";

const RANGE_OPTIONS: ChartFilterOption[] = [
  { label: "This Year", value: "year" },
  { label: "Last 6 Months", value: "6m" },
  { label: "Last 12 Months", value: "12m" },
];

export default function DashboardOverviewChart() {
  const [projectId, setProjectId] = useState("all");
  const [range, setRange] = useState("6m");

  const { data: tasksResp } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => TasksService.getAll(),
  });
  const { data: projects } = useProjects();

  const data = useMemo(() => {
    const allTasks = tasksResp?.data ?? [];
    const filtered =
      projectId === "all"
        ? allTasks
        : allTasks.filter((t) => String(t.project_id) === projectId);

    const buckets =
      range === "year"
        ? monthsOfYear()
        : range === "12m"
          ? lastNMonths(12)
          : lastNMonths(6);

    return buildWorkloadSeries(filtered, buckets);
  }, [tasksResp, projectId, range]);

  const projectOptions: ChartFilterOption[] = [
    { label: "All Projects", value: "all" },
    ...(projects ?? []).map((p) => ({ label: p.name, value: String(p.id) })),
  ];

  return (
    <Chart
      data={data}
      projectFilter={{
        value: projectId,
        options: projectOptions,
        onChange: setProjectId,
      }}
      rangeFilter={{ value: range, options: RANGE_OPTIONS, onChange: setRange }}
    />
  );
}
