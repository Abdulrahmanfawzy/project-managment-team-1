
export const WEEK_DAYS = [
  { label: "Today", date: 18, isToday: true },
  { label: "Mon", date: 18, isToday: false },
  { label: "Tue", date: 18, isToday: false },
  { label: "Wed", date: 18, isToday: false },
  { label: "Thurs", date: 18, isToday: false },
];

export const TIME_SLOTS = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

const BASE_AVATAR_URL = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&q=80";

export const MOCK_MEETINGS = [

  {
    id: "1",
    title: "Design Review",
    startTime: "9:00",
    endTime: "10:30",
    dayIndex: 0, 
    participants: [{ id: "p1", avatarUrl: BASE_AVATAR_URL }]
  },
  {
    id: "2",
    title: "Alignment Meeting",
    startTime: "9:00",
    endTime: "10:30",
    dayIndex: 4, 
    participants: [{ id: "p2", avatarUrl: BASE_AVATAR_URL }, { id: "p3", avatarUrl: BASE_AVATAR_URL }]
  },

  {
    id: "3",
    title: "Design Review",
    startTime: "11:00",
    endTime: "12:30",
    dayIndex: 2, 
    participants: [{ id: "p4", avatarUrl: BASE_AVATAR_URL }, { id: "p5", avatarUrl: BASE_AVATAR_URL }]
  },

 
  {
    id: "4",
    title: "API Design Meeting",
    startTime: "12:00",
    endTime: "13:30",
    dayIndex: 1, 
    participants: [{ id: "p6", avatarUrl: BASE_AVATAR_URL }, { id: "p7", avatarUrl: BASE_AVATAR_URL }]
  },
  {
    id: "5",
    title: "Design Review",
    startTime: "12:00",
    endTime: "13:30",
    dayIndex: 3, 
    participants: [{ id: "p8", avatarUrl: BASE_AVATAR_URL }, { id: "p9", avatarUrl: BASE_AVATAR_URL }]
  },

  {
    id: "6",
    title: "Frontend Retrospective",
    startTime: "13:00",
    endTime: "14:30",
    dayIndex: 0, 
    participants: [{ id: "p10", avatarUrl: BASE_AVATAR_URL }, { id: "p11", avatarUrl: BASE_AVATAR_URL }, { id: "p12", avatarUrl: BASE_AVATAR_URL }]
  },
];