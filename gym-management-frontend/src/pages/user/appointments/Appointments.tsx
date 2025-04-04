// # Quản lý lịch hẹn
import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle, 
  XCircle, 
  Clock3, 
  Filter,
  ChevronLeft,
  ChevronRight,
  Search,
  MoreHorizontal
} from 'lucide-react';

// Định nghĩa các interface
interface Trainer {
  id: number;
  name: string;
  image: string;
  specialization: string;
}

interface Appointment {
  id: number;
  trainer: Trainer;
  date: string;
  time: string;
  location: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  notes: string;
}
interface AppointmentStatusProps {
    status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  }

  interface AppointmentCardProps {
    appointment: Appointment;
    onCancel: (id: number) => void;
    onReschedule: (id: number) => void;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Invalid date"; // hoặc xử lý lỗi theo cách bạn muốn
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };
  
  
// Dữ liệu mẫu cho danh sách lịch hẹn
const appointmentsData = [
  {
    id: 1,
    trainer: {
      id: 1,
      name: "Nguyễn Văn Cường",
      image: "/api/placeholder/400/400",
      specialization: "Tăng cơ, Giảm cân"
    },
    date: "2025-04-03",
    time: "17:00 - 18:00",
    location: "Phòng tập chính - Tầng 1",
    status: "confirmed", // confirmed, pending, cancelled, completed
    notes: "Tập trung vào bài tập cơ vai và lưng"
  },
  {
    id: 2,
    trainer: {
      id: 2,
      name: "Trần Thị Minh Tâm",
      image: "/api/placeholder/400/400",
      specialization: "Yoga, Pilates"
    },
    date: "2025-04-05",
    time: "10:00 - 11:00",
    location: "Phòng Yoga & Pilates",
    status: "pending",
    notes: "Buổi học yoga cho người mới bắt đầu"
  },
  {
    id: 3,
    trainer: {
      id: 1,
      name: "Nguyễn Văn Cường",
      image: "/api/placeholder/400/400",
      specialization: "Tăng cơ, Giảm cân"
    },
    date: "2025-04-10",
    time: "18:00 - 19:00",
    location: "Khu vực tự do tập luyện",
    status: "confirmed",
    notes: ""
  },
  {
    id: 4,
    trainer: {
      id: 3,
      name: "Lê Hoàng Phúc",
      image: "/api/placeholder/400/400",
      specialization: "HIIT, CrossFit"
    },
    date: "2025-03-25",
    time: "15:00 - 16:00",
    location: "Khu vực cardio",
    status: "completed",
    notes: "Hoàn thành buổi tập HIIT"
  },
  {
    id: 5,
    trainer: {
      id: 4,
      name: "Phạm Thị Thanh Hà",
      image: "/api/placeholder/400/400",
      specialization: "Dinh dưỡng thể thao, Giảm cân"
    },
    date: "2025-03-27",
    time: "14:00 - 15:00",
    location: "Phòng tư vấn - Tầng 2",
    status: "cancelled",
    notes: "Tư vấn dinh dưỡng"
  }
];

// Component hiển thị trạng thái lịch hẹn
const AppointmentStatus: React.FC<AppointmentStatusProps> = ({ status }) =>{
  const statusConfig = {
    confirmed: {
      icon: <CheckCircle className="mr-1 h-4 w-4 text-green-500" />,
      text: "Đã xác nhận",
      bgColor: "bg-green-50 dark:bg-green-900/30",
      textColor: "text-green-700 dark:text-green-300"
    },
    pending: {
      icon: <Clock3 className="mr-1 h-4 w-4 text-amber-500" />,
      text: "Chờ xác nhận",
      bgColor: "bg-amber-50 dark:bg-amber-900/30",
      textColor: "text-amber-700 dark:text-amber-300"
    },
    cancelled: {
      icon: <XCircle className="mr-1 h-4 w-4 text-red-500" />,
      text: "Đã hủy",
      bgColor: "bg-red-50 dark:bg-red-900/30",
      textColor: "text-red-700 dark:text-red-300"
    },
    completed: {
      icon: <CheckCircle className="mr-1 h-4 w-4 text-blue-500" />,
      text: "Đã hoàn thành",
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
      textColor: "text-blue-700 dark:text-blue-300"
    }
  };

  const config = statusConfig[status];

  return (
    <div className={`flex items-center rounded-full ${config.bgColor} ${config.textColor} px-3 py-1 text-xs font-medium`}>
      {config.icon}
      {config.text}
    </div>
  );
};

// Component AppointmentCard
const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onCancel, onReschedule }) => {
   const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col sm:flex-row">
        <div className="mr-4 mb-4 flex-shrink-0 sm:mb-0">
          <img 
            src={appointment.trainer.image} 
            alt={appointment.trainer.name} 
            className="h-20 w-20 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="mb-2 flex justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">Buổi tập với {appointment.trainer.name}</h3>
            <AppointmentStatus status={appointment.status} />
          </div>
          
          <div className="mb-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{formatDate(appointment.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>{appointment.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{appointment.location}</span>
            </div>
            {appointment.notes && (
              <div className="rounded-md bg-gray-50 p-2 dark:bg-gray-700">
                <p className="text-xs">{appointment.notes}</p>
              </div>
            )}
          </div>
          
          {(appointment.status === 'confirmed' || appointment.status === 'pending') && (
            <div className="mt-2 flex space-x-2">
              <button 
                onClick={() => onReschedule(appointment.id)}
                className="rounded-lg border border-blue-500 px-3 py-1 text-xs font-medium text-blue-500 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30"
              >
                Đổi lịch
              </button>
              <button 
                onClick={() => onCancel(appointment.id)}
                className="rounded-lg border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Hủy lịch
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Component chính
const AppointmentsPage: React.FC = () =>  {
  const [appointments, setAppointments] = useState(appointmentsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const formatDateForSorting = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  // Lọc và tìm kiếm lịch hẹn
  const filteredAppointments = appointments
    .filter(appointment => {
      // Lọc theo trạng thái
      if (filterStatus !== 'all' && appointment.status !== filterStatus) {
        return false;
      }
      
      // Tìm kiếm theo tên huấn luyện viên, địa điểm hoặc ghi chú
      const searchLower = searchTerm.toLowerCase();
      return (
        appointment.trainer.name.toLowerCase().includes(searchLower) ||
        appointment.location.toLowerCase().includes(searchLower) ||
        appointment.notes.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
        // Sắp xếp theo ngày, ưu tiên lịch hẹn sắp tới
        const dateA = formatDateForSorting(a.date).getTime();
        const dateB = formatDateForSorting(b.date).getTime();
        
        const today = new Date().getTime();
        
        // Lịch quá khứ sắp xếp xuống dưới
        if (dateA < today && dateB >= today) return 1;
        if (dateB < today && dateA >= today) return -1;
        
        // Sắp xếp theo thời gian
        return dateA - dateB;
      });
      
  // Tính tổng số trang
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  
  // Phân trang
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Hủy lịch hẹn
  const handleCancel = (appointmentId: number) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy lịch hẹn này không?')) {
      setAppointments(appointments.map(appointment => 
        appointment.id === appointmentId 
        ? { ...appointment, status: 'cancelled' } 
        : appointment
      ));
    }
  };

  const handleReschedule = (id: number) => {
    alert(`Chuyển đến trang đặt lịch lại cho buổi hẹn #${id}`);
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Lịch hẹn của tôi</h1>
      
      {/* Bộ lọc và tìm kiếm */}
      <div className="mb-6 flex flex-col space-y-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên PT, địa điểm..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
            }}
          />
        </div>
        
        <div className="relative flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            className="w-full rounded-lg border border-gray-300 bg-white py-2 px-4 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1); // Reset về trang đầu khi lọc
            }}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="completed">Đã hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
      </div>
      
      {/* Hiển thị lịch hẹn */}
      <div className="space-y-4">
        {paginatedAppointments.length > 0 ? (
          paginatedAppointments.map(appointment => (
            <AppointmentCard 
              key={appointment.id} 
              appointment={ { ...appointment, status: appointment.status as "confirmed" | "pending" | "completed" | "cancelled" } }

              onCancel={handleCancel}
              onReschedule={handleReschedule}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800/50">
            <Calendar className="mb-3 h-12 w-12 text-gray-400" />
            <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">Không tìm thấy lịch hẹn</h3>
            <p className="mb-4 text-gray-500 dark:text-gray-400">
              {searchTerm || filterStatus !== 'all' 
                ? 'Không có lịch hẹn phù hợp với tiêu chí tìm kiếm của bạn.' 
                : 'Bạn chưa có lịch hẹn nào với huấn luyện viên.'}
            </p>
            <button 
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              Đặt lịch hẹn mới
            </button>
          </div>
        )}
      </div>
      
      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center rounded px-3 py-1 ${
              currentPage === 1 
              ? 'cursor-not-allowed text-gray-400' 
              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Trước
          </button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-8 w-8 rounded ${
                  currentPage === page 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`flex items-center rounded px-3 py-1 ${
              currentPage === totalPages 
              ? 'cursor-not-allowed text-gray-400' 
              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Tiếp
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      )}
      
      {/* Thống kê nhanh */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center dark:border-gray-700 dark:bg-gray-800">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            {appointments.filter(a => a.status === 'confirmed').length}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">Đã xác nhận</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center dark:border-gray-700 dark:bg-gray-800">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            {appointments.filter(a => a.status === 'pending').length}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">Chờ xác nhận</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center dark:border-gray-700 dark:bg-gray-800">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            {appointments.filter(a => a.status === 'completed').length}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">Đã hoàn thành</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center dark:border-gray-700 dark:bg-gray-800">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            {appointments.filter(a => a.status === 'cancelled').length}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">Đã hủy</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;