// import { Request, Response, NextFunction } from 'express';
// import { validationResult, ValidationChain } from 'express-validator';

// // Middleware validate
// export const validate = (validations: ValidationChain[]) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     // Chạy tất cả validation
//     await Promise.all(validations.map(validation => validation.run(req)));
    
//     // Kiểm tra kết quả
//     const errors = validationResult(req);
//     if (errors.isEmpty()) {
//       return next(); // Trả về void
//     }
    
//     // Trả về lỗi nếu validation thất bại
//     res.status(400).json({
//       success: false,
//       message: 'Dữ liệu không hợp lệ',
//       errors: errors.array()
//     });
//     return; // Đảm bảo không có code chạy sau khi gửi response
//   };
// };

import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    
    next();
  };
};