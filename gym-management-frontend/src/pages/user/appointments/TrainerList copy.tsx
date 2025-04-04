import React, { useState, useEffect } from 'react';
import { Search, Clock, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { trainerService } from '~/services/trainerService';
import { Trainer, ISchedule } from '~/types/trainer';

// Định nghĩa kiểu dữ liệu cho props của TrainerCard
interface TrainerCardProps {
  trainer: Trainer;
  onBooking: (trainer: Trainer) => void;
}

// Hàm chuyển đổi lịch làm việc từ ISchedule sang định dạng hiển thị
const formatSchedule = (schedule?: ISchedule[]): ISchedule[] => {
  if (!schedule || schedule.length === 0) return [];
  
  return schedule
    .filter(s => s.available && s.workingHours && s.workingHours.length > 0)
    .sort((a, b) => a.dayOfWeek - b.dayOfWeek); // Sắp xếp theo thứ tự ngày trong tuần
};

// Component hiển thị lịch làm việc
const ScheduleDisplay: React.FC<{ schedule?: ISchedule[] }> = ({ schedule }) => {
  const [expanded, setExpanded] = useState(false);
  const formattedSchedule = formatSchedule(schedule);
  const dayNames = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
  
  if (formattedSchedule.length === 0) {
    return (
      <div className="mt-2 text-gray-500 italic">
        Chưa cập nhật lịch làm việc
      </div>
    );
  }

  // Hiển thị tóm tắt số ngày làm việc trong tuần
  const daysAvailable = formattedSchedule.length;
  
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4 text-blue-600" />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {daysAvailable} ngày trong tuần
          </span>
        </div>
        <button 
          onClick={() => setExpanded(!expanded)}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {expanded ? (
            <>Thu gọn <ChevronUp className="ml-1 h-4 w-4" /></>
          ) : (
            <>Xem chi tiết <ChevronDown className="ml-1 h-4 w-4" /></>
          )}
        </button>
      </div>
      
      {expanded && (
        <div className="mt-3 space-y-2">
          {formattedSchedule.map((day, index) => (
            <div key={index} className="rounded-md bg-gray-50 p-2 dark:bg-gray-700/50">
              <div className="font-medium text-gray-800 dark:text-gray-200">
                {dayNames[day.dayOfWeek]}
              </div>
              <div className="mt-1 flex flex-wrap gap-2">
                {day.workingHours?.map((hours, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                  >
                    <Clock className="mr-1 h-3 w-3" />
                    {hours.start}-{hours.end}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TrainerCard: React.FC<TrainerCardProps> = ({ trainer, onBooking }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col md:flex-row">
        <div className="mb-4 mr-6 flex-shrink-0 md:mb-0">
          <img 
            src={`http://localhost:5000/public/${trainer.image}` || "/api/placeholder/400/400"} 
            alt={trainer.name} 
            className="h-48 w-48 rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{trainer.name}</h3>
          </div>
          
          <div className="mb-3 text-sm">
            {trainer.specialization && (
              <span className="mr-2 rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {trainer.specialization}
              </span>
            )}
            {trainer.experience && (
              <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                {trainer.experience} năm kinh nghiệm
              </span>
            )}
          </div>
          
          <p className="mb-4 text-gray-700 dark:text-gray-300">{trainer.bio || "Chưa có thông tin"}</p>
          
          <div className="mb-4 mt-auto rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/60">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h4 className="font-bold text-gray-900 dark:text-white">Lịch làm việc</h4>
            </div>
            <ScheduleDisplay schedule={trainer.schedule} />
          </div>
          
          <div className="mt-auto flex justify-end space-x-3">
            <button 
              onClick={() => onBooking(trainer)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              Đặt lịch hẹn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrainerList = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  
  // Lấy danh sách chuyên môn duy nhất từ các trainer
  const specializations = Array.from(
    new Set(trainers.map(trainer => trainer.specialization).filter(Boolean))
  );
  
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        const response = await trainerService.getAllTrainers();
        
        if (response.success && response.data) {
          setTrainers(response.data);
        } else {
          setError(response.message || 'Đã xảy ra lỗi khi tải dữ liệu');
        }
      } catch (err) {
        setError('Đã xảy ra lỗi khi kết nối với máy chủ');
        console.error('Error fetching trainers:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrainers();
  }, []);
  
  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = 
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (trainer.bio || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = 
      specialtyFilter === '' || 
      (trainer.specialization || '').toLowerCase().includes(specialtyFilter.toLowerCase());
    
    return matchesSearch && matchesSpecialty;
  });
  
  const handleBooking = (trainer: Trainer) => {
    alert(`Bạn đã chọn đặt lịch với HLV ${trainer.name}`);
    // Chuyển hướng đến trang đặt lịch với ID của HLV
    // window.location.href = `/book-appointment/${trainer._id}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Huấn Luyện Viên</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Lựa chọn huấn luyện viên phù hợp với mục tiêu tập luyện của bạn. Đội ngũ PT chuyên nghiệp sẽ giúp bạn đạt được kết quả tối ưu.
        </p>
      </div>
      
      <div className="mb-6 flex flex-col gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800 md:flex-row">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc mô tả..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-64">
          <select
            className="w-full rounded-lg border border-gray-300 bg-white py-2 px-4 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
          >
            <option value="">Tất cả chuyên môn</option>
            {specializations.map((spec, index) => (
              <option key={index} value={spec as string}>{spec}</option>
            ))}
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-700 dark:border-red-900 dark:bg-red-900/30 dark:text-red-400">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Thử lại
          </button>
        </div>
      ) : filteredTrainers.length > 0 ? (
        <div className="space-y-6">
          {filteredTrainers.map(trainer => (
            <TrainerCard 
              key={trainer._id} 
              trainer={trainer} 
              onBooking={handleBooking} 
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-400">Không tìm thấy huấn luyện viên phù hợp. Vui lòng thử lại với tiêu chí khác.</p>
        </div>
      )}
    </div>
  );
};

export default TrainerList;