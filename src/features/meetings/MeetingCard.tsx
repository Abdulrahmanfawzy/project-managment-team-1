
"use client";

import { Plus, Trash2, Pencil } from "lucide-react";
import type { Meeting } from "./Types/meeting.types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import UpdateMeetingModal from "./UpdateMeetingModal";
import { useDeleteMeeting } from "./hooks/useDeleteMeeting";



interface MeetingCardProps {
  meeting: Meeting;
  highlighted?: boolean;
}

export default function MeetingCard({
  meeting,
}: MeetingCardProps) {


  const navigate = useNavigate();

  const deleteMutation = useDeleteMeeting();
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Prefer the backend avatar; fall back to a generated one when absent.
  const avatarUrls = meeting.participants.map(
    (p) =>
      p.avatar_url ??
      `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=random&size=44`,
  );
  const extraCount = Math.max(0, meeting.participants.length - 3);

  const borderStyle = "border border-[#F3F4F6]";

  const handleCardClick = () => {
    navigate(`/meetings/join-meeting/${meeting.id}`);
  };

  const handleDelete = async () => {
    const res = await Swal.fire({
      icon: "warning",
      title: "Delete meeting?",
      text: "This action cannot be undone.",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!res.isConfirmed) return;

    deleteMutation.mutate(Number(meeting.id));
  };

  return (
    <div
      onClick={handleCardClick}
      className={`rounded-xl ${borderStyle} p-3 flex flex-col gap-2 bg-white w-full cursor-pointer hover:shadow-md transition-all shadow-[0px_2px_4px_rgba(0,0,0,0.02)]`}
    >

      <div className="flex items-start justify-between">
        <p className="text-[13px] font-semibold text-[#1E1E2D] leading-tight">
          {meeting.title}
        </p>

        <div
          className="flex items-center gap-1 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditOpen(true);
            }}
            className="p-1 rounded-md hover:bg-slate-100 text-[#556987]"
            aria-label="Edit meeting"
          >
            <Pencil size={16} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="p-1 rounded-md hover:bg-slate-100 text-[#EF4444]"
            aria-label="Delete meeting"
            disabled={deleteMutation.isPending}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="text-[11px] text-[#A6B2CF] font-medium">
        {meeting.start_time} - {meeting.end_time}
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

      <UpdateMeetingModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        meeting={meeting}
      />

    </div>
  );
}