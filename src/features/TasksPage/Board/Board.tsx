import { columns } from "@/data";
import { KanbanColumn } from "./KanbanColumn";

export function Board() {
    return (
        <section className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {columns.map((column) => (
                <KanbanColumn
                    key={column.id}
                    column={column}
                />
            ))}
        </section>
    );
}