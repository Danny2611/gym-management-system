import PackageDetail from '../models/PackageDetail';
import Package from '../models/Package';

const seedPackageDetails = async () => {
  try {
    // Xóa dữ liệu cũ
    await PackageDetail.deleteMany({});
    console.log('Đã xóa dữ liệu PackageDetails cũ');

    // Lấy danh sách packages để lấy ID
    const packages = await Package.find();

    // Dữ liệu chi tiết cho từng gói
    const packageDetails = [
      {
        package_id: packages.find(p => p.name === 'Gói Cơ Bản')?._id,
        schedule: [
          "Giờ tập: 8:00 - 22:00 các ngày trong tuần",
          "Đăng ký và bắt đầu tập tại quầy lễ tân",
          "Thời gian tập theo giờ hoạt động của phòng tập"
        ],
        training_areas: [
          "Khu vực tập tạ cơ bản",
          "Phòng tập cardio",
          "Khu vực tập nhóm nhỏ"
        ],
        additional_services: [
          "Tủ đồ chung",
          "Phòng thay đồ",
          "Nước uống miễn phí",
          "Wifi miễn phí"
        ],
        status: 'active',
        created_at: new Date('2024-01-01')
      },
      {
        package_id: packages.find(p => p.name === 'Gói Premium')?._id,
        schedule: [
          "Giờ tập: 24/7",
          "Đăng ký và bắt đầu tập ngay khi đến",
          "Không giới hạn thời gian tập"
        ],
        training_areas: [
          "Khu vực tập tạ",
          "Phòng tập cardio",
          "Khu vực tập nhóm",
          "Phòng tập yoga",
          "Khu vực VIP"
        ],
        additional_services: [
          "Tủ đồ cá nhân",
          "Phòng thay đồ hiện đại",
          "Nước uống miễn phí",
          "Wifi tốc độ cao",
          "Chỗ đỗ xe rộng rãi"
        ],
        status: 'active',
        created_at: new Date('2024-01-15')
      },
      {
        package_id: packages.find(p => p.name === 'Gói Platinum')?._id,
        schedule: [
          "Giờ tập: 24/7",
          "Ưu tiên đặt lịch các lớp học",
          "Hỗ trợ PT 24/7"
        ],
        training_areas: [
          "Khu vực tập tạ VIP",
          "Phòng tập cardio cao cấp",
          "Khu vực tập nhóm chuyên sâu",
          "Phòng tập yoga",
          "Khu vực VIP đặc biệt",
          "Khu vực spa"
        ],
        additional_services: [
          "Tủ đồ VIP riêng",
          "Phòng thay đồ cao cấp",
          "Nước uống đẳng cấp",
          "Wifi tốc độ cao",
          "Chỗ đỗ xe VIP",
          "Dịch vụ spa",
          "Máy chăm sóc cá nhân"
        ],
        status: 'active',
        created_at: new Date('2024-02-01')
      },
      {
        package_id: packages.find(p => p.name === 'Gói Fitness')?._id,
        schedule: [
          "Giờ tập: 6:00 - 23:00 các ngày trong tuần",
          "Đăng ký lớp học cardio",
          "Theo dõi tiến trình giảm cân"
        ],
        training_areas: [
          "Khu vực cardio",
          "Phòng tập nhóm cardio",
          "Khu vực theo dõi chỉ số"
        ],
        additional_services: [
          "Tủ đồ chung",
          "Phòng thay đồ",
          "Nước uống miễn phí",
          "Wifi miễn phí",
          "Máy đo chỉ số cơ thể"
        ],
        status: 'active',
        created_at: new Date('2024-02-15')
      },
      {
        package_id: packages.find(p => p.name === 'Gói Yoga & Mindfulness')?._id,
        schedule: [
          "Giờ tập: 6:00 - 22:00 các ngày trong tuần",
          "Đăng ký các lớp yoga và thiền",
          "Không giới hạn số lượng lớp học"
        ],
        training_areas: [
          "Phòng tập yoga",
          "Khu vực thiền",
          "Phòng trị liệu tâm lý"
        ],
        additional_services: [
          "Tủ đồ chung",
          "Phòng thay đồ yên tĩnh",
          "Nước uống thuần chay",
          "Wifi yên tĩnh",
          "Không gian thư giãn"
        ],
        status: 'active',
        created_at: new Date('2024-03-01')
      }
    ];

    // Thêm dữ liệu vào database
    await PackageDetail.insertMany(packageDetails);
    console.log('Đã thêm 5 chi tiết gói tập mẫu thành công');
  } catch (error) {
    console.error('Lỗi khi seed dữ liệu PackageDetail:', error);
  }
};

export default seedPackageDetails;