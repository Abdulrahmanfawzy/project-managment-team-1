import DashboardLayout from "@/components/layout/dashboard-layout";
import PageContainer from "@/components/layout/PageContainer";
import AllFilesSection from "@/features/Files/AllFilesSection";

export default function FilesPage() {
  return (
    <DashboardLayout>
      <PageContainer>
        <AllFilesSection />
      </PageContainer>
    </DashboardLayout>
  );
}
