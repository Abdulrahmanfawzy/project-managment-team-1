export interface MeetingParticipant {
  id: string;
  name: string;
  email: string;
}

export interface MeetingCreator {
  id: number;
  name: string;
  email: string;
}

export interface MeetingProject {
  id: number;
  name: string;
}

export interface MeetingTeam {
  id: number;
  name: string;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  starts_at: string;
  ends_at: string;
  date: string;
  start_time: string;
  end_time: string;
  meeting_link: string;
  location: string;
  project_id: number;
  created_by: number;
  creator: MeetingCreator;
  project: MeetingProject;
  participants: MeetingParticipant[];
  teams: MeetingTeam[];
  created_at: string;
  updated_at: string;
}

export interface MeetingResponse {
  success: boolean;
  message: string;
  data: {
    meeting: Meeting;
  };
  paginate: null;
}

//   {
//     "success": true,
//     "message": "Meeting retrieved successfully.",
//     "data": {
//         "meeting": {
//             "id": 3,
//             "title": "Sprint Planning",
//             "description": "Weekly sprint planning session",
//             "starts_at": "2026-07-03 10:00:00",
//             "ends_at": "2026-07-07 11:30:00",
//             "date": "2026-07-03",
//             "start_time": "10:00",
//             "end_time": "11:30",
//             "meeting_link": "https://meet.google.com/abc-defg-hij",
//             "location": "Room A / Online",
//             "project_id": 1,
//             "created_by": 5,
//             "creator": {
//                 "id": 5,
//                 "name": "hananAdeeb",
//                 "email": "hanan.bayazeed56@gmail.com"
//             },
//             "project": {
//                 "id": 1,
//                 "name": "Updated Project"
//             },
//             "participants": [
//                 {
//                     "id": 1,
//                     "name": "abanoubtalaat",
//                     "email": "abanoubtalaat555@gmail.com"
//                 },
//                 {
//                     "id": 2,
//                     "name": "Test User",
//                     "email": "test@example.com"
//                 },
//                 {
//                     "id": 3,
//                     "name": "abanoubtalaat",
//                     "email": "abdo.fawzy@gmail.com"
//                 },
//                 {
//                     "id": 5,
//                     "name": "hananAdeeb",
//                     "email": "hanan.bayazeed56@gmail.com"
//                 }
//             ],
//             "teams": [
//                 {
//                     "id": 1,
//                     "name": "Backend Team"
//                 }
//             ],
//             "created_at": "2026-07-02 13:24:43",
//             "updated_at": "2026-07-02 13:24:43"
//         }
//     },
//     "paginate": null
// }
