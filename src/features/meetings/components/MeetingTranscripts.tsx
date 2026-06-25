import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import SelectDropdown from "@/components/shared/select-dropdown";
import { transcriptLanguages, transcripts } from "../data/data";

export default function MeetingTranscripts() {
  const [language, setLanguage] = useState("en");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return transcripts;
    return transcripts.filter(
      (entry) =>
        entry.name.toLowerCase().includes(q) ||
        entry.text.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-slate-200/70">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-text-h">Meeting Transcripts</h2>
        <SelectDropdown
          value={language}
          onValueChange={setLanguage}
          options={transcriptLanguages}
          className="w-28"
        />
      </div>

      {/* Search */}
      <div className="relative mt-4">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Transcript"
          className="h-10 w-full rounded-full bg-slate-100 pr-3 pl-9 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-brand/30"
        />
      </div>

      {/* Transcript list */}
      <div className="mt-4 flex-1 space-y-5 overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No transcript matches “{query}”.
          </p>
        ) : (
          filtered.map((entry) => (
            <div key={entry.id} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-slate-200 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  {entry.time}
                </span>
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className="size-6 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-text-h">
                  {entry.name}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {entry.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
