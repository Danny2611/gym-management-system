import React, { useState } from 'react';
import { ChevronLeft, Star, Calendar, Users, Clock, CheckCircle } from 'lucide-react';

interface PackageDetail {
  id: number;
  name: string;
  price: number;
  duration: number;
  max_members: number;
  description: string;
  benefits: string[];
  schedule: string[];
  trainingAreas: string[];
  additionalServices: string[];
}

const PackageDetailPage: React.FC = () => {
  // Sample package detail data
  const packageDetail: PackageDetail = {
    id: 2,
    name: "Gói Premium",
    price: 1890000,
    duration: 90,
    max_members: 80,
    description: "Gói tập đầy đủ với các đặc quyền cao cấp, phù hợp cho người đã có kinh nghiệm tập luyện.",
    benefits: [
      "Sử dụng tất cả trang thiết bị và khu vực VIP",
      "Tham gia không giới hạn lớp học nhóm",
      "2 buổi tập cùng PT mỗi tháng",
      "Đánh giá thể chất định kỳ",
      "Tư vấn dinh dưỡng cá nhân hóa",
    ],
    schedule: [
      "Giờ tập: 24/7",
      "Đăng ký và bắt đầu tập ngay khi đến",
      "Không giới hạn thời gian tập",
    ],
    trainingAreas: [
      "Khu vực tập tạ",
      "Phòng tập cardio",
      "Khu vực tập nhóm",
      "Phòng tập yoga",
      "Khu vực VIP",
    ],
    additionalServices: [
      "Tủ đồ cá nhân",
      "Phòng thay đồ hiện đại",
      "Nước uống miễn phí",
      "Wifi tốc độ cao",
      "Chỗ đỗ xe rộng rãi",
    ]
  };

  const [activeSection, setActiveSection] = useState<'benefits' | 'schedule' | 'areas'>('benefits');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <button className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
          <ChevronLeft className="mr-2" />
          Quay lại danh sách gói tập
        </button>
        <div className="flex items-center space-x-2">
          <Star className="text-yellow-500" fill="currentColor" />
          <span className="font-medium text-gray-700 dark:text-gray-300">Gói được đề xuất</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column - Package Overview */}
        <div>
          <div className="mb-6 rounded-lg bg-blue-600 p-6 text-white">
            <h1 className="text-2xl font-bold">{packageDetail.name}</h1>
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center">
                <Calendar className="mr-2" />
                <span>{packageDetail.duration} ngày</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2" />
                <span>Tối đa {packageDetail.max_members} thành viên</span>
              </div>
            </div>
          </div>

          {/* Price and Description */}
          <div className="mb-6">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(packageDetail.price)}
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {packageDetail.description}
            </p>
          </div>

          {/* Section Tabs */}
          <div className="mb-6 flex space-x-4 border-b pb-2">
            <button 
              className={`pb-2 ${activeSection === 'benefits' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveSection('benefits')}
            >
              Quyền lợi
            </button>
            <button 
              className={`pb-2 ${activeSection === 'schedule' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveSection('schedule')}
            >
              Lịch tập
            </button>
            <button 
              className={`pb-2 ${activeSection === 'areas' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveSection('areas')}
            >
              Khu vực tập
            </button>
          </div>

          {/* Conditional Content Sections */}
          {activeSection === 'benefits' && (
            <div>
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Các quyền lợi bạn sẽ nhận được</h3>
              <ul className="space-y-3">
                {packageDetail.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="mr-3 text-green-500" size={20} />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeSection === 'schedule' && (
            <div>
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Thông tin lịch tập</h3>
              <ul className="space-y-3">
                {packageDetail.schedule.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Clock className="mr-3 text-blue-500" size={20} />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeSection === 'areas' && (
            <div>
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Các khu vực tập</h3>
              <div className="grid grid-cols-2 gap-3">
                {packageDetail.trainingAreas.map((area, index) => (
                  <div 
                    key={index} 
                    className="rounded-lg bg-gray-100 p-3 text-center text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {area}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Additional Services & Registration */}
        <div>
          <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Dịch vụ bổ sung</h3>
            <ul className="space-y-3">
              {packageDetail.additionalServices.map((service, index) => (
                <li 
                  key={index} 
                  className="flex items-center text-gray-600 dark:text-gray-400"
                >
                  <CheckCircle className="mr-3 text-blue-500" size={20} />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <button className="w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-blue-700">
              Đăng ký gói tập ngay
            </button>
            <button className="mt-4 w-full rounded-lg border border-blue-600 px-6 py-3 text-lg font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400">
              Đặt lịch tư vấn
            </button>
          </div>

          <div className="mt-8 rounded-lg bg-blue-50 p-6 text-center dark:bg-blue-900/30">
            <h4 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">Ưu đãi đặc biệt</h4>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Giảm 20% cho đăng ký trong tháng 3/2025. Sử dụng mã: SPRING2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailPage;