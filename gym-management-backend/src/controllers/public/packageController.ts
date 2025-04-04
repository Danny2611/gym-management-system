// src/controller/public/packaController
import { Request, Response } from 'express';
import Package from '../../models/Package';
import PackageDetail from '../../models/PackageDetail';

// Xem danh sách gói tập
export const getPackages = async (req: Request, res: Response): Promise<void> => {
  try {
    const packages = await Package.find({ status: 'active' });
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Xem chi tiết gói tập
export const getPackageById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const packageData = await Package.findById(id);
    if (!packageData) {
      res.status(404).json({ message: 'Không tìm thấy gói tập' });
      return;
    }

    // Tìm chi tiết gói tập
    const packageDetail = await PackageDetail.findOne({ package_id: id });

    // Kết hợp thông tin từ Package và PackageDetail
    const packageWithDetails = {
      ...packageData.toObject(),
      details: packageDetail ? packageDetail.toObject() : null
    };

    res.status(200).json(packageWithDetails);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};