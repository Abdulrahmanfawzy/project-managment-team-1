import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import type { Project } from "@/types/project";
import { useUpdateProject } from "@/features/projects/hooks/useUpdateProject";

export const PRIORITY_OPTIONS = ["High", "Medium", "Low"] as const;
export type PriorityOption = (typeof PRIORITY_OPTIONS)[number];

function toPriorityOption(priority: string): PriorityOption {
  const match = PRIORITY_OPTIONS.find(
    (p) => p.toLowerCase() === priority.toLowerCase(),
  );
  return match ?? "High";
}

export function useEditProjectForm(
  project: Project | null,
  onClose: () => void,
) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<PriorityOption>("High");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();

  // Pre-fill the form whenever a new project is selected for editing.
  useEffect(() => {
    if (project) {
      setProjectName(project.name);
      setDescription(project.description ?? "");
      setPriority(toPriorityOption(project.priority));
      setStartDate(project.startDate);
      setEndDate(project.deadline);
      setFormError(null);
    }
  }, [project]);

  const handleClose = () => {
    onClose();
    setFormError(null);
  };

  const handleSubmit = () => {
    if (!project) return;

    if (!projectName.trim() || !startDate || !endDate) {
      setFormError("Project name, start date, and end date are required.");
      return;
    }

    const payload = {
      name: projectName.trim(),
      description: description.trim() || "No description provided.",
      start_date: startDate,
      deadline: endDate,
      priority: priority.toLowerCase() as "high" | "medium" | "low",
      status: project.status as "pending" | "in_progress" | "completed",
    };

    console.log("Project ID:", project.id);
    console.log("Update Payload:", payload);

    updateProject(
      {
        id: project.id,
        payload,
      },
      {
        onSuccess: handleClose,
        onError: (error) => {
          const axiosError = error as AxiosError<{
            message?: string;
            errors?: Record<string, string[]>;
          }>;

          console.error("Update Project Error:", axiosError);
          console.error("Response Data:", axiosError.response?.data);
          console.error("Status:", axiosError.response?.status);

          const response = axiosError.response?.data;

          if (response?.errors) {
            const firstError = Object.values(response.errors)
              .flat()
              .join("\n");

            setFormError(firstError);
          } else {
            setFormError(
              response?.message ?? "Failed to update project."
            );
          }
        },
      },
    );
  };

  return {
    projectName,
    setProjectName,
    description,
    setDescription,
    priority,
    setPriority,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    formError,
    isUpdating,
    handleClose,
    handleSubmit,
  };
}