import DashboardLayout from "@/components/layout/dashboard-layout";
import PageContainer from "@/components/layout/PageContainer";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <DashboardLayout>
      <PageContainer className="flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-text-h">{title}</h1>
        <p className="text-sm text-muted-foreground">
          This page is coming soon.
        </p>
      </PageContainer>
    </DashboardLayout>
  );
}
