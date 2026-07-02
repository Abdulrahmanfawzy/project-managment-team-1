"use client";

import { Plus } from "lucide-react";
import type { Meeting } from "./Types/meeting.types";
import { useNavigate } from "react-router-dom";

interface MeetingCardProps {
  meeting: Meeting;
  highlighted?: boolean;
}

export default function MeetingCard({
  meeting,
  highlighted = false,
}: MeetingCardProps) {
  const navigate = useNavigate();
  const avatarUrls = meeting.participants.map((p) => p.avatarUrl);
  const extraCount = Math.max(0, meeting.participants.length - 2);

  const borderStyle = "border border-[#F3F4F6]";

  const handleCardClick = () => {
    navigate(`/meetings/join-meeting/${meeting.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`rounded-xl ${borderStyle} p-3 flex flex-col gap-2 bg-white w-full cursor-pointer hover:shadow-md transition-all shadow-[0px_2px_4px_rgba(0,0,0,0.02)]`}
    >
      <p className="text-[13px] font-semibold text-[#1E1E2D] leading-tight">
        {meeting.title}
      </p>

      <p className="text-[11px] text-[#A6B2CF] font-medium">
        {meeting.startTime} - {meeting.endTime} PM
      </p>

      <div className="flex items-center justify-between mt-0.5">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-2">
            {avatarUrls.slice(0, 3).map((url, i) => (
              <img
                key={i}
                src={url}
                alt="Participant"
                className="w-[22px] h-[22px] rounded-full ring-2 ring-white object-cover"
              />
            ))}
          </div>
          {extraCount > 0 && (
            <span className="text-[11px] text-[#A6B2CF] font-medium pl-1">
              +{extraCount}
            </span>
          )}
        </div>

        <button
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-[12px] text-[#556987] hover:text-[#1E1E2D] font-medium"
        >
          Join <Plus size={14} className="text-[#556987]" />
        </button>
      </div>
    </div>
  );
}
