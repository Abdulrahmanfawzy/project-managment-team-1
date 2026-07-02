import { useState } from "react";
import { Trash2 } from "lucide-react";

import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { useDeleteTeam } from "../hooks/useDeleteTeam";
import type { ProjectTeam } from "../types/teams";

export default function DeleteTeam({ team }: { team: ProjectTeam }) {
  const [open, setOpen] = useState(false);
  const deleteTeam = useDeleteTeam();

  const handleConfirm = () => {
    deleteTeam.mutate(team.id, { onSuccess: () => setOpen(false) });
  };

  return (
    <>
      <button
        aria-label="Delete team"
        onClick={() => setOpen(true)}
        className="text-muted-foreground transition-colors hover:text-red-600"
      >
        <Trash2 className="size-4" />
      </button>

      <ConfirmDialog
        open={open}
        title="Delete this team?"
        message={`"${team.display_name ?? team.name}" will be removed. This action cannot be undone.`}
        confirmLabel="Delete"
        isLoading={deleteTeam.isPending}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
