// services/appoinmentService.ts
import { apiClient } from "./api";
import { Appointment } from "~/types/appointment";
import { Trainer } from "~/types/trainer";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  errors?: any[];
  isAvailable?: boolean;
}

export interface CreateAppointmentParams {
  trainer_id: string;
  membership_id: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  notes?: string;
}

export interface AppointmentFilter {
  status?: 'confirmed' | 'pending' | 'cancelled';
  startDate?: string;
  endDate?: string;
}

export const appointmentService = {
  /**
   * Tạo lịch hẹn mới với PT
   * @param appointmentData - Thông tin lịch hẹn cần tạo
   * @returns Thông tin lịch hẹn đã tạo
   */
  createAppointment: async (appointmentData: CreateAppointmentParams): Promise<ApiResponse<Appointment>> => {
    try {
      const response = await apiClient.post("/api/user/appointments", appointmentData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: 'Không thể tạo lịch hẹn',
        errors: [error]
      };
    }
  },

  /**
   * Lấy danh sách lịch hẹn của hội viên
   * @param filters - Bộ lọc để tìm kiếm lịch hẹn
   * @returns Danh sách lịch hẹn
   */
  getMemberAppointments: async (filters?: AppointmentFilter): Promise<ApiResponse<Appointment[]>> => {
    try {
      // Xây dựng query parameters nếu có bộ lọc
      let queryString = '';
      if (filters) {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);
        queryString = params.toString() ? `?${params.toString()}` : '';
      }

      const response = await apiClient.get(`/api/user/appointments${queryString}`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: 'Không thể tải danh sách lịch hẹn',
        errors: [error]
      };
    }
  },

  /**
   * Hủy lịch hẹn
   * @param appointmentId - ID của lịch hẹn cần hủy
   * @returns Thông tin lịch hẹn đã hủy
   */
  cancelAppointment: async (appointmentId: string): Promise<ApiResponse<Appointment>> => {
    try {
      const response = await apiClient.delete(`/api/user/appointments/${appointmentId}`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: 'Không thể hủy lịch hẹn',
        errors: [error]
      };
    }
  },

  /**
   * Kiểm tra lịch trống của huấn luyện viên
   * @param trainer_id - ID của huấn luyện viên
   * @param date - Ngày cần kiểm tra
   * @param startTime - Thời gian bắt đầu
   * @param endTime - Thời gian kết thúc
   * @returns Thông tin lịch trống
   */
  checkTrainerAvailability: async (
    trainer_id: string,
    date: string,
    startTime: string,
    endTime: string
  ): Promise<ApiResponse<boolean>> => {
    try {
      const response = await apiClient.post("/api/user/appointments/check-availability", {
        trainer_id,
        date,
        startTime,
        endTime
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: 'Không thể kiểm tra lịch trống',
        errors: [error],
        isAvailable: false
      };
    }
  }
};
