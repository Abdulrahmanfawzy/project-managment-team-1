import { useEffect, useState, type FormEvent } from "react";
import { User, Mail, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfile } from "./hooks/useProfile";
import { useUpdateProfile } from "./hooks/useUpdateProfile";
import { useTeams } from "@/features/Dashboard/hooks/UseTeams";
import { useProjects } from "@/features/projects/hooks/useProjects";

const COUNTRY_CODES = [
  { code: "+20", flag: "🇪🇬" },
  { code: "+966", flag: "🇸🇦" },
  { code: "+971", flag: "🇦🇪" },
  { code: "+1", flag: "🇺🇸" },
  { code: "+44", flag: "🇬🇧" },
];

interface ProfileEditFormProps {
  /** Called after a successful save (e.g. to leave edit mode). */
  onSuccess?: () => void;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  country_code: string;
  about: string;
  job_title: string;
  experience_years: string;
  availability_status: string;
  current_team_id: string;
  current_project_id: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  country_code: "+20",
  about: "",
  job_title: "",
  experience_years: "0",
  availability_status: "available",
  current_team_id: "",
  current_project_id: "",
};

interface Option {
  id: number | string;
  name: string;
}

export default function ProfileEditForm({ onSuccess }: ProfileEditFormProps) {
  const { data: profile, isLoading } = useProfile();
  const { mutate, isPending } = useUpdateProfile();

  // Team & project lists provide the real IDs the backend requires.
  const { data: teamsResp, isLoading: teamsLoading } = useTeams();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const teams: Option[] = (teamsResp as { data?: Option[] })?.data ?? [];
  const projectOptions: Option[] = projects ?? [];

  const [form, setForm] = useState<FormState>(EMPTY);

  // Hydrate the form once the profile (and the lists it references by name) arrive.
  useEffect(() => {
    if (!profile) return;
    const matchedTeam = teams.find((t) => t.name === profile.current_team);
    const matchedProject = projectOptions.find(
      (p) => p.name === profile.current_project,
    );
    setForm({
      name: profile.name ?? "",
      email: profile.email ?? "",
      phone: profile.phone ?? "",
      country_code: profile.country_code ?? "+20",
      about: profile.about ?? "",
      job_title: profile.job_title ?? "",
      experience_years: String(profile.experience_years ?? 0),
      availability_status: profile.availability_status ?? "available",
      current_team_id: matchedTeam ? String(matchedTeam.id) : "",
      current_project_id: matchedProject ? String(matchedProject.id) : "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, teamsResp, projects]);

  const set =
    <K extends keyof FormState>(key: K) =>
    (value: FormState[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.current_team_id || !form.current_project_id) {
      toast.error("Please select your current team and project.");
      return;
    }
    mutate(
      {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        country_code: form.country_code || null,
        about: form.about.trim() || null,
        job_title: form.job_title.trim() || null,
        experience_years: Number(form.experience_years) || 0,
        availability_status: form.availability_status,
        current_team_id: Number(form.current_team_id),
        current_project_id: Number(form.current_project_id),
      },
      { onSuccess: () => onSuccess?.() },
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full max-w-5xl mx-auto py-6"
    >
      {/* Personal Info Section */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <h2 className="text-lg font-bold text-slate-900">Personal Info</h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            You can change your personal information settings here.
          </p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-bold text-slate-700">
              Full Name
            </Label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <Input
                value={form.name}
                onChange={(e) => set("name")(e.target.value)}
                required
                className="pl-9 h-10 rounded-xl"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-bold text-slate-700">
              Email Address
            </Label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <Input
                type="email"
                value={form.email}
                onChange={(e) => set("email")(e.target.value)}
                required
                className="pl-9 h-10 rounded-xl"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-bold text-slate-700">
              Phone Number
            </Label>
            <div className="flex items-center gap-0 border border-input rounded-xl overflow-hidden focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
              <select
                value={form.country_code}
                onChange={(e) => set("country_code")(e.target.value)}
                className="h-10 pl-3 pr-2 text-sm bg-transparent border-r border-slate-100 outline-none cursor-pointer shrink-0"
                aria-label="Country code"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
              <input
                value={form.phone}
                onChange={(e) => set("phone")(e.target.value)}
                placeholder="Add phone number"
                className="w-full h-10 px-3 text-sm text-slate-800 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Availability Status */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-bold text-slate-700">
              Availability Status
            </Label>
            <Select
              value={form.availability_status}
              onValueChange={set("availability_status")}
            >
              <SelectTrigger className="w-full h-10 rounded-xl">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="away">Away</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* About / Bio */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label className="text-xs font-bold text-slate-700">About</Label>
            <textarea
              value={form.about}
              onChange={(e) => set("about")(e.target.value)}
              rows={3}
              placeholder="Write a short bio…"
              className="w-full rounded-xl border border-input px-3 py-2 text-sm text-slate-800 outline-none resize-y focus:border-ring focus:ring-3 focus:ring-ring/50"
            />
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <h2 className="text-lg font-bold text-slate-900">Experience</h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            You can change Experience settings here.
          </p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Job Title */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-bold text-slate-700">
              Job Title
            </Label>
            <Input
              value={form.job_title}
              onChange={(e) => set("job_title")(e.target.value)}
              placeholder="Add job title"
              className="h-10 rounded-xl"
            />
          </div>

          {/* Years of Experience */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-bold text-slate-700">
              Years of Experience
            </Label>
            <Input
              type="number"
              min={0}
              value={form.experience_years}
              onChange={(e) => set("experience_years")(e.target.value)}
              className="h-10 rounded-xl"
            />
          </div>

          {/* Current Team */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-bold text-slate-700">
              Current Team <span className="text-red-500">*</span>
            </Label>
            <Select
              value={form.current_team_id}
              onValueChange={set("current_team_id")}
              disabled={teamsLoading}
            >
              <SelectTrigger className="w-full h-10 rounded-xl">
                <SelectValue
                  placeholder={teamsLoading ? "Loading teams…" : "Select a team"}
                />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={String(team.id)}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Current Project */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-bold text-slate-700">
              Current Project <span className="text-red-500">*</span>
            </Label>
            <Select
              value={form.current_project_id}
              onValueChange={set("current_project_id")}
              disabled={projectsLoading}
            >
              <SelectTrigger className="w-full h-10 rounded-xl">
                <SelectValue
                  placeholder={
                    projectsLoading ? "Loading projects…" : "Select a project"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {projectOptions.map((project) => (
                  <SelectItem key={project.id} value={String(project.id)}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <Button
        type="submit"
        variant="brand"
        disabled={isPending}
        className="w-full h-11 rounded-xl text-base font-semibold gap-2"
      >
        {isPending ? (
          <>
            Saving
            <Loader2 size={18} className="animate-spin" />
          </>
        ) : (
          <>
            Save
            <Check size={18} strokeWidth={2.5} />
          </>
        )}
      </Button>
    </form>
  );
}
