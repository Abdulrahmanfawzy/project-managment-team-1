import { MoreVertical } from "lucide-react";
import type { ColumnVariant } from "../../types";

interface ColumnHeaderProps {
    title: string;
    variant: ColumnVariant;
}

const variantBg: Record<ColumnVariant, string> = {
    todo: "bg-white",
    in_progress: "bg-blue-50",
    pending: "bg-pink-50",
    completed: "bg-green-50",
};

const dotColor: Record<ColumnVariant, string> = {
    todo: "bg-violet-500",
    in_progress: "bg-blue-500",
    pending: "bg-pink-500",
    completed: "bg-green-500",
};

export function ColumnHeader({ title, variant }: ColumnHeaderProps) {
    return (
        <div
            className={`flex items-center justify-between px-4 py-4  ${variantBg[variant]}`}
        >
            <div className="flex items-center gap-2">
                <div className={`size-2 rounded-full ${dotColor[variant]}`} />
                <h3 className="text-sm font-medium">{title}</h3>
            </div>

            <MoreVertical className="size-4 cursor-pointer text-muted-foreground" />
        </div>
    );
}