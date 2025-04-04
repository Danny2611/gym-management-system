import express from 'express';
import { authenticateJWT } from '../../middlewares/auth';
import { createMoMoPayment, momoIpnCallback, momoRedirectCallback, getPaymentById, getPaymentStatus  } from '../../controllers/user/paymentController';
import {
  getCurrentProfile,
  updateProfile,
  updateAvatar,
  updateEmail,
  getMemberById,
  deactivateAccount
} from '../../controllers/user/memberController';

import {getMemberships, getMembershipById, pauseMembership, resumeMembership, getMembershipsActive} from '../../controllers/user/membershipController'
import { memberUpdateValidationRules } from '../../utils/validators/memberValidator';
import {  registerPackage } from '../../controllers/user/packageController';
import { createAppointment, getMemberAppointments, cancelAppointment, checkTrainerAvailability } from '../../controllers/user/appointmentController';

const router = express.Router();


// Route redirect từ MoMo sau khi thanh toán
router.get('/payment/momo/callback', momoRedirectCallback);
// Route callback từ MoMo (IPN)
router.post('/momo/ipn', momoIpnCallback);
// All these routes require authentication
router.use(authenticateJWT);

// Member profile routes
router.get('/profile', getCurrentProfile);
router.put('/profile', memberUpdateValidationRules(), updateProfile);
router.put('/profile/avatar', updateAvatar);
router.put('/profile/email', updateEmail);
router.post('/deactivate', deactivateAccount);

// membership Routes
router.post('/packages/register', registerPackage);
router.get('/my-package', getMemberships);
router.get('/my-package-active', getMembershipsActive);
router.post('/my-package/detail', getMembershipById);
router.patch('/my-package/pause', pauseMembership);
router.patch('/my-package/resume', resumeMembership);

// Route lịch hẹn
router.post('/appointments', createAppointment); // Tạo lịch hẹn
router.get('/appointments', getMemberAppointments); // Lấy danh sách lịch hẹn của hội viên
router.delete('/appointments/:appointmentId', cancelAppointment); // Hủy lịch hẹn
router.post('/appointments/check-availability', checkTrainerAvailability); // Kiểm tra lịch trống của huấn luyện viên


// Payment routes
// Route tạo thanh toán MoMo
router.post('/momo/create',createMoMoPayment);
// Kiểm tra trạng thái thanh toán (cho frontend polling)
router.get('/payments/:paymentId/status',  getPaymentStatus);
// Route lấy thông tin thanh toán
router.get('/:paymentId',getPaymentById);



export default router;