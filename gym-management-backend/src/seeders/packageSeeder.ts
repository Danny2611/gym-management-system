import Package from '../models/Package';

const seedPackages = async () => {
  try {
    // Xóa dữ liệu cũ
    await Package.deleteMany({});
    console.log('Đã xóa dữ liệu Packages cũ');

    // Dữ liệu gói tập
    const packages = [
      {
        name: 'Gói Cơ Bản',
        max_members: 100,
        price: 990000,
        duration: 30,
        description: 'Phù hợp cho người mới bắt đầu tập luyện, bao gồm các trang thiết bị cơ bản và lớp học nhóm.',
        benefits: [
          'Sử dụng tất cả trang thiết bị cơ bản',
          'Tham gia lớp học nhóm (3 buổi/tháng)', 
          'Tư vấn dinh dưỡng cơ bản',
          'Giờ tập: 8:00 - 22:00 các ngày trong tuần'
        ],
        status: 'active',
        category: 'basic',
        training_sessions: 0,
        session_duration: 60,
        created_at: new Date('2024-01-01')
      },
      {
        name: 'Gói Premium',
        max_members: 80,
        price: 1890000,
        duration: 90,
        description: 'Gói tập đầy đủ với các đặc quyền cao cấp, phù hợp cho người đã có kinh nghiệm tập luyện.',
        benefits: [
          'Sử dụng tất cả trang thiết bị và khu vực VIP',
          'Tham gia không giới hạn lớp học nhóm',
          '2 buổi tập cùng PT mỗi tháng', 
          'Đánh giá thể chất định kỳ',
          'Tư vấn dinh dưỡng cá nhân hóa',
          'Giờ tập: 24/7'
        ],
        status: 'active',
        category: 'premium',
        popular: true,
        training_sessions: 2,
        session_duration: 60,
        created_at: new Date('2024-01-15')
      },
      {
        name: 'Gói Platinum',
        max_members: 50,
        price: 2990000,
        duration: 180,
        description: 'Gói tập cao cấp nhất với đầy đủ dịch vụ VIP, phù hợp cho người muốn đạt hiệu quả tập luyện tối đa.',
        benefits: [
          'Sử dụng tất cả trang thiết bị và khu vực VIP',
          'Tham gia không giới hạn lớp học nhóm',
          '4 buổi tập cùng PT mỗi tháng',
          'Đánh giá thể chất hàng tuần', 
          'Kế hoạch dinh dưỡng cá nhân hóa',
          'Ưu tiên đặt lịch các lớp học đặc biệt',
          'Sử dụng spa (1 lần/tháng)',
          'Giờ tập: 24/7'
        ],
        status: 'active',
        category: 'platinum',
        training_sessions: 4,
        session_duration: 75,
        created_at: new Date('2024-02-01')
      },
      {
        name: 'Gói Fitness',
        max_members: 90,
        price: 1490000,
        duration: 60,
        description: 'Tập trung vào các bài tập cardio và giảm cân, phù hợp cho người muốn cải thiện sức khỏe tim mạch.',
        benefits: [
          'Sử dụng tất cả trang thiết bị cardio',
          'Tham gia các lớp học nhóm cardio không giới hạn',
          'Đánh giá đốt calo hàng tuần',
          'Tư vấn kế hoạch giảm cân',
          'Giờ tập: 6:00 - 23:00 các ngày trong tuần'
        ],
        status: 'active',
        category: 'specialized',
        training_sessions: 1,
        session_duration: 60,
        created_at: new Date('2024-02-15')
      },
      {
        name: 'Gói Yoga & Mindfulness',
        max_members: 70,
        price: 1290000,
        duration: 60,
        description: 'Tập trung vào sức khỏe tinh thần và thể chất thông qua yoga và thiền, phù hợp cho người muốn giảm stress.',
        benefits: [
          'Tham gia không giới hạn các lớp yoga và thiền',
          'Sử dụng phòng thiền riêng',
          '2 buổi trị liệu tâm lý mỗi tháng',
          'Tư vấn dinh dưỡng lành mạnh',
          'Giờ tập: 6:00 - 22:00 các ngày trong tuần'
        ],
        status: 'active',
        category: 'specialized',
        training_sessions: 0,
        session_duration: 45,
        created_at: new Date('2024-03-01')
      }
    ];

    // Thêm dữ liệu vào database
    await Package.insertMany(packages);
    console.log('Đã thêm 5 gói tập mẫu thành công');
  } catch (error) {
    console.error('Lỗi khi seed dữ liệu Package:', error);
  }
};

export default seedPackages;
