export interface IWorkingHours {
  start: string; // Định dạng "HH:MM"
  end: string;   // Định dạng "HH:MM"
}

export interface ISchedule {
  dayOfWeek: number; // 0: Chủ nhật, 1: Thứ 2, ..., 6: Thứ 7
  available: boolean;
  workingHours?: IWorkingHours[];
}

export interface Trainer {
  _id: string; // MongoDB sử dụng _id thay vì id
  image?: string;
  name: string;
  bio?: string;
  specialization?: string;
  experience?: number;
  phone?: string;
  email: string;
  schedule?: ISchedule[];
  created_at: string;
  updated_at: string;
}

// Interface hỗ trợ cho API response
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}