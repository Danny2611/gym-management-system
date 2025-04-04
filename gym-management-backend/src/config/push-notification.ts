// # Cấu hình push notification
// src/config/push-notifications.ts
import dotenv from 'dotenv';

dotenv.config();

// Cấu hình cho Web Push Notifications
const pushConfig = {
  // VAPID keys được sử dụng để xác thực server khi gửi push notifications
  // Tạo cặp khóa mới bằng web-push CLI: npx web-push generate-vapid-keys
  publicKey: process.env.VAPID_PUBLIC_KEY || '',
  privateKey: process.env.VAPID_PRIVATE_KEY || '',
  subject: process.env.VAPID_SUBJECT || 'mailto:contact@fittlife.com', // Địa chỉ liên hệ 
  
  // Thông số cho notifications mặc định
  defaultOptions: {
    TTL: 86400, // Thời gian sống của notification (24 giờ - tính bằng giây)
    urgency: 'normal', // normal, high, very-high, low
  },
  
  // Các loại thông báo
  notificationTypes: {
    PACKAGE_EXPIRY: 'package_expiry', // Thông báo gói tập sắp hết hạn
    NEW_PROMOTION: 'new_promotion', // Thông báo khuyến mãi mới
    APPOINTMENT_REMINDER: 'appointment_reminder', // Nhắc nhở lịch hẹn
    SCHEDULE_UPDATE: 'schedule_update', // Cập nhật lịch tập
    PAYMENT_CONFIRMATION: 'payment_confirmation', // Xác nhận thanh toán
  },
  
  // Templates cho notifications
  templates: {
    packageExpiry: {
      title: 'Gói tập sắp hết hạn',
      body: 'Gói tập {{packageName}} của bạn sẽ hết hạn vào ngày {{expiryDate}}. Hãy gia hạn để tiếp tục tận hưởng dịch vụ của chúng tôi!',
      icon: '/images/notification-icon.png',
      badge: '/images/badge-icon.png',
      actions: [
        {
          action: 'renew-package',
          title: 'Gia hạn ngay',
        },
        {
          action: 'view-packages',
          title: 'Xem các gói tập',
        },
      ],
    },
    appointmentReminder: {
      title: 'Nhắc nhở lịch hẹn',
      body: 'Bạn có lịch hẹn với huấn luyện viên {{trainerName}} vào lúc {{time}} ngày {{date}}.',
      icon: '/images/notification-icon.png',
      badge: '/images/badge-icon.png',
      actions: [
        {
          action: 'view-appointment',
          title: 'Xem chi tiết',
        },
        {
          action: 'reschedule',
          title: 'Đổi lịch hẹn',
        },
      ],
    },
    // Thêm các template khác tại đây
  },
  
  // Cấu hình scheduling notifications
  schedulingConfig: {
    packageExpiryNotificationDays: [7, 3, 1], // Gửi thông báo trước 7, 3, 1 ngày
    appointmentReminderHours: [24, 1], // Gửi nhắc nhở trước 24 giờ và 1 giờ
  },
};

export default pushConfig;