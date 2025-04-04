import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Membership, { IMembership } from '../../models/Membership';

interface AuthRequest extends Request {
  userId?: string;
  userRole?: string;
}

/**
 * Lấy danh sách gói tập đã đăng ký của hội viên
 */
export const getMemberships = asyncHandler(async (req: AuthRequest, res: Response) => {
  try {
    const memberId = req.userId;

    if (!memberId) {
      res.status(401).json({
        success: false,
        message: 'Bạn cần đăng nhập để xem thông tin gói tập'
      });
      return;
    }

    // Lấy tất cả các membership của hội viên
    const memberships = await Membership.find({ member_id: memberId })
      .populate('package_id')
      .populate('payment_id')
      .sort({ created_at: -1 });
 
    res.status(200).json({
      success: true,
      count: memberships.length,
      data: memberships
    });
   
  } catch (error) {
    console.error('Lỗi khi lấy danh sách gói tập đã đăng ký:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi xử lý yêu cầu'
    });
  }
});

/**
 * Lấy chi tiết gói tập đã đăng ký
 */
export const getMembershipById = asyncHandler(async (req: AuthRequest, res: Response) => {
  try {
    const { membershipId } = req.body;
    console.log('id cua memberShip',membershipId);
    // Tìm thông tin membership
    const membership = await Membership.findById(membershipId)
      .populate('package_id')
      .populate('payment_id');

    if (!membership) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy thông tin gói tập đã đăng ký'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: membership
    });
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết gói tập đã đăng ký:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi xử lý yêu cầu'
    });
  }
});


// Hàm cập nhật trạng thái membership dựa trên ngày hiện tại
export const updateMembershipStatus = async (membership: IMembership): Promise<IMembership> => {
  const today = new Date();
  let needsUpdate = false;
  
  // Kiểm tra nếu đã hết hạn nhưng trạng thái vẫn là active
  if (membership.end_date && membership.status === 'active') {
    if (today > membership.end_date) {
      membership.status = 'expired';
      needsUpdate = true;
    }
  }
  
  // Nếu đang ở trạng thái pending và ngày bắt đầu đã đến
  if (membership.start_date && membership.status === 'pending') {
    if (today >= membership.start_date) {
      membership.status = 'active';
      needsUpdate = true;
    }
  }
  
  // Lưu lại nếu có thay đổi
  if (needsUpdate) {
    membership.updated_at = today;
    await membership.save();
  }
  
  return membership;
};

/**
 * tạm dừng gói tập ()
 */
export const pauseMembership = asyncHandler(async (req: AuthRequest, res: Response) => {
  try {
    const { membershipId } =  req.body;
    // Tìm thông tin membership
    const membership = await Membership.findById(membershipId);

    if (!membership) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy thông tin gói tập đã đăng ký'
      });
      return;
    }
    // Cập nhật trạng thái
    membership.status = 'paused';
    membership.start_date = null;
    await membership.save();

    res.status(200).json({
      success: true,
      message: 'Đã tạm dừng gói tập thành công',
      data: membership
    });
  } catch (error) {
    console.error('Lỗi khi tạm dừng gói tập:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi xử lý yêu cầu'
    });
  }
});

/**
 * Kích hoạt lại gói tập đã tạm dừng
 */
export const resumeMembership = asyncHandler(async (req: AuthRequest, res: Response) => {
  try {
    const { membershipId } = req.body;
   

    // Tìm thông tin membership
    const membership = await Membership.findById(membershipId);

    if (!membership) {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy thông tin gói tập đã đăng ký'
      });
      return;
    }

    // Kiểm tra xem gói tập có đang trong trạng thái tạm dừng không
    if (membership.status !== 'paused') {
      res.status(400).json({
        success: false,
        message: 'Gói tập này không ở trạng thái tạm dừng'
      });
      return;
    }

    // Cập nhật trạng thái
    membership.status = 'active';
    membership.start_date = new Date();
    await membership.save();

    res.status(200).json({
      success: true,
      message: 'Đã kích hoạt lại gói tập thành công',
      data: membership
    });
  } catch (error) {
    console.error('Lỗi khi kích hoạt lại gói tập:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi xử lý yêu cầu'
    });
  }
});

/**
 * Lấy danh sách gói tập đã đăng ký của hội viên
 */
export const getMembershipsActive = asyncHandler(async (req: AuthRequest, res: Response) => {
  try {
    const memberId = req.userId;

    if (!memberId) {
      res.status(401).json({
        success: false,
        message: 'Bạn cần đăng nhập để xem thông tin gói tập'
      });
      return;
    }

    // Lấy tất cả các membership của hội viên
    const memberships = await Membership.find({ member_id: memberId, status: 'active' })
      .populate('package_id')
      .populate('payment_id')
      .sort({ created_at: -1 });
 
    res.status(200).json({
      success: true,
      count: memberships.length,
      data: memberships
    });
   
  } catch (error) {
    console.error('Lỗi khi lấy danh sách gói tập đã đăng ký:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi xử lý yêu cầu'
    });
  }
});
