import React, { useState, useEffect } from "react";
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
import { FiChevronDown } from "react-icons/fi";

// Define interface for member's schedule
interface MemberSchedule {
  id: number;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:MM"
  location: string;
  notes: string;
  package_name: string;
  trainer_name: string | null;
  trainer_id: number | null;
  trainer_image: string | null;
  status: "upcoming" | "completed" | "missed";
}

// Define interface for trainers
interface Trainer {
  id: number;
  name: string;
  image: string | null;
  specialty: string;
}

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

const PersonalSchedulePage: React.FC = () => {
  // Current date and selected date state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [calendarType, setCalendarType] = useState<"week" | "month">("week");
  const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);

  // Filter dropdown states
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showTrainerFilter, setShowTrainerFilter] = useState(false);
  const [showTimeSlotFilter, setShowTimeSlotFilter] = useState(false);

  // Mock trainers data
  const mockTrainers: Trainer[] = [
    {
      id: 1,
      name: "Mike Williams",
      image: "/images/trainers/mike.jpg",
      specialty: "Strength Training",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      image: "/images/trainers/sarah.jpg",
      specialty: "Yoga",
    },
    {
      id: 3,
      name: "David Nguyen",
      image: "/images/trainers/david.jpg",
      specialty: "Cardio & HIIT",
    },
  ];

  // Time slots for filtering
  const timeSlots = [
    "Sáng (6:00-12:00)",
    "Trưa (12:00-15:00)",
    "Chiều (15:00-18:00)",
    "Tối (18:00-22:00)",
  ];

  // Function to determine which time slot a given time belongs to
  const getTimeSlot = (time: string): string => {
    const hour = parseInt(time.split(":")[0]);

    if (hour >= 6 && hour < 12) return "Sáng (6:00-12:00)";
    if (hour >= 12 && hour < 15) return "Trưa (12:00-15:00)";
    if (hour >= 15 && hour < 18) return "Chiều (15:00-18:00)";
    if (hour >= 18 && hour < 22) return "Tối (18:00-22:00)";
    return "Khác";
  };

  // Mock data for demo purposes
  const mockSchedules: MemberSchedule[] = [
    {
      id: 1,
      date: "2025-03-20",
      time: "08:00",
      location: "Phòng Tập Chính - Tầng 2",
      notes: "Tập trung vào cardio và giảm cân. Mang theo nước uống.",
      package_name: "Gói Premium",
      trainer_name: "Mike Williams",
      trainer_id: 1,
      trainer_image: "/images/trainers/mike.jpg",
      status: "upcoming",
    },
    {
      id: 2,
      date: "2025-03-22",
      time: "10:30",
      location: "Phòng Yoga - Tầng 3",
      notes: "Buổi yoga nhẹ nhàng, mang theo thảm yoga cá nhân.",
      package_name: "Gói Premium",
      trainer_name: "Sarah Johnson",
      trainer_id: 2,
      trainer_image: "/images/trainers/sarah.jpg",
      status: "upcoming",
    },
    {
      id: 3,
      date: "2025-03-18",
      time: "18:00",
      location: "Khu vực tạ tự do - Tầng 1",
      notes: "Buổi tập đã hoàn thành. Tập trung vào cơ vai và lưng.",
      package_name: "Gói Premium",
      trainer_name: null,
      trainer_id: null,
      trainer_image: null,
      status: "completed",
    },
    {
      id: 4,
      date: "2025-03-24",
      time: "14:00",
      location: "Phòng HIIT - Tầng 2",
      notes: "Buổi tập HIIT cường độ cao. Mang theo đồ khăn và nước.",
      package_name: "Gói Premium",
      trainer_name: "David Nguyen",
      trainer_id: 3,
      trainer_image: "/images/trainers/david.jpg",
      status: "upcoming",
    },
    {
      id: 5,
      date: "2025-03-27",
      time: "19:30",
      location: "Phòng Tập Chính - Tầng 2",
      notes: "Tập trung vào các bài tập toàn thân.",
      package_name: "Gói Premium",
      trainer_name: "Mike Williams",
      trainer_id: 1,
      trainer_image: "/images/trainers/mike.jpg",
      status: "upcoming",
    },
  ];

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

  // Filter schedules based on selected date, trainer, time slot, and filter option
  const getFilteredSchedules = () => {
    let filteredData = [...mockSchedules];

    // Filter by status if needed
    if (filter !== "all") {
      filteredData = filteredData.filter(
        (schedule) => schedule.status === filter,
      );
    }

    // Filter by trainer if selected
    if (selectedTrainer !== null) {
      filteredData = filteredData.filter(
        (schedule) => schedule.trainer_id === selectedTrainer,
      );
    }

    // Filter by time slot if selected
    if (selectedTimeSlot !== null) {
      filteredData = filteredData.filter(
        (schedule) => getTimeSlot(schedule.time) === selectedTimeSlot,
      );
    }

    // If in calendar view, filter by selected date
    if (viewMode === "calendar") {
      const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
      filteredData = filteredData.filter(
        (schedule) => schedule.date === selectedDateStr,
      );
    }

    return filteredData;
  };

  // Check if a date has schedules
  const hasSchedulesOnDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return mockSchedules.some((schedule) => schedule.date === dateStr);
  };

  // Count schedules on a specific date
  const countSchedulesOnDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return mockSchedules.filter((schedule) => schedule.date === dateStr).length;
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
                  : mockTrainers.find((t) => t.id === selectedTrainer)?.name}
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
                {mockTrainers.map((trainer) => (
                  <button
                    key={trainer.id}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      setSelectedTrainer(trainer.id);
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
                    {mockSchedules
                      .filter((s) => s.date === format(day, "yyyy-MM-dd"))
                      .slice(0, 2)
                      .map((s) => (
                        <div
                          key={s.id}
                          className="mt-1 truncate rounded bg-gray-100 p-1 text-xs dark:bg-gray-700"
                        >
                          {s.time} - {s.package_name}
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
                {hasSchedulesOnDate(day) && isSameMonth(day, currentDate) && (
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
                        src="/api/placeholder/64/64"
                        alt="Huấn luyện viên"
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="text-2xl font-bold">
                        {schedule.time.split(":")[0]}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {schedule.date} - {schedule.time}
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
                      <button className="rounded border border-blue-500 px-3 py-1 text-sm text-blue-500 hover:bg-blue-50">
                        Chi tiết
                      </button>
                      {schedule.status === "upcoming" && (
                        <>
                          <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
                            Đánh dấu hoàn thành
                          </button>
                          <button className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50">
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
          <span className="mr-2">+</span>
          <span>Đặt lịch tập mới</span>
        </button>
      </div>
    </div>
  );
};

export default PersonalSchedulePage;
