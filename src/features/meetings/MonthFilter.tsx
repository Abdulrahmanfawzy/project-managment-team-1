
"use client";

import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Check } from "lucide-react";
import type { FilterOption } from "./utils/calendar";
import { FILTER_OPTIONS } from "./utils/calendar";

interface MonthFilterProps {
  month: string;
  filter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function MonthFilter({
  month,
  filter,
  onFilterChange,
  onPrev,
  onNext,
}: MonthFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between mb-6 relative">
      <div className="flex items-center gap-4">
        <button
          onClick={onPrev}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Previous days"
        >
          <ChevronLeft size={18} className="text-[#1E1E2D]" />
        </button>
        <h2 className="text-[18px] font-semibold text-[#1E1E2D]">{month}</h2>
        <button
          onClick={onNext}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Next days"
        >
          <ChevronRight size={18} className="text-[#1E1E2D]" />
        </button>
      </div>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 border border-[#F3F4F6] rounded-xl bg-white text-[13px] font-medium text-[#1E1E2D] hover:bg-gray-50 transition-all shadow-sm"
        >
          {filter}
          <ChevronDown size={16} className="text-[#556987]" />
        </button>
        {isOpen && (
          <>
            <div className="absolute right-0 mt-2 w-[180px] bg-white border border-[#F3F4F6] rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
              {FILTER_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onFilterChange(option);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2 text-[13px] text-[#556987] hover:text-[#1E1E2D] hover:bg-[#F8FAFC] transition-colors text-left"
                >
                  <span className={filter === option ? "font-semibold text-[#1E1E2D]" : ""}>
                    {option}
                  </span>
                  {filter === option && (
                    <Check size={14} className="text-[#005AFB]" />
                  )}
                </button>
              ))}
            </div>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          </>
        )}
      </div>
    </div>
  );
}