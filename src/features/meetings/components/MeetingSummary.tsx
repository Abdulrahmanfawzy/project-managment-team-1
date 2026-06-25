import { useState } from "react";

import { cn } from "@/lib/utils";
import SummaryTab from "./summary/SummaryTab";
import NotesTab from "./summary/NotesTab";
import CommentsTab from "./summary/CommentsTab";

const tabs = [
  { label: "AI Summary", value: "summary" },
  { label: "Note", value: "note" },
  { label: "Comments", value: "comments" },
] as const;

type TabValue = (typeof tabs)[number]["value"];

const panels: Record<TabValue, React.ReactNode> = {
  summary: <SummaryTab />,
  note: <NotesTab />,
  comments: <CommentsTab />,
};

export default function MeetingSummary() {
  const [activeTab, setActiveTab] = useState<TabValue>("summary");

  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200/70">
      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "relative -mb-px pb-3 text-sm transition-colors",
                isActive
                  ? "font-medium text-text-h"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {isActive && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <div className="pt-5">{panels[activeTab]}</div>
    </div>
  );
}
