import type { ColumnVariant } from "@/types";
import { MoreVertical } from "lucide-react";

interface ColumnHeaderProps {
    title: string;
    variant: ColumnVariant;
}

const variantBg: Record<ColumnVariant, string> = {
    todo: "bg-white",
    progress: "bg-blue-50",
    review: "bg-pink-50",
    done: "bg-green-50",
};

const dotColor: Record<ColumnVariant, string> = {
    todo: "bg-violet-500",
    progress: "bg-blue-500",
    review: "bg-pink-500",
    done: "bg-green-500",
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