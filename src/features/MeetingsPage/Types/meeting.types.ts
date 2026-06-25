export interface Participant {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Meeting {
  id: string;
  title: string;
  startTime: string; 
  endTime: string;   
  participants: Participant[];
  dayIndex: number; 
}