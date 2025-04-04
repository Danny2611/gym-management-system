// services/appointmentService.ts
import Appointment, { IAppointment } from '../models/Appointment';
import Membership, { IMembership } from '../models/Membership';
import Package, { IPackage } from '../models/Package';
import Trainer, { ITrainer, ISchedule } from '../models/Trainer';
import { startOfMonth, endOfMonth } from 'date-fns';
import { Types } from 'mongoose';

interface AppointmentFilters {
  status?: 'confirmed' | 'pending' | 'cancelled';
  startDate?: Date | string;
  endDate?: Date | string;
  date?: Date | string;
}

interface CreateAppointmentData {
  member_id: Types.ObjectId;
  trainer_id: Types.ObjectId;
  membership_id: Types.ObjectId;
  date: Date | string;
  startTime: string;
  endTime: string;
  location?: string;
  notes?: string;
}

// Lấy thông tin chi tiết của một lịch hẹn
const getAppointmentById = async (appointmentId: Types.ObjectId): Promise<IAppointment | null> => {
    // Tìm lịch hẹn theo appointmentId
    const appointment = await Appointment.findById(appointmentId)
      .populate('member_id', 'name avatar') // Dữ liệu của member
      .populate('trainer_id', 'name specialization image') // Dữ liệu của trainer
      .populate('membership_id', 'package_id start_date end_date') // Dữ liệu của membership
      .populate({
        path: 'membership_id.package_id', 
        select: 'name category' // Dữ liệu của package trong membership
      });
  
    if (!appointment) {
      throw new Error('Appointment not found');
    }
  
    return appointment;
  };
// Kiểm tra trainer có lịch trống không
const isTrainerAvailable = async (trainerId: Types.ObjectId, date: Date | string, startTime: string, endTime: string): Promise<boolean> => {
  const trainer = await Trainer.findById(trainerId);
  if (!trainer) return false;
  
  // Lấy thứ trong tuần (0-6)
  const dayOfWeek = new Date(date).getDay();
  
  // Kiểm tra xem trainer có làm việc vào ngày này không
  const scheduleForDay = trainer.schedule?.find(s => s.dayOfWeek === dayOfWeek);
  if (!scheduleForDay || !scheduleForDay.available) return false;
  
  // Kiểm tra thời gian nằm trong giờ làm việc của trainer
  const isTimeSlotAvailable = scheduleForDay.workingHours?.some(wh => {
    return startTime >= wh.start && endTime <= wh.end;
  });
  if (!isTimeSlotAvailable) return false;
  
  // Kiểm tra xem trainer đã có lịch hẹn vào thời gian này chưa
  const existingAppointments = await Appointment.find({
    trainer_id: trainerId,
    date: { $eq: new Date(date) },
    status: { $in: ['confirmed', 'pending'] },
    $or: [
      { 'time.start': { $lt: endTime, $gte: startTime } },
      { 'time.end': { $gt: startTime, $lte: endTime } },
      { 
        $and: [
          { 'time.start': { $lte: startTime } },
          { 'time.end': { $gte: endTime } }
        ]
      }
    ]
  });
  
  return existingAppointments.length === 0;
};

// Kiểm tra và cập nhật số buổi tập còn lại của membership
const checkAndUpdateAvailableSessions = async (membershipId: Types.ObjectId): Promise<IMembership> => {
  const membership = await Membership.findById(membershipId);
  if (!membership) throw new Error('Membership not found');
  
  if (membership.status !== 'active') {
    throw new Error('Membership is not active');
  }
  
  // Kiểm tra xem có cần reset số buổi tập hàng tháng không
  const now = new Date();
  const lastResetDate = membership.last_sessions_reset || membership.start_date;
  const thisMonth = startOfMonth(now);
  
  if (lastResetDate && thisMonth > lastResetDate) {
    // Tháng mới, reset số buổi tập
    const packageData = await Package.findById(membership.package_id);
    membership.available_sessions = packageData?.training_sessions || 0;
    membership.last_sessions_reset = now;
    await membership.save();
  }
  
  if (membership.available_sessions <= 0) {
    throw new Error('No available training sessions left in this membership');
  }
  
  return membership;
};

// Tạo lịch hẹn mới
const createAppointment = async (appointmentData: CreateAppointmentData): Promise<IAppointment> => {
  const { member_id, trainer_id, membership_id, date, startTime, endTime, location, notes } = appointmentData;
  
  // Kiểm tra gói tập và số buổi tập có sẵn
  const membership = await checkAndUpdateAvailableSessions(membership_id);
  
  // Kiểm tra xem trainer có lịch trống không
  const isAvailable = await isTrainerAvailable(trainer_id, date, startTime, endTime);
  if (!isAvailable) {
    throw new Error('Trainer is not available at the selected time');
  }
  
  // Tạo appointment mới
  const appointment = new Appointment({
    member_id,
    trainer_id,
    membership_id,
    date,
    time: {
      start: startTime,
      end: endTime
    },
    location,
    notes,
    status: 'pending'
  });
  
  await appointment.save();
  
  // Giảm số buổi tập có sẵn trong membership
  membership.available_sessions -= 1;
  membership.used_sessions += 1;
  await membership.save();
  
  return appointment;
};

// Lấy tất cả lịch hẹn của một member
const getMemberAppointments = async (memberId: Types.ObjectId, filters: AppointmentFilters = {}): Promise<IAppointment[]> => {
  const query: any = { member_id: memberId };
  
  // Thêm các bộ lọc nếu có
  if (filters.status) query.status = filters.status;
  if (filters.startDate) query.date = { $gte: new Date(filters.startDate) };
  if (filters.endDate) {
    query.date = { ...query.date, $lte: new Date(filters.endDate) };
  }
  
  const appointments = await Appointment.find(query)
    .populate('trainer_id', 'name specialization image')
    .populate({
      path: 'membership_id',
      select: 'package_id start_date end_date',
      populate: {
        path: 'package_id',
        select: 'name category'
      }
    })
    .sort({ date: 1, 'time.start': 1 });
  
  return appointments;
};

// Lấy tất cả lịch hẹn của một trainer
const getTrainerAppointments = async (trainerId: Types.ObjectId, filters: AppointmentFilters = {}): Promise<IAppointment[]> => {
  const query: any = { trainer_id: trainerId };
  
  // Thêm các bộ lọc nếu có
  if (filters.status) query.status = filters.status;
  if (filters.date) query.date = new Date(filters.date);
  
  const appointments = await Appointment.find(query)
    .populate('member_id', 'name avatar')
    .populate('membership_id', 'package_id')
    .sort({ date: 1, 'time.start': 1 });
  
  return appointments;
};

// Hủy lịch hẹn
const cancelAppointment = async (appointmentId: Types.ObjectId, isRefund: boolean = true): Promise<IAppointment> => {
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) throw new Error('Appointment not found');
  
  // Chỉ cho phép hủy các lịch hẹn đang pending hoặc confirmed
  if (!['pending', 'confirmed'].includes(appointment.status)) {
    throw new Error(`Cannot cancel appointment with status: ${appointment.status}`);
  }
  
  // Cập nhật trạng thái
  appointment.status = 'cancelled';
  await appointment.save();
  
  // Nếu cần hoàn lại buổi tập cho membership
  if (isRefund && appointment.membership_id) {
    const membership = await Membership.findById(appointment.membership_id);
    if (membership && membership.status === 'active') {
      membership.available_sessions += 1;
      membership.used_sessions -= 1;
      await membership.save();
    }
  }
  
  return appointment;
};

export default {
  createAppointment,
  getMemberAppointments,
  getTrainerAppointments,
  cancelAppointment,
  isTrainerAvailable,
  getAppointmentById,
};