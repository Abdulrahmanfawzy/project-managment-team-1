import { Board } from "@/components/TasksPage/Board/Board";
import { Toolbar } from "@/components/TasksPage/Toolbar/Toolbar";

export default function TasksPage() {
    return (
        <main className="space-y-6 p-6">
            <Toolbar />

            <Board />
        </main>
    );
}