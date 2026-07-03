import { Calendar, Briefcase, FolderKanban, Settings, Pencil } from "lucide-react";
import ProfileStatsCard from "./ProfileStatsCard";
import { useProfile } from "./hooks/useProfile";

interface ProfileHeaderProps {
  isEditing: boolean;
  onToggleEdit: () => void;
}

/** "2026-06-29 16:59:59" → "Joined Jun 2026" */
function formatJoined(iso: string | undefined): string {
  if (!iso) return "";
  const date = new Date(iso.replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return "";
  return `Joined ${date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  })}`;
}

/** Build up-to-two-letter initials from a name. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function ProfileHeader({
  isEditing,
  onToggleEdit,
}: ProfileHeaderProps) {
  const { data: profile, isLoading } = useProfile();

  const name = profile?.name ?? "";
  const roleLabel =
    profile?.job_title ||
    (typeof profile?.roles?.[0] === "string"
      ? (profile?.roles?.[0] as string)
      : (profile?.roles?.[0] as { name?: string })?.name) ||
    "—";
  const joined = formatJoined(profile?.created_at);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-6 border-b border-slate-100">
      {/* User info */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-bold border-2 border-white shadow-md select-none">
            {isLoading ? "" : initials(name) || "?"}
          </div>
          <button
            type="button"
            onClick={onToggleEdit}
            className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm text-white hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer z-10"
          >
            {isEditing ? (
              <Pencil size={11} strokeWidth={2.5} />
            ) : (
              <Settings size={12} strokeWidth={2.5} />
            )}
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            {isLoading ? (
              <span className="inline-block h-8 w-40 rounded-md bg-slate-100 animate-pulse" />
            ) : (
              name
            )}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-slate-500 text-sm font-medium">
            <span className="text-slate-600">{roleLabel}</span>
            {joined && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:inline-block" />
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Calendar size={15} />
                  <span>{joined}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats cards (hidden in edit mode) */}
      {!isEditing && (
        <div className="flex flex-wrap sm:flex-nowrap gap-4 items-center w-full lg:w-auto">
          <ProfileStatsCard
            title="Tasks"
            value={profile?.counts?.tasks ?? 0}
            icon={<Briefcase size={22} />}
            iconBgColorClass="bg-blue-50 hover:bg-blue-100"
            iconColorClass="text-blue-600"
          />
          <ProfileStatsCard
            title="Projects"
            value={profile?.counts?.projects ?? 0}
            icon={<FolderKanban size={22} />}
            iconBgColorClass="bg-pink-50 hover:bg-pink-100"
            iconColorClass="text-pink-600"
          />
        </div>
      )}
    </div>
  );
}
