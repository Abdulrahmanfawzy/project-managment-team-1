import DashboardLayout from "@/components/layout/dashboard-layout";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <DashboardLayout>
      <main className="flex flex-1 flex-col items-center justify-center gap-2 px-6 py-6 text-center">
        <h1 className="text-2xl font-bold text-text-h">{title}</h1>
        <p className="text-sm text-muted-foreground">
          This page is coming soon.
        </p>
      </main>
    </DashboardLayout>
  );
}
