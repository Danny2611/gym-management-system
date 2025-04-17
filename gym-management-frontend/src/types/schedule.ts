export type AppointmentStatusType =
  | "confirmed"
  | "pending"
  | "cancelled"
  | "completed"
  | "missed"
  | "upcoming";

  
export interface ScheduleTime {
  endTime: string; // HH:MM format
  startTime: string; // HH:MM format
}
export interface Schedule  {
  id: string;
  date: string;
  time: ScheduleTime;
  location: string;
  package_name: string;
  notes?: string;
  status: AppointmentStatusType;
  trainer_name?: string | null;
  trainer_image?: string | null;
}
