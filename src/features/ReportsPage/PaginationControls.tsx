import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationControlsProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  isFetching?: boolean;
}

export default function PaginationControls({
  currentPage,
  lastPage,
  onPageChange,
  isFetching = false,
}: PaginationControlsProps) {
  if (lastPage <= 1) return null;

  /** Build a compact page-number list with ellipsis gaps. */
  const pages: (number | "…")[] = [];
  for (let i = 1; i <= lastPage; i++) {
    if (
      i === 1 ||
      i === lastPage ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  return (
    <div className="flex items-center justify-center gap-1.5 pt-6">
      {/* Previous */}
      <button
        disabled={currentPage <= 1 || isFetching}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page numbers */}
      {pages.map((p, idx) =>
        p === "…" ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-xs text-slate-300 select-none">
            …
          </span>
        ) : (
          <button
            key={p}
            disabled={isFetching}
            onClick={() => onPageChange(p)}
            className={cn(
              "min-w-[34px] h-[34px] rounded-lg text-sm font-semibold transition-all duration-200",
              p === currentPage
                ? "bg-brand text-white shadow-md shadow-brand/20"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-800",
              isFetching && "opacity-60 cursor-not-allowed",
            )}
          >
            {p}
          </button>
        ),
      )}

      {/* Next */}
      <button
        disabled={currentPage >= lastPage || isFetching}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
