import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Priority, Task } from "@/types";
import { Calendar, MessageSquare } from "lucide-react";

interface TaskCardProps {
    task: Task;
}

const priorityStyles: Record<Priority, string> = {
    High: "bg-red-50 text-red-500",
    Medium: "bg-amber-50 text-amber-500",
    Low: "bg-green-50 text-green-500",
};

export function TaskCard({ task }: TaskCardProps) {
    return (
        <Card className="rounded-2xl border-border-secondary shadow-sm p-0 gap-0">
            <CardContent className="p-4 space-y-3">
                {/* Title + Priority */}
                <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold text-foreground leading-snug">
                        {task.title}
                    </h4>
                    <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${priorityStyles[task.priority]}`}
                    >
                        {task.priority}
                    </span>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {task.description}
                </p>

                {/* Progress bar  */}
                {typeof task.progress === "number" && (
                    <div className="space-y-1.5 ">
                        <div className="flex justify-between text-sm font-semibold text-muted-foreground">
                            <span>Progress</span>
                            <span className="text-foreground">{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-1.5" />
                    </div>
                )}

                {/* Footer: Avatars + Meta */}
                <div className="flex items-center justify-between pt-3">
                    {/* Avatar stack */}
                    <div className="flex -space-x-1.5">
                        {task.assignees.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt="Assignee"
                                className="size-6 rounded-full ring-2 ring-white object-cover"
                            />
                        ))}
                    </div>

                    {/* Meta icons */}
                    <div className="flex items-center gap-3 text-muted-foreground">
                        {task.comments > 0 && (
                            <div className="flex items-center gap-1">
                                <span className="text-xs font-medium">{task.comments}</span>
                                <MessageSquare className="size-3.5" />
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <span className="text-xs font-medium">{task.dueDate}</span>
                            <Calendar className="size-3.5" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
