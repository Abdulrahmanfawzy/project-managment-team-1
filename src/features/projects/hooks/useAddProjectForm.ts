import { useState } from "react";
import { useCreateProject } from "@/features/projects/Api/useCreateProject";   //features/projects/hooks/useCreateProject
export const PRIORITY_OPTIONS = ["High", "Medium", "Low"] as const;
export type PriorityOption = (typeof PRIORITY_OPTIONS)[number];

export function useAddProjectForm(onClose: () => void) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<PriorityOption>("High");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const { mutate: createProject, isPending: isCreating } = useCreateProject();

  const resetForm = () => {
    setProjectName("");
    setDescription("");
    setPriority("High");
    setStartDate("");
    setEndDate("");
    setFormError(null);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const handleSubmit = () => {
    if (!projectName.trim() || !startDate || !endDate) {
      setFormError("Project name, start date, and end date are required.");
      return;
    }

    createProject(
      {
        name: projectName.trim(),
        description: description.trim() || "No description provided.",
        start_date: startDate,
        deadline: endDate,
        priority: priority.toLowerCase() as "high" | "medium" | "low",
        status: "pending",
      },
      {
        onSuccess: handleClose,
        onError: () => {
          setFormError("Failed to create project. Please try again.");
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
    isCreating,
    handleClose,
    handleSubmit,
  };
}