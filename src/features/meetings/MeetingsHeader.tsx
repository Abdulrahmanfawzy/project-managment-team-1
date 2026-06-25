"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewMeetingModal from "./NewMeetingModal";

export default function MeetingsHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-[18.41px] font-semibold text-black leading-[150%] font-inter">
        Meetings
      </h1>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-[#005AFB] hover:bg-[#0047cc] text-white rounded-[19px] px-4 py-2 text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        Add Meeting <Plus size={16} />
      </Button>

      <NewMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
