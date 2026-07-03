import { useMemo, useState, type FormEvent } from "react";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProjects } from "@/features/projects/hooks/useProjects";
import { useTeams } from "@/features/Dashboard/hooks/UseTeams";
import { useCreateMeeting } from "./hooks/useCreateMeeting";
import MultiSelectDropdown, {
  type MultiOption,
} from "@/components/shared/MultiSelectDropdown";
import type { TeamWithMembers } from "./Types/meeting.types";

interface NewMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const inputClass =
  "w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[13px] text-[#1E1E2D] placeholder-[#A6B2CF] focus:outline-none focus:border-[#005AFB]";
const labelClass = "text-[11px] font-medium text-[#556987] mb-1 block";

export default function NewMeetingModal({
  isOpen,
  onClose,
}: NewMeetingModalProps) {
  const { data: projects } = useProjects();
  const { data: teamsResp } = useTeams();
  const teams: TeamWithMembers[] =
    (teamsResp as { data?: TeamWithMembers[] })?.data ?? [];
  const { mutate, isPending } = useCreateMeeting();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [location, setLocation] = useState("");
  const [projectId, setProjectId] = useState("");
  const [teamIds, setTeamIds] = useState<string[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);

  const teamOptions: MultiOption[] = teams.map((t) => ({
    value: String(t.id),
    label: t.display_name ?? t.name,
    sublabel: `${t.members_count} member${t.members_count === 1 ? "" : "s"}`,
  }));

  // Guests come from the members of the selected teams (deduped by id).
  const guestOptions: MultiOption[] = useMemo(() => {
    const byId = new Map<number, MultiOption>();
    for (const team of teams) {
      if (!teamIds.includes(String(team.id))) continue;
      for (const m of team.members) {
        if (!byId.has(m.id)) {
          byId.set(m.id, {
            value: String(m.id),
            label: m.name,
            sublabel: m.email,
            avatarUrl: m.avatar_url,
          });
        }
      }
    }
    return [...byId.values()];
  }, [teams, teamIds]);

  const reset = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setMeetingLink("");
    setLocation("");
    setProjectId("");
    setTeamIds([]);
    setUserIds([]);
  };

  // Drop guests that are no longer available after a team is deselected.
  const availableGuestIds = new Set(guestOptions.map((g) => g.value));
  const cleanedUserIds = userIds.filter((id) => availableGuestIds.has(id));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date || !startTime || !endTime || !projectId) {
      toast.error("Please fill title, date, times and project.");
      return;
    }
    if (endTime <= startTime) {
      toast.error("End time must be after start time.");
      return;
    }

    mutate(
      {
        title: title.trim(),
        description: description.trim() || undefined,
        starts_at: `${date} ${startTime}:00`,
        ends_at: `${date} ${endTime}:00`,
        meeting_link: meetingLink.trim() || undefined,
        location: location.trim() || undefined,
        project_id: Number(projectId),
        team_ids: teamIds.map(Number),
        user_ids: cleanedUserIds.map(Number),
      },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-xl z-10 mx-4 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[#1E1E2D]">
            New Meeting
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form className="flex flex-col gap-4 mt-1" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className={labelClass}>
              Meeting Subject <span className="text-red-500">*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sprint Planning"
              className={inputClass}
            />
          </div>

          {/* Date / Start / End */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={labelClass}>
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                Start <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                End <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Project */}
          <div>
            <label className={labelClass}>
              Project <span className="text-red-500">*</span>
            </label>
            <Select value={projectId} onValueChange={setProjectId}>
              <SelectTrigger className="w-full h-10 rounded-lg text-[13px]">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {(projects ?? []).map((p) => (
                  <SelectItem key={p.id} value={String(p.id)}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Teams */}
          <div>
            <label className={labelClass}>Teams</label>
            <MultiSelectDropdown
              options={teamOptions}
              selected={teamIds}
              onChange={setTeamIds}
              placeholder="Select team(s)"
              emptyText="No teams available"
            />
          </div>

          {/* Guests (from selected teams' members) */}
          <div>
            <label className={labelClass}>Guests</label>
            <MultiSelectDropdown
              options={guestOptions}
              selected={cleanedUserIds}
              onChange={setUserIds}
              placeholder="Select guests"
              emptyText="Pick a team first to see its members"
              disabled={teamIds.length === 0}
            />
          </div>

          {/* Meeting link */}
          <div>
            <label className={labelClass}>Meeting Link</label>
            <input
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              placeholder="https://meet.google.com/…"
              className={inputClass}
            />
          </div>

          {/* Location */}
          <div>
            <label className={labelClass}>Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Room A / Online"
              className={inputClass}
            />
          </div>

          {/* Note */}
          <div>
            <label className={labelClass}>Note</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="The goal of this meeting is…"
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#005AFB] hover:bg-[#0047cc] disabled:opacity-60 text-white font-medium py-2.5 rounded-xl text-[14px] mt-1 transition-colors flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                Creating <Loader2 size={16} className="animate-spin" />
              </>
            ) : (
              "Add Meeting"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
