import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import AppHeader from "../shared/app-header";

/**
 * Shared app shell: the top navbar plus a full-height content container.
 * Pages compose their own content inside (padding, page headers, etc.).
 */
export default function DashboardLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col bg-slate-50 font-sans",
        className,
      )}
    >
      <AppHeader />
      {children}
    </div>
  );
}
