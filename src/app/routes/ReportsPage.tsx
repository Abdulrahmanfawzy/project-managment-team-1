
import DashboardLayout from "@/components/layout/dashboard-layout";
import PageContainer from "@/components/layout/PageContainer";
import ReportsPageContent from "@/features/ReportsPage/ReportsPageContent";

export default function ReportsPage() {
    return (
        <DashboardLayout>
            <PageContainer className="bg-slate-50">
                <ReportsPageContent />
            </PageContainer>
        </DashboardLayout>
    );
}