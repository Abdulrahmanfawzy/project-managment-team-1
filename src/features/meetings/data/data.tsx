import type { SelectOption } from "@/components/shared/select-dropdown";

export type Participant = {
  id: string;
  name: string;
  avatar: string;
};

export type TranscriptEntry = {
  id: string;
  time: string;
  name: string;
  avatar: string;
  text: string;
};

export type Comment = {
  id: string;
  name: string;
  avatar: string;
  time: string;
  text: string;
};

/** Top-level details for the meeting being reviewed. */
export const meeting = {
  title: "Design Review",
  project: "Project 1",
  date: "December 12, 2025",
  time: "10:00 - 10:30 AM",
};

/** People who attended the meeting (shown as an avatar group in the header). */
export const participants: Participant[] = [
  { id: "1", name: "Mohanad Wahib", avatar: "https://i.pravatar.cc/64?img=12" },
  { id: "2", name: "Ahmed Hassan", avatar: "https://i.pravatar.cc/64?img=15" },
  { id: "3", name: "Omar Khaled", avatar: "https://i.pravatar.cc/64?img=33" },
  {
    id: "4",
    name: "Mahmoud Ashraf",
    avatar: "https://i.pravatar.cc/64?img=51",
  },
  { id: "5", name: "Nadir Mustafa", avatar: "https://i.pravatar.cc/64?img=68" },
];

/** Languages offered by the transcript language switcher. */
export const transcriptLanguages: SelectOption[] = [
  { label: "English", value: "en" },
  { label: "العربية", value: "ar" },
];

/** Full meeting transcript (filtered by the search box). */
export const transcripts: TranscriptEntry[] = [
  {
    id: "t1",
    time: "00:01",
    name: "Mohanad Wahib",
    avatar: "https://i.pravatar.cc/64?img=12",
    text: "Good morning everyone. Thanks for joining on time. Today we'll focus on reviewing the latest design updates and aligning on next steps.",
  },
  {
    id: "t2",
    time: "00:40",
    name: "Ahmed Hassan",
    avatar: "https://i.pravatar.cc/64?img=15",
    text: "Morning. I went through the new homepage design, and overall it looks cleaner, but I think we still have some usability issues to address.",
  },
  {
    id: "t3",
    time: "01:23",
    name: "Omar Khaled",
    avatar: "https://i.pravatar.cc/64?img=33",
    text: "I agree. The layout is better, but the call-to-action isn't very clear, especially for first-time users.",
  },
  {
    id: "t4",
    time: "02:01",
    name: "Mohanad Wahib",
    avatar: "https://i.pravatar.cc/64?img=12",
    text: "From a UX perspective, the sign-up flow also feels a bit long. Users might drop off before completing the process.",
  },
  {
    id: "t5",
    time: "04:48",
    name: "Mahmoud Ashraf",
    avatar: "https://i.pravatar.cc/64?img=51",
    text: "That's a good point. Do you think we should reduce the number of required fields in the first step?",
  },
  {
    id: "t6",
    time: "06:15",
    name: "Nadir Mustafa",
    avatar: "https://i.pravatar.cc/64?img=68",
    text: "Good morning everyone. Let's begin today's meeting by reviewing the project timeline and assigning tasks for the next phase.",
  },
];

/** AI Summary tab content. */
export const summaryKeyPoints: string[] = [
  "The team reviewed the latest homepage design and agreed on the proposed layout.",
  "Several usability improvements were suggested for the sign-up flow.",
  "Final color decisions were postponed to the next meeting.",
  "The design team was asked to update the wireframes based on feedback.",
  "A follow-up review meeting was scheduled for next week.",
];

/** Note tab content (dummy). */
export const notes: string[] = [
  "Reduce the number of required fields in the sign-up form.",
  "Make the primary call-to-action more prominent on the homepage.",
  "Prepare updated wireframes before the next review.",
];

/** Comments tab content (dummy). */
export const comments: Comment[] = [
  {
    id: "c1",
    name: "Omar Khaled",
    avatar: "https://i.pravatar.cc/64?img=33",
    time: "2h ago",
    text: "Great session! The new layout direction looks promising.",
  },
  {
    id: "c2",
    name: "Mahmoud Ashraf",
    avatar: "https://i.pravatar.cc/64?img=51",
    time: "1h ago",
    text: "I'll share the revised wireframes by tomorrow morning.",
  },
  {
    id: "c3",
    name: "Ahmed Hassan",
    avatar: "https://i.pravatar.cc/64?img=15",
    time: "45m ago",
    text: "Agreed on postponing the color decisions until we test the flow.",
  },
];
