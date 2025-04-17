// src/controller/user/appoinmentController.ts
import { Request, Response, NextFunction  } from 'express';
import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import appointmentService from '../../services/appointmentService';
import Trainer from '../../models/Trainer';
import Membership from '../../models/Membership';
import { Types } from 'mongoose';

interface AuthRequest extends Request {
  userId?: string;
  userRole?: string;
}

  
  /**
   * Lấy danh sách lịch hẹn của hội viên
   */
  export const getMemberAppointments = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const memberId = req.userId;
  
      if (!memberId) {
        res.status(401).json({
          success: false,
          message: 'Bạn cần đăng nhập để xem lịch hẹn'
        });
        return;
      }
  
      // Tạo bộ lọc từ query parameters
      const filters: any = {};
      if (req.query.status) filters.status = req.query.status;
      if (req.query.startDate) filters.startDate = req.query.startDate;
      if (req.query.endDate) filters.endDate = req.query.endDate;
  
      const appointments = await appointmentService.getAllMemberAppointments(
        new Types.ObjectId(memberId),
        filters
      );
  
      res.status(200).json({
        success: true,
        count: appointments.length,
        data: appointments
      });
    } catch (error) {
      console.error('Lỗi khi lấy danh sách lịch hẹn:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi xử lý yêu cầu'
      });
    }
  };
  


  /**
   * Hủy lịch hẹn
   */
  export const cancelAppointment = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.userId;
      const userRole = req.userRole;
      const { appointmentId } = req.params;
  
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Bạn cần đăng nhập để hủy lịch hẹn'
        });
        return;
      }
  
      // Lấy thông tin lịch hẹn
      const appointment = await appointmentService.getAppointmentById(new Types.ObjectId(appointmentId));
  
      if (!appointment) {
        res.status(404).json({
          success: false,
          message: 'Không tìm thấy lịch hẹn'
        });
        return;
      }
  
      // Kiểm tra quyền hủy lịch hẹn
      const isMember = String(appointment.member_id) === userId;
      const isTrainer = String(appointment.trainer_id) === userId;
      const isAdmin = userRole === 'admin';
  
      if (!isMember && !isTrainer && !isAdmin) {
        res.status(403).json({
          success: false,
          message: 'Bạn không có quyền hủy lịch hẹn này'
        });
        return;
      }
  
      // Quyết định có hoàn lại buổi tập hay không
      const isRefund = isMember || isAdmin ||
        (req.body.isRefund !== undefined ? req.body.isRefund : true);
  
      const cancelledAppointment = await appointmentService.cancelAppointment(
        new Types.ObjectId(appointmentId),
        isRefund
      );
  
      res.status(200).json({
        success: true,
        message: 'Đã hủy lịch hẹn thành công',
        data: cancelledAppointment
      });
    } catch (error: any) {
      console.error('Lỗi khi hủy lịch hẹn:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Lỗi khi hủy lịch hẹn'
      });
    }
  };
  
/**
 * Kiểm tra lịch trống của huấn luyện viên
 */
export const checkTrainerAvailability = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { trainer_id, date, startTime, endTime } = req.body;
  
      if (!trainer_id || !date || !startTime || !endTime) {
        res.status(400).json({
          success: false,
          message: 'Thiếu thông tin cần thiết'
        });
        return;
      }
  
      const isAvailable = await appointmentService.isTrainerAvailable(
        new Types.ObjectId(trainer_id),
        date,
        startTime,
        endTime
      );
  
      res.status(200).json({
        success: true,
        isAvailable
      });
    } catch (error) {
      console.error('Lỗi khi kiểm tra lịch trống:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi xử lý yêu cầu'
      });
    }
  };

  
  


export default {
  getMemberAppointments,
  cancelAppointment,
  checkTrainerAvailability,
};