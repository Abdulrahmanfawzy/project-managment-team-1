import { KanbanColumn } from "./KanbanColumn";
import type { TasksResponse } from "../../types";
import { columns } from "../../data";

export function Board({ response }: { response: TasksResponse }) {
  return (
    <section className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          column={{
            ...column,
            tasks: response.data.filter((task) => task.status === column.id),
          }}
        />
      ))}
    </section>
  );
}
