import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  format,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  addMonths,
  isSameDay,
  isSameMonth,
  parseISO,
} from "date-fns";
import { vi } from "date-fns/locale";
import { FiChevronDown, FiLoader } from "react-icons/fi";
import {
  appointmentService,
  MemberScheduleFilters,
   
} from "~/services/appointmentService";
import { trainerService } from "~/services/trainerService";
import { Trainer } from "~/types/trainer";
import { toast } from "react-toastify";
import { Schedule } from "~/types/schedule";

interface FilterButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  children,
  isActive,
  onClick,
}) => (
  <button
    className={`rounded-full px-4 py-2 text-sm ${
      isActive
        ? "bg-blue-600 text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const PersonalSchedulePage1: React.FC = () => {
  // Current date and selected date state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [calendarType, setCalendarType] = useState<"week" | "month">("week");
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);

  // API related states
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter dropdown states
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showTrainerFilter, setShowTrainerFilter] = useState(false);
  const [showTimeSlotFilter, setShowTimeSlotFilter] = useState(false);

  // Time slots for filtering
  const timeSlots = [
    "Sáng (6:00-12:00)",
    "Trưa (12:00-15:00)",
    "Chiều (15:00-18:00)",
    "Tối (18:00-22:00)",
  ];

  // Fetch schedules from API
  const fetchSchedules = async () => {
    setLoading(true);
    setError(null);

    try {
      // Prepare filters
      const filters: MemberScheduleFilters = {};

      // Status filter
      if (filter !== "all") {
        filters.status = filter;
      }

      // Date range for calendar view
      if (viewMode === "calendar") {
        if (calendarType === "week") {
          // For week view, set start and end date of the week
          const startDay = startOfWeek(currentDate, { weekStartsOn: 1 });
          const endDay = addDays(startDay, 6);
          filters.startDate = format(startDay, "yyyy-MM-dd");
          filters.endDate = format(endDay, "yyyy-MM-dd");
        } else {
          // For month view, set start and end date of the month
          const monthStart = startOfMonth(currentDate);
          const monthEnd = endOfMonth(currentDate);
          filters.startDate = format(monthStart, "yyyy-MM-dd");
          filters.endDate = format(monthEnd, "yyyy-MM-dd");
        }
      }

      // Trainer filter
      if (selectedTrainer) {
        filters.trainerId = selectedTrainer;
      }

      // Time slot filter
      if (selectedTimeSlot) {
        filters.timeSlot = selectedTimeSlot;
      }

      const response = await appointmentService.getMemberSchedule(filters);

      if (response.success && response.data) {
        setSchedules(response.data);
      } else {
        setError(response.message || "Đã xảy ra lỗi khi lấy lịch tập");
        toast.error(response.message || "Đã xảy ra lỗi khi lấy lịch tập");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi lấy lịch tập");
      toast.error("Đã xảy ra lỗi khi lấy lịch tập");
    } finally {
      setLoading(false);
    }
  };

  // Fetch trainers from API
  const fetchTrainers = async () => {
    try {
      const response = await trainerService.getAllTrainers();
      if (response.success && response.data) {
        setTrainers(response.data);
      } else {
        console.error("Không thể lấy danh sách huấn luyện viên");
      }
    } catch (err) {
      console.error("Lỗi khi lấy danh sách huấn luyện viên:", err);
    }
  };

  // Initial data loading
  useEffect(() => {
    fetchTrainers();
    fetchSchedules();
  }, []);

  // Refetch when filters or dates change
  useEffect(() => {
    fetchSchedules();
  }, [
    filter,
    selectedTrainer,
    selectedTimeSlot,
    currentDate,
    calendarType,
    viewMode,
  ]);

  // Function to determine which time slot a given time belongs to
  const getTimeSlot = (time: string): string => {
    const hour = parseInt(time.split(":")[0]);

    if (hour >= 6 && hour < 12) return "Sáng (6:00-12:00)";
    if (hour >= 12 && hour < 15) return "Trưa (12:00-15:00)";
    if (hour >= 15 && hour < 18) return "Chiều (15:00-18:00)";
    if (hour >= 18 && hour < 22) return "Tối (18:00-22:00)";
    return "Khác";
  };

  // Toggle view mode and close calendar options when switching to list view
  const handleViewModeChange = (mode: "calendar" | "list") => {
    setViewMode(mode);
    if (mode === "list") {
      setShowCalendarOptions(false);
    }
  };

  // Toggle calendar options dropdown
  const toggleCalendarOptions = () => {
    setShowCalendarOptions(!showCalendarOptions);
  };

  // Generate dates for the week view
  const generateWeekDays = () => {
    const startDay = startOfWeek(currentDate, { weekStartsOn: 1 }); // Week starts on Monday
    const weekDays = [];

    for (let i = 0; i < 7; i++) {
      weekDays.push(addDays(startDay, i));
    }

    return weekDays;
  };

  // Generate dates for month view
  const generateMonthDays = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });

    const days = [];
    let day = startDate;

    while (day <= monthEnd || days.length % 7 !== 0) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  // Filter schedules based on selected date for calendar view
  const getFilteredSchedules = () => {
    if (viewMode === "calendar") {
      const selectedDateStr = format(selectedDate, "yyyy-MM-dd");

      return schedules.filter((schedule) => schedule.date === selectedDateStr);
    }
    return schedules;
  };

  // Check if a date has schedules
  const hasSchedulesOnDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return schedules.some((schedule) => schedule.date === dateStr);
  };

  // Count schedules on a specific date
  const countSchedulesOnDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return schedules.filter((schedule) => schedule.date === dateStr).length;
  };

  // Reset all filters
  const resetFilters = () => {
    setFilter("all");
    setSelectedTrainer(null);
    setSelectedTimeSlot(null);
    setShowStatusFilter(false);
    setShowTrainerFilter(false);
    setShowTimeSlotFilter(false);
  };

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowCalendarOptions(false);
      setShowStatusFilter(false);
      setShowTrainerFilter(false);
      setShowTimeSlotFilter(false);
    };

    // Add listener but with a small delay to prevent immediate closure
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Stop propagation for dropdown clicks to prevent immediate closure
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const weekDays = generateWeekDays();
  const monthDays = generateMonthDays();
  const filteredSchedules = getFilteredSchedules();

  // Mark appointment as completed
  const markAsCompleted = async (appointmentId: string) => {
    // Tạm thời sử dụng thông báo, sau này sẽ thay bằng API call thực
    toast.success("Đã đánh dấu buổi tập là hoàn thành");
    // Sau khi có API để đánh dấu đã hoàn thành, sẽ gọi lại fetchSchedules
  };

  // Navigate to appointment detail page
  const viewAppointmentDetails = (appointmentId: string) => {
    // Sau này sẽ điều hướng đến trang chi tiết lịch hẹn
    console.log(`Xem chi tiết lịch hẹn: ${appointmentId}`);
  };

  // Navigate to reschedule page
  const rescheduleAppointment = (appointmentId: string) => {
    // Sau này sẽ điều hướng đến trang đổi lịch
    console.log(`Đổi lịch hẹn: ${appointmentId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Lịch Tập Cá Nhân
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Quản lý lịch tập của bạn và theo dõi tiến độ tập luyện
        </p>
      </header>

      {/* View toggle section */}
      <div className="relative mb-6">
        <div className="flex space-x-2">
          <div className="relative">
            <button
              className={`flex items-center rounded-lg px-4 py-2 ${viewMode === "calendar" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={(e) => {
                e.stopPropagation();
                handleViewModeChange("calendar");
                toggleCalendarOptions();
              }}
            >
              Dạng lịch
              <FiChevronDown className="ml-1 h-4 w-4" />
            </button>

            {/* Calendar type dropdown */}
            {showCalendarOptions && viewMode === "calendar" && (
              <div
                className="absolute z-10 mt-1 w-32 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                onClick={handleDropdownClick}
              >
                <button
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${calendarType === "week" ? "bg-blue-50 dark:bg-blue-900" : ""}`}
                  onClick={() => {
                    setCalendarType("week");
                    setShowCalendarOptions(false);
                  }}
                >
                  Tuần
                </button>
                <button
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${calendarType === "month" ? "bg-blue-50 dark:bg-blue-900" : ""}`}
                  onClick={() => {
                    setCalendarType("month");
                    setShowCalendarOptions(false);
                  }}
                >
                  Tháng
                </button>
              </div>
            )}
          </div>

          <button
            className={`rounded-lg px-4 py-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => handleViewModeChange("list")}
          >
            Danh sách
          </button>
        </div>
      </div>

      {/* Advanced filters */}
      <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Bộ lọc nâng cao</h3>
          <button
            className="text-sm text-blue-600 hover:text-blue-800"
            onClick={resetFilters}
          >
            Đặt lại bộ lọc
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Status filter */}
          <div className="relative">
            <button
              className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 dark:border-gray-600 dark:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                setShowStatusFilter(!showStatusFilter);
                setShowTrainerFilter(false);
                setShowTimeSlotFilter(false);
              }}
            >
              <span>
                Trạng thái:{" "}
                {filter === "all"
                  ? "Tất cả"
                  : filter === "upcoming"
                    ? "Sắp tới"
                    : filter === "completed"
                      ? "Đã hoàn thành"
                      : "Đã lỡ"}
              </span>
              <FiChevronDown className="h-4 w-4" />
            </button>

            {showStatusFilter && (
              <div
                className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                onClick={handleDropdownClick}
              >
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setFilter("all");
                    setShowStatusFilter(false);
                  }}
                >
                  Tất cả
                </button>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setFilter("upcoming");
                    setShowStatusFilter(false);
                  }}
                >
                  Sắp tới
                </button>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setFilter("completed");
                    setShowStatusFilter(false);
                  }}
                >
                  Đã hoàn thành
                </button>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setFilter("missed");
                    setShowStatusFilter(false);
                  }}
                >
                  Đã lỡ
                </button>
              </div>
            )}
          </div>

          {/* Trainer filter */}
          <div className="relative">
            <button
              className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 dark:border-gray-600 dark:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                setShowTrainerFilter(!showTrainerFilter);
                setShowStatusFilter(false);
                setShowTimeSlotFilter(false);
              }}
            >
              <span>
                Huấn luyện viên:{" "}
                {selectedTrainer === null
                  ? "Tất cả"
                  : trainers.find((t) => t._id === selectedTrainer)?.name ||
                    "Không xác định"}
              </span>
              <FiChevronDown className="h-4 w-4" />
            </button>

            {showTrainerFilter && (
              <div
                className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                onClick={handleDropdownClick}
              >
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setSelectedTrainer(null);
                    setShowTrainerFilter(false);
                  }}
                >
                  Tất cả
                </button>
                {trainers.map((trainer) => (
                  <button
                    key={trainer._id}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      setSelectedTrainer(trainer._id);
                      setShowTrainerFilter(false);
                    }}
                  >
                    {trainer.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Time slot filter */}
          <div className="relative">
            <button
              className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 dark:border-gray-600 dark:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                setShowTimeSlotFilter(!showTimeSlotFilter);
                setShowStatusFilter(false);
                setShowTrainerFilter(false);
              }}
            >
              <span>
                Khung giờ:{" "}
                {selectedTimeSlot === null ? "Tất cả" : selectedTimeSlot}
              </span>
              <FiChevronDown className="h-4 w-4" />
            </button>

            {showTimeSlotFilter && (
              <div
                className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                onClick={handleDropdownClick}
              >
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setSelectedTimeSlot(null);
                    setShowTimeSlotFilter(false);
                  }}
                >
                  Tất cả
                </button>
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      setSelectedTimeSlot(slot);
                      setShowTimeSlotFilter(false);
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="my-8 flex items-center justify-center">
          <FiLoader className="mr-2 animate-spin" />
          <span>Đang tải lịch tập...</span>
        </div>
      )}

      {/* Error message */}
      {error && !loading && (
        <div className="my-8 rounded-lg bg-red-100 p-4 text-red-800">
          <p>{error}</p>
          <button
            className="mt-2 text-sm font-medium text-red-800 underline"
            onClick={fetchSchedules}
          >
            Thử lại
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {viewMode === "calendar" && calendarType === "week" && (
            <div className="mb-8">
              {/* Week navigation */}
              <div className="mb-4 flex items-center justify-between">
                <button
                  className="rounded-lg border border-gray-300 p-2 hover:bg-gray-100"
                  onClick={() => setCurrentDate(addDays(currentDate, -7))}
                >
                  Tuần trước
                </button>
                <h2 className="text-xl font-semibold">
                  {format(weekDays[0], "dd/MM/yyyy", { locale: vi })} -{" "}
                  {format(weekDays[6], "dd/MM/yyyy", { locale: vi })}
                </h2>
                <button
                  className="rounded-lg border border-gray-300 p-2 hover:bg-gray-100"
                  onClick={() => setCurrentDate(addDays(currentDate, 7))}
                >
                  Tuần sau
                </button>
              </div>

              {/* Week day headers */}
              <div className="mb-2 grid grid-cols-7 gap-2">
                {weekDays.map((day) => (
                  <div
                    key={day.toString()}
                    className="py-2 text-center font-medium"
                  >
                    {format(day, "EEEE", { locale: vi })}
                  </div>
                ))}
              </div>

              {/* Date cells */}
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day) => (
                  <div
                    key={day.toString()}
                    className={`min-h-24 cursor-pointer rounded-lg border p-2 ${isSameDay(day, new Date()) ? "border-2 border-blue-500" : "border-gray-200"} ${isSameDay(day, selectedDate) ? "bg-blue-50 dark:bg-blue-900" : ""} ${hasSchedulesOnDate(day) ? "font-bold" : ""} `}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className="mb-1 text-center">{format(day, "dd")}</div>
                    {hasSchedulesOnDate(day) && (
                      <div className="mt-1">
                        <div className="rounded-full bg-blue-600 px-2 py-1 text-center text-xs text-white">
                          {countSchedulesOnDate(day)} buổi tập
                        </div>
                        {schedules
                          .filter((s) => s.date === format(day, "yyyy-MM-dd"))
                          .slice(0, 2)
                          .map((s) => (
                            <div
                              key={s.id}
                              className="mt-1 truncate rounded bg-gray-100 p-1 text-xs dark:bg-gray-700"
                            >
                                {s.date} - {s.package_name}
                            </div>
                          ))}
                        {countSchedulesOnDate(day) > 2 && (
                          <div className="mt-1 text-center text-xs text-gray-500">
                            +{countSchedulesOnDate(day) - 2} khác
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {viewMode === "calendar" && calendarType === "month" && (
            <div className="mb-8">
              {/* Month navigation */}
              <div className="mb-4 flex items-center justify-between">
                <button
                  className="rounded-lg border border-gray-300 p-2 hover:bg-gray-100"
                  onClick={() => setCurrentDate(addMonths(currentDate, -1))}
                >
                  Tháng trước
                </button>
                <h2 className="text-xl font-semibold">
                  {format(currentDate, "MMMM yyyy", { locale: vi })}
                </h2>
                <button
                  className="rounded-lg border border-gray-300 p-2 hover:bg-gray-100"
                  onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                >
                  Tháng sau
                </button>
              </div>

              {/* Week day headers */}
              <div className="mb-2 grid grid-cols-7 gap-2">
                {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
                  <div key={day} className="py-2 text-center font-medium">
                    {day}
                  </div>
                ))}
              </div>
              {/* Date cells */}
              <div className="grid grid-cols-7 gap-2">
                {monthDays.map((day) => (
                  <div
                    key={day.toString()}
                    className={`cursor-pointer rounded-lg border p-2 ${isSameMonth(day, currentDate) ? "min-h-16" : "min-h-12 bg-gray-50 dark:bg-gray-900"} ${isSameDay(day, new Date()) ? "border-2 border-blue-500" : "border-gray-200"} ${isSameDay(day, selectedDate) ? "bg-blue-50 dark:bg-blue-900" : ""} ${!isSameMonth(day, currentDate) ? "text-gray-400" : ""} ${hasSchedulesOnDate(day) ? "font-bold" : ""} `}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className="text-center">{format(day, "dd")}</div>
                    {hasSchedulesOnDate(day) &&
                      isSameMonth(day, currentDate) && (
                        <div
                          className="mx-auto mt-1 h-2 w-2 rounded-full bg-blue-600"
                          title={`${countSchedulesOnDate(day)} buổi tập`}
                        ></div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schedule List */}
          <div className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
            <div className="bg-blue-600 p-4 text-white">
              <h2 className="text-xl font-bold">
                {viewMode === "calendar"
                  ? `Lịch tập ngày ${format(selectedDate, "dd/MM/yyyy", { locale: vi })}`
                  : "Danh sách lịch tập"}
              </h2>
            </div>

            {filteredSchedules.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredSchedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-start">
                      <div
                        className={`mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full ${
                          schedule.status === "upcoming"
                            ? "bg-blue-100 text-blue-600"
                            : schedule.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                        } `}
                      >
                        {schedule.trainer_image ? (
                          <img
                            src={
                              `http://localhost:5000/public/${schedule.trainer_image}` ||
                              "/api/placeholder/400/400"
                            }
                            alt="Huấn luyện viên"
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="text-2xl font-bold">
                            {schedule.time.endTime.split(":")[0]}
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {schedule.date} - {schedule.time.startTime}
                            </span>
                            <h3 className="mt-1 text-lg font-semibold">
                              {schedule.package_name}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300">
                              {schedule.location}
                            </p>
                          </div>
                          <div>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${
                                schedule.status === "upcoming"
                                  ? "bg-blue-100 text-blue-800"
                                  : schedule.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                              } `}
                            >
                              {schedule.status === "upcoming"
                                ? "Sắp tới"
                                : schedule.status === "completed"
                                  ? "Đã hoàn thành"
                                  : "Đã lỡ"}
                            </span>
                          </div>
                        </div>

                        {schedule.trainer_name && (
                          <div className="mt-2 flex items-center">
                            <span className="mr-1 text-sm text-gray-600 dark:text-gray-400">
                              HLV:
                            </span>
                            <span className="font-medium">
                              {schedule.trainer_name}
                            </span>
                          </div>
                        )}

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          {schedule.notes}
                        </p>

                        <div className="mt-3 flex gap-2">
                          <button
                            className="rounded border border-blue-500 px-3 py-1 text-sm text-blue-500 hover:bg-blue-50"
                            onClick={() => viewAppointmentDetails(schedule.id)}
                          >
                            Chi tiết
                          </button>
                          {schedule.status === "upcoming" && (
                            <>
                              <button
                                className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                                onClick={() => markAsCompleted(schedule.id)}
                              >
                                Đánh dấu hoàn thành
                              </button>
                              <button
                                className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50"
                                onClick={() =>
                                  rescheduleAppointment(schedule.id)
                                }
                              >
                                Đổi lịch
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                {viewMode === "calendar"
                  ? `Không có lịch tập nào vào ngày ${format(selectedDate, "dd/MM/yyyy", { locale: vi })}`
                  : "Không có lịch tập nào phù hợp với bộ lọc"}
              </div>
            )}
          </div>

          {/* Add button */}
          <div className="mt-6 flex justify-end">
            <button className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              <Link to={`/user/list-trainer`}>
                <span className="mr-2">+</span>
                <span>Đặt lịch tập mới</span>
              </Link>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default PersonalSchedulePage1;
