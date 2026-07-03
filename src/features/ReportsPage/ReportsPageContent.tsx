import { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import OverviewTab from "./OverviewTab";
import TasksTab from "./TasksTab";
import FilesTab from "./FilesTab";
import ProfileEditForm from "./ProfileEditForm";

const TABS = ["Overview", "Tasks", "Files"];

export default function ReportsPageContent() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 p-4 md:p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
      {/* Profile Header */}
      <ProfileHeader
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing((prev) => !prev)}
      />

      {/* Conditionally render Tabs OR Edit Form */}
      {isEditing ? (
        <ProfileEditForm onSuccess={() => setIsEditing(false)} />
      ) : (
        <>
          <ProfileTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={TABS}
          />
          <div className="min-h-[300px]">
            {activeTab === "Overview" && <OverviewTab />}
            {activeTab === "Tasks" && <TasksTab />}
            {activeTab === "Files" && <FilesTab />}
          </div>
        </>
      )}
    </div>
  );
}
