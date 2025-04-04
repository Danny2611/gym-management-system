import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Check, AlertCircle } from 'lucide-react';

interface TimeSlot {
  day: string;
  timeSlots: string[];
}

interface Trainer {
  id: number;
  name: string;
  image: string;
  specialization: string;
  experience: number;
  availability: TimeSlot[];
}

interface Location {
  id: number;
  name: string;
  available: boolean;
}

interface DateInfo {
  date: Date;
  dayOfMonth: number;
  monthYear: string;
  dayName: string;
  shortDay: string;
  formattedDate: string;
}

const selectedTrainer: Trainer = {
  id: 1,
  name: "Nguyễn Văn Cường",
  image: "/api/placeholder/400/400",
  specialization: "Tăng cơ, Giảm cân",
  experience: 5,
  availability: [
    { day: "Thứ 2", timeSlots: ["08:00", "10:00", "14:00", "16:00", "18:00"] },
    { day: "Thứ 3", timeSlots: ["09:00", "11:00", "15:00", "17:00", "19:00"] },
    { day: "Thứ 4", timeSlots: ["08:00", "10:00", "14:00", "16:00", "18:00"] },
    { day: "Thứ 5", timeSlots: ["09:00", "11:00", "15:00", "17:00", "19:00"] },
    { day: "Thứ 6", timeSlots: ["08:00", "10:00", "14:00", "16:00", "18:00"] },
    { day: "Thứ 7", timeSlots: ["09:00", "11:00", "15:00"] },
  ]
};

const locations: Location[] = [
  { id: 1, name: "Phòng tập chính - Tầng 1", available: true },
  { id: 2, name: "Khu vực tự do tập luyện", available: true },
  { id: 3, name: "Phòng Yoga & Pilates", available: true },
  { id: 4, name: "Khu vực cardio", available: true },
  { id: 5, name: "Phòng tập riêng VIP", available: false }
];

const generateDates = (): DateInfo[] => {
  const dates: DateInfo[] = [];
  const today = new Date();
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dayName = date.toLocaleDateString('vi-VN', { weekday: 'long' });
    const shortDay = dayName.replace("Thứ ", "T");
    
    dates.push({
      date,
      dayOfMonth: date.getDate(),
      monthYear: date.toLocaleDateString('vi-VN', { month: 'numeric', year: 'numeric' }),
      dayName,
      shortDay,
      formattedDate: date.toLocaleDateString('vi-VN')
    });
  }
  
  return dates;
};

const BookingPage: React.FC = () => {
  const dates = generateDates();
  
  const [selectedDate, setSelectedDate] = useState<DateInfo>(dates[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [bookingStatus, setBookingStatus] = useState<{ success: boolean; message: string } | null>(null);
  
  const handleDateSelect = (date: DateInfo) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };
  
  const getAvailableTimesForSelectedDate = (): string[] => {
    const dayOfWeek = selectedDate.dayName;
    const availabilityForDay = selectedTrainer.availability.find(a => a.day === dayOfWeek);
    return availabilityForDay ? availabilityForDay.timeSlots : [];
  };
  
  const handleSubmitBooking = () => {
    if (!selectedDate || !selectedTime || !selectedLocation) {
      setBookingStatus({
        success: false,
        message: 'Vui lòng chọn đầy đủ ngày, giờ và địa điểm trước khi đặt lịch.'
      });
      return;
    }
    
    setTimeout(() => {
      setBookingStatus({
        success: true,
        message: 'Đặt lịch hẹn thành công! Lịch hẹn của bạn sẽ được xác nhận trong vòng 24 giờ.'
      });
    }, 1000);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Đặt lịch hẹn với Huấn luyện viên</h1>
      
      {/* Trainer Info */}
      <div className="mb-8 flex items-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <img 
          src={selectedTrainer.image} 
          alt={selectedTrainer.name} 
          className="mr-4 h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedTrainer.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {selectedTrainer.specialization} • {selectedTrainer.experience} năm kinh nghiệm
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Date & Time Selection */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            {/* Date Selection */}
            <div className="mb-6">
              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                <Calendar className="mr-2 h-5 w-5" />
                Chọn ngày
              </h3>
              
              <div className="flex flex-nowrap overflow-x-auto pb-2">
                {dates.map((date, index) => (
                  <div 
                    key={index}
                    onClick={() => handleDateSelect(date)}
                    className={`mr-2 flex min-w-16 cursor-pointer flex-col items-center rounded-lg border p-2 ${
                      selectedDate === date 
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300' 
                      : 'border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-xs font-medium">{date.shortDay}</span>
                    <span className="my-1 text-lg font-bold">{date.dayOfMonth}</span>
                    <span className="text-xs">{date.monthYear}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Time Selection */}
            <div className="mb-6">
              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                <Clock className="mr-2 h-5 w-5" />
                Chọn giờ
              </h3>
              
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                {getAvailableTimesForSelectedDate().length > 0 ? (
                  getAvailableTimesForSelectedDate().map((time, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedTime(time)}
                      className={`flex cursor-pointer items-center justify-center rounded-lg border px-4 py-2 text-center ${
                        selectedTime === time
                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
                      }`}
                    >
                      {time}
                    </div>
                  ))
                ) : (
                  <div className="col-span-full rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-center text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                    Không có lịch trống vào ngày đã chọn. Vui lòng chọn ngày khác.
                  </div>
                )}
              </div>
            </div>
            
            {/* Location Selection */}
            <div className="mb-6">
              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                <MapPin className="mr-2 h-5 w-5" />
                Chọn địa điểm
              </h3>
              
              <div className="space-y-2">
                {locations.map(location => (
                  <div
                    key={location.id}
                    onClick={() => location.available && setSelectedLocation(location)}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 ${
                      !location.available 
                      ? 'cursor-not-allowed border-gray-200 bg-gray-100 opacity-60 dark:border-gray-700 dark:bg-gray-800/50' 
                      : selectedLocation?.id === location.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="font-medium">{location.name}</span>
                    {!location.available && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">Không khả dụng</span>
                    )}
                    {selectedLocation?.id === location.id && (
                      <Check className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Booking Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 border-b border-gray-200 pb-2 text-lg font-semibold text-gray-900 dark:border-gray-700 dark:text-white">Thông tin lịch hẹn</h3>
            
            <div className="mb-4 space-y-3">
              <div className="flex items-start">
                <Calendar className="mr-3 h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Ngày:</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedDate ? selectedDate.formattedDate : 'Chưa chọn'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="mr-3 h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Giờ:</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedTime ? selectedTime : 'Chưa chọn'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Địa điểm:</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedLocation ? selectedLocation.name : 'Chưa chọn'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Ghi chú cho buổi tập (tùy chọn):
              </label>
              <textarea
                className="w-full rounded-lg border border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                rows={3}
                placeholder="Ví dụ: mục tiêu, vùng cơ cần tập trung, yêu cầu đặc biệt..."
                value={bookingNotes}
                onChange={(e) => setBookingNotes(e.target.value)}
              ></textarea>
            </div>
            
            {bookingStatus && (
              <div className={`mb-4 rounded-lg p-4 ${
                bookingStatus.success 
                ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              }`}>
                <div className="flex items-center">
                  {bookingStatus.success ? (
                    <Check className="mr-2 h-5 w-5" />
                  ) : (
                    <AlertCircle className="mr-2 h-5 w-5" />
                  )}
                  {bookingStatus.message}
                </div>
              </div>
            )}
            
            <button
              onClick={handleSubmitBooking}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              Xác nhận đặt lịch
            </button>
            
            <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
              Bạn có thể hủy lịch hẹn miễn phí trong vòng 24 giờ trước buổi tập.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;