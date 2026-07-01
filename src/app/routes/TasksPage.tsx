import DashboardLayout from "@/components/layout/dashboard-layout";
import { Board } from "@/features/TasksPage/components/Board/Board";
import { Toolbar } from "@/features/TasksPage/components/Toolbar/Toolbar";

export default function TasksPage() {
  return (
    <DashboardLayout>
      <main className="space-y-6 p-6">
        <Toolbar />

        <Board />
      </main>
    </DashboardLayout>
  );
}
