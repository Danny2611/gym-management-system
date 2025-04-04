import Promotion from '../models/Promotion';

const seedPromotions = async () => {
  try {
    // Xóa dữ liệu cũ
    await Promotion.deleteMany({});
    console.log('Đã xóa dữ liệu Promotions cũ');

    // Dữ liệu khuyến mãi mẫu
    const promotions = [
      {
        name: 'Khuyến mãi Tết 2024',
        description: 'Giảm giá 20% cho tất cả các gói tập nhân dịp Tết Nguyên Đán',
        discount: 20, // Phần trăm
        start_date: new Date('2024-01-15'),
        end_date: new Date('2024-02-15'),
        created_at: new Date('2024-01-10')
      },
      {
        name: 'Ưu đãi Mùa hè',
        description: 'Đăng ký gói 3 tháng trở lên được tặng 1 tháng tập miễn phí',
        discount: 25,
        start_date: new Date('2024-05-01'),
        end_date: new Date('2024-06-30'),
        created_at: new Date('2024-04-20')
      },
      {
        name: 'Đăng ký nhóm',
        description: 'Đăng ký 3 người trở lên sẽ được giảm 15% tổng hóa đơn',
        discount: 15,
        start_date: new Date('2024-03-01'),
        end_date: new Date('2024-12-31'),
        created_at: new Date('2024-02-25')
      },
      {
        name: 'Flash Sale Cuối tuần',
        description: 'Giảm giá sốc 30% cho đăng ký mới vào các ngày cuối tuần',
        discount: 30,
        start_date: new Date('2024-03-09'),
        end_date: new Date('2024-03-31'),
        created_at: new Date('2024-03-05')
      },
      {
        name: 'Sinh nhật phòng gym',
        description: 'Kỷ niệm 5 năm thành lập, giảm 25% tất cả các gói và tặng áo phông cho 50 đăng ký đầu tiên',
        discount: 25,
        start_date: new Date('2024-04-10'),
        end_date: new Date('2024-04-20'),
        created_at: new Date('2024-03-25')
      }
    ];

    // Thêm dữ liệu vào database
    await Promotion.insertMany(promotions);
    console.log('Đã thêm 5 khuyến mãi mẫu thành công');
  } catch (error) {
    console.error('Lỗi khi seed dữ liệu Promotion:', error);
  }
};

export default seedPromotions;