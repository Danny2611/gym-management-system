// # Các route công khai
// src/routes/api/publicRoutes.ts
import express from 'express';
import {
  getPackages,
  getPackageById
} from '../../controllers/public/packageController';

import { getTrainers, getTrainerById } from '../../controllers/public/trainerController';

const router = express.Router();

// 1. Routes cho Package (public - không cần auth)
router.get('/packages', getPackages); // Danh sách gói tập
router.get('/packages/:id', getPackageById); // Chi tiết gói tập

// 2. Route cho Trainer
router.get('/trainers', getTrainers); // Danh sách huấn luyện viên
router.get('/trainers/:trainerId', getTrainerById);

export default router;