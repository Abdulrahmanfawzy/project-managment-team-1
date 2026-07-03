import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export interface MultiOption {
  value: string;
  label: string;
  sublabel?: string;
  avatarUrl?: string;
}

interface MultiSelectDropdownProps {
  options: MultiOption[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
}

export default function MultiSelectDropdown({
  options,
  selected,
  onChange,
  placeholder = "Select…",
  emptyText = "No options",
  disabled = false,
}: MultiSelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const toggle = (value: string) =>
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    );

  const summary =
    selected.length === 0
      ? placeholder
      : options
          .filter((o) => selected.includes(o.value))
          .map((o) => o.label)
          .join(", ");

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[13px] text-left focus:outline-none focus:border-[#005AFB] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span
          className={`truncate ${selected.length === 0 ? "text-[#A6B2CF]" : "text-[#1E1E2D]"}`}
        >
          {summary}
        </span>
        <ChevronDown size={16} className="shrink-0 text-[#556987]" />
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto bg-white border border-[#F3F4F6] rounded-xl shadow-xl py-1.5">
          {options.length === 0 ? (
            <p className="px-4 py-2 text-[12px] text-[#A6B2CF]">{emptyText}</p>
          ) : (
            options.map((opt) => {
              const isSel = selected.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggle(opt.value)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-[#F8FAFC] transition-colors"
                >
                  <span
                    className={`flex size-4 shrink-0 items-center justify-center rounded border ${
                      isSel
                        ? "bg-[#005AFB] border-[#005AFB] text-white"
                        : "border-slate-300"
                    }`}
                  >
                    {isSel && <Check size={12} strokeWidth={3} />}
                  </span>
                  {opt.avatarUrl && (
                    <img
                      src={opt.avatarUrl}
                      alt=""
                      className="size-6 rounded-full object-cover"
                    />
                  )}
                  <span className="min-w-0">
                    <span className="block text-[13px] text-[#1E1E2D] truncate">
                      {opt.label}
                    </span>
                    {opt.sublabel && (
                      <span className="block text-[11px] text-[#A6B2CF] truncate">
                        {opt.sublabel}
                      </span>
                    )}
                  </span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
