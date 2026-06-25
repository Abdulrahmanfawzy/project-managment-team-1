import { X, Plus } from "lucide-react";

interface NewMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function NewMeetingModal({ isOpen, onClose }: NewMeetingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white w-full max-w-[560px] rounded-2xl p-6 shadow-xl z-10 mx-4 flex flex-col gap-5">
        
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[#1E1E2D]">New Meeting</h2>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form className="flex flex-col gap-5 mt-2" onSubmit={(e) => e.preventDefault()}>
          
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-[#A6B2CF]">
              Meeting Subject
            </label>
            <input 
              type="text" 
              placeholder="Meeting Subject" 
              className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[13px] text-[#1E1E2D] placeholder-[#A6B2CF] focus:outline-none focus:border-[#005AFB]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Select Date */}
            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-[#A6B2CF]">
                Select Date
              </label>
              <input 
                type="text" 
                placeholder="Meeting Subject" 
                className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[13px] text-[#1E1E2D] placeholder-[#A6B2CF] focus:outline-none focus:border-[#005AFB]"
              />
            </div>

            {/* Select Time */}
            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-[#A6B2CF]">
                Select Time
              </label>
              <input 
                type="text" 
                placeholder="Meeting Subject" 
                className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[13px] text-[#1E1E2D] placeholder-[#A6B2CF] focus:outline-none focus:border-[#005AFB]"
              />
            </div>

            {/* Select Duration */}
            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-[#A6B2CF]">
                Select Duration
              </label>
              <input 
                type="text" 
                placeholder="Meeting Subject" 
                className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[13px] text-[#1E1E2D] placeholder-[#A6B2CF] focus:outline-none focus:border-[#005AFB]"
              />
            </div>
          </div>

          {/* Add Guests Input Box */}
          <div className="relative border border-[#E5E7EB] rounded-lg p-3 pt-4 flex flex-col gap-2">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-[#A6B2CF]">
              Add Guests
            </label>
            <div className="flex items-center justify-between w-full">
              <span className="text-[13px] text-[#556987]">@Anas Mohamed</span>
              <button 
                type="button"
                className="bg-[#1E1E2D] hover:bg-black text-white rounded-full px-3 py-1 text-[11px] font-medium flex items-center gap-1 transition-colors"
              >
                Add <Plus size={12} />
              </button>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&q=80" 
                alt="guest" 
                className="w-6 h-6 rounded-full"
              />
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&q=80" 
                alt="guest" 
                className="w-6 h-6 rounded-full"
              />
            </div>
          </div>

          {/* Add Note Textarea */}
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-[#A6B2CF]">
              Add Note
            </label>
            <textarea 
              rows={3}
              placeholder="The Goal of this meeting is..." 
              className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[13px] text-[#1E1E2D] placeholder-[#A6B2CF] focus:outline-none focus:border-[#005AFB] resize-none"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#005AFB] hover:bg-[#0047cc] text-white font-medium py-2.5 rounded-xl text-[14px] mt-2 transition-colors"
          >
            Add Meeting
          </button>
        </form>
      </div>
    </div>
  );
}