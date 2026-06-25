import { Play } from "lucide-react";

import meetingView from "@/assets/MeetingView.png";
import { meeting } from "../data/data";

export default function MeetingVedio() {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <img
        src={meetingView}
        alt={meeting.title}
        className="h-full w-full object-cover"
      />

      {/* Play button overlay */}
      <button
        type="button"
        aria-label="Play meeting recording"
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-brand text-white shadow-lg transition-transform hover:scale-105">
          <Play className="size-6 translate-x-0.5 fill-current" />
        </span>
      </button>
    </div>
  );
}
