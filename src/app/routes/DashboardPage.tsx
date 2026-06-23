import DashboardLayout from "@/components/layout/dashboard-layout";
import Dashboard from "@/features/Dashboard/DashboardPage";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <main className="flex-1">
        <Dashboard />
      </main>
    </DashboardLayout>
  );
}
