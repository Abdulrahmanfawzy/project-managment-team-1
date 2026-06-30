import { useEffect, useState } from "react";
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
      setDescription("");
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

    updateProject(
      {
        id: project.id,
        payload: {
          name: projectName.trim(),
          description: description.trim() || "No description provided.",
          start_date: startDate,
          deadline: endDate,
          priority: priority.toLowerCase() as "high" | "medium" | "low",
        },
      },
      {
        onSuccess: handleClose,
        onError: () => {
          setFormError(
            "Failed to update project. You can only edit projects you created.",
          );
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