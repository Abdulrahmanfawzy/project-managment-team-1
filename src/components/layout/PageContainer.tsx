import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Standard page content wrapper used by every page.
 *
 * Follows the common dashboard/template pattern: a centered content column
 * capped at a max width, with modest responsive side gutters — instead of
 * huge fixed padding that stretches content on wide screens.
 *   - gutters: 16px → 24px → 32px as the viewport grows
 *   - content centered and capped (max-w-7xl / 1280px)
 *   - 32px gap below the navbar
 *
 * Use this instead of adding ad-hoc padding to each page's <main>.
 * Pass `className` for page-specific extras (e.g. vertical rhythm, bg).
 */
export default function PageContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        "mx-auto w-full max-w-7xl flex-1",
        "px-4 sm:px-6 lg:px-8",
        "pt-8 pb-10",
        className,
      )}
    >
      {children}
    </main>
  );
}
