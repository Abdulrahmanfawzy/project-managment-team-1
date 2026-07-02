import { Play } from "lucide-react";

import meetingView from "@/assets/MeetingView.png";

/**
 * Meeting recording preview. The backend doesn't return a recording/thumbnail
 * yet, so we show a fixed placeholder image. `title` is only used for alt text.
 */
export default function MeetingVedio({ title }: { title?: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <img
        src={meetingView}
        alt={title ?? "Meeting recording"}
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
