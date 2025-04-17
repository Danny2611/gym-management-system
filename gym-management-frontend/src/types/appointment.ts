// types/appointment.ts

export interface AppointmentTime {
  start: string; // HH:MM format
  end: string; // HH:MM format
}
export interface TimeSlot {
  start: string;
  end: string;
  formattedTime: string;
}

export interface DailyAvailability {
  date: string;
  dayName: string;
  dayOfMonth: number;
  monthYear: string;
  shortDay: string;
  formattedDate: string;
  isoDate: string;
  available: boolean;
  timeSlots: TimeSlot[];
}

export interface Location {
  id: string;
  name: string;
  available: boolean;
}

export interface Appointment {
  member_id: string; // ID của member, kiểu chuỗi
  membership_id: string; // ID của membership, kiểu chuỗi
  trainer_id: string; // ID của trainer, kiểu chuỗi
  notes?: string; // Ghi chú, kiểu chuỗi (tùy chọn)
  date: string; // Ngày, kiểu chuỗi (theo định dạng ISO Date string)
  time: AppointmentTime; // Thời gian bắt đầu và kết thúc
  location?: string; // Địa điểm, kiểu chuỗi (tùy chọn)
  status: "confirmed" | "pending" | "cancelled" | "completed"; // Trạng thái
  created_at: string; // Thời gian tạo, kiểu chuỗi (ISO Date string)
  updated_at: string; // Thời gian cập nhật, kiểu chuỗi (ISO Date string)
}

export interface AppointmentDetail {
  _id: string;
  date: string;
  time: {
    start: string;
    end: string;
  };
  location: string;
  notes: string;
  status: string;
  trainer_id: string;
  membership_id: string;
}

