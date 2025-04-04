// # Quản lý các gói tập
import React, { useState } from "react";
import {
  FiClock,
  FiCalendar,
  FiCheck,
  FiX,
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";

// Định nghĩa kiểu dữ liệu
interface Membership {
  id: number;
  package_id: number;
  member_id: number;
  start_date: string;
  end_date: string;
  auto_renew: boolean;
  status: "active" | "expired" | "pending" | "paused";
  remaining_days: number;
  remaining_percent: number;
  payment_id: number;
}

interface Package {
  id: number;
  name: string;
  price: number;
  duration: number;
  max_members: number;
  description: string;
  benefits: string[];
}

interface Payment {
  id: number;
  member_id: number;
  package_id: number;
  method: string;
  amount: number;
  payment_date: string;
  status: string;
}

// Component hiển thị thanh tiến trình
interface ProgressBarProps {
  percent: number;
  remainingDays: number;
  status: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percent,
  remainingDays,
  status,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return remainingDays < 7 ? "bg-orange-500" : "bg-green-500";
      case "expired":
        return "bg-red-500";
      case "paused":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="mt-2">
      <div className="mb-1 flex justify-between">
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
          {status === "active"
            ? `Còn ${remainingDays} ngày`
            : status === "expired"
              ? "Đã hết hạn"
              : status === "paused"
                ? "Tạm dừng"
                : "Đang xử lý"}
        </span>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
          {status === "active" ? `${percent}%` : ""}
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-2.5 rounded-full ${getStatusColor()}`}
          style={{ width: `${Math.max(percent, 3)}%` }}
        ></div>
      </div>
    </div>
  );
};

// Component hiển thị thẻ gói tập
interface MembershipCardProps {
  membership: Membership;
  packageInfo: Package;
  payment: Payment;
  onRenew: (id: number) => void;
  onPause: (id: number) => void;
  onResume: (id: number) => void;
  onViewDetails: (id: number) => void;
}

const MembershipCard: React.FC<MembershipCardProps> = ({
  membership,
  packageInfo,
  payment,
  onRenew,
  onPause,
  onResume,
  onViewDetails,
}) => {
  const startDate = new Date(membership.start_date);
  const endDate = new Date(membership.end_date);
  const paymentDate = new Date(payment.payment_date);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusBadge = () => {
    switch (membership.status) {
      case "active":
        return (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
            Đang hoạt động
          </span>
        );
      case "expired":
        return (
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
            Đã hết hạn
          </span>
        );
      case "pending":
        return (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Đang xử lý
          </span>
        );
      case "paused":
        return (
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            Tạm dừng
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {packageInfo.name}
          </h3>
          {getStatusBadge()}
        </div>
      </div>

      <div className="p-4">
        <ProgressBar
          percent={membership.remaining_percent}
          remainingDays={membership.remaining_days}
          status={membership.status}
        />

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Ngày bắt đầu</p>
            <p className="flex items-center font-medium text-gray-900 dark:text-white">
              <FiCalendar className="mr-1 text-blue-500" />
              {formatDate(startDate)}
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Ngày kết thúc</p>
            <p className="flex items-center font-medium text-gray-900 dark:text-white">
              <FiClock className="mr-1 text-blue-500" />
              {formatDate(endDate)}
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Thanh toán</p>
            <p className="flex items-center font-medium text-gray-900 dark:text-white">
              {payment.status === "success" ? (
                <FiCheck className="mr-1 text-green-500" />
              ) : (
                <FiAlertCircle className="mr-1 text-yellow-500" />
              )}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(payment.amount)}
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Tự động gia hạn</p>
            <p className="flex items-center font-medium text-gray-900 dark:text-white">
              {membership.auto_renew ? (
                <FiCheck className="mr-1 text-green-500" />
              ) : (
                <FiX className="mr-1 text-red-500" />
              )}
              {membership.auto_renew ? "Có" : "Không"}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => onViewDetails(membership.id)}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Xem chi tiết
          </button>

          {membership.status === "active" && (
            <button
              onClick={() => onPause(membership.id)}
              className="rounded-md border border-yellow-300 bg-yellow-50 px-3 py-1.5 text-xs font-medium text-yellow-700 transition-colors hover:bg-yellow-100 dark:border-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 dark:hover:bg-yellow-900/50"
            >
              Tạm dừng
            </button>
          )}

          {membership.status === "paused" && (
            <button
              onClick={() => onResume(membership.id)}
              className="rounded-md border border-green-300 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-100 dark:border-green-700 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
            >
              Tiếp tục
            </button>
          )}

          {(membership.status === "expired" ||
            (membership.status === "active" &&
              membership.remaining_days < 15)) && (
            <button
              onClick={() => onRenew(membership.id)}
              className="rounded-md border border-blue-500 bg-blue-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-600 dark:border-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Gia hạn
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Component xem chi tiết gói tập
interface MembershipDetailsModalProps {
  membership: Membership | null;
  packageInfo: Package | null;
  payment: Payment | null;
  isOpen: boolean;
  onClose: () => void;
}

const MembershipDetailsModal: React.FC<MembershipDetailsModalProps> = ({
  membership,
  packageInfo,
  payment,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !membership || !packageInfo || !payment) return null;

  const startDate = new Date(membership.start_date);
  const endDate = new Date(membership.end_date);
  const paymentDate = new Date(payment.payment_date);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Chi tiết gói tập
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            {packageInfo.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {packageInfo.description}
          </p>

          <div className="mt-4">
            <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
              Quyền lợi:
            </h4>
            <ul className="ml-5 list-disc space-y-1 text-gray-600 dark:text-gray-400">
              {packageInfo.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
          <h4 className="mb-3 font-medium text-gray-900 dark:text-white">
            Thông tin đăng ký
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Ngày bắt đầu</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatDate(startDate)}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Ngày kết thúc</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatDate(endDate)}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Trạng thái</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {membership.status === "active"
                  ? "Đang hoạt động"
                  : membership.status === "expired"
                    ? "Đã hết hạn"
                    : membership.status === "paused"
                      ? "Tạm dừng"
                      : "Đang xử lý"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">
                Tự động gia hạn
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {membership.auto_renew ? "Có" : "Không"}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
          <h4 className="mb-3 font-medium text-gray-900 dark:text-white">
            Thông tin thanh toán
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Số tiền</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(payment.amount)}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Phương thức</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {payment.method}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">
                Ngày thanh toán
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatDate(paymentDate)}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">
                Trạng thái thanh toán
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {payment.status === "success"
                  ? "Thành công"
                  : payment.status === "pending"
                    ? "Đang xử lý"
                    : payment.status === "failed"
                      ? "Thất bại"
                      : payment.status}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Đóng
          </button>
          {membership.status === "active" || membership.status === "expired" ? (
            <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              {membership.status === "expired" ? "Gia hạn" : "Tạm dừng"}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

// Component chính trang gói tập đã đăng ký
const MyPackagesPage1: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "active" | "expired" | "pending"
  >("all");
  const [selectedMembership, setSelectedMembership] =
    useState<Membership | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dữ liệu mẫu dựa trên cấu trúc CSDL của bạn
  const membershipData: Membership[] = [
    {
      id: 1,
      package_id: 2,
      member_id: 1,
      start_date: "2025-01-15",
      end_date: "2025-04-15",
      auto_renew: true,
      status: "active",
      remaining_days: 28,
      remaining_percent: 31,
      payment_id: 101,
    },
    {
      id: 2,
      package_id: 4,
      member_id: 1,
      start_date: "2024-11-10",
      end_date: "2025-01-10",
      auto_renew: false,
      status: "expired",
      remaining_days: 0,
      remaining_percent: 0,
      payment_id: 95,
    },
    {
      id: 3,
      package_id: 5,
      member_id: 1,
      start_date: "2025-03-01",
      end_date: "2025-04-01",
      auto_renew: false,
      status: "paused",
      remaining_days: 13,
      remaining_percent: 43,
      payment_id: 110,
    },
    {
      id: 4,
      package_id: 1,
      member_id: 1,
      start_date: "2025-03-15",
      end_date: "2025-04-15",
      auto_renew: false,
      status: "pending",
      remaining_days: 30,
      remaining_percent: 100,
      payment_id: 115,
    },
  ];

  const packagesData: Package[] = [
    {
      id: 1,
      name: "Gói Cơ Bản",
      price: 990000,
      duration: 30,
      max_members: 100,
      description:
        "Phù hợp cho người mới bắt đầu tập luyện, bao gồm các trang thiết bị cơ bản và lớp học nhóm.",
      benefits: [
        "Sử dụng tất cả trang thiết bị cơ bản",
        "Tham gia lớp học nhóm (3 buổi/tháng)",
        "Tư vấn dinh dưỡng cơ bản",
        "Giờ tập: 8:00 - 22:00 các ngày trong tuần",
      ],
    },
    {
      id: 2,
      name: "Gói Premium",
      price: 1890000,
      duration: 90,
      max_members: 80,
      description:
        "Gói tập đầy đủ với các đặc quyền cao cấp, phù hợp cho người đã có kinh nghiệm tập luyện.",
      benefits: [
        "Sử dụng tất cả trang thiết bị và khu vực VIP",
        "Tham gia không giới hạn lớp học nhóm",
        "2 buổi tập cùng PT mỗi tháng",
        "Đánh giá thể chất định kỳ",
        "Tư vấn dinh dưỡng cá nhân hóa",
        "Giờ tập: 24/7",
      ],
    },
    {
      id: 4,
      name: "Gói Fitness",
      price: 1490000,
      duration: 60,
      max_members: 90,
      description:
        "Tập trung vào các bài tập cardio và giảm cân, phù hợp cho người muốn cải thiện sức khỏe tim mạch.",
      benefits: [
        "Sử dụng tất cả trang thiết bị cardio",
        "Tham gia các lớp học nhóm cardio không giới hạn",
        "Đánh giá đốt calo hàng tuần",
        "Tư vấn kế hoạch giảm cân",
        "Giờ tập: 6:00 - 23:00 các ngày trong tuần",
      ],
    },
    {
      id: 5,
      name: "Gói Yoga & Mindfulness",
      price: 1290000,
      duration: 60,
      max_members: 70,
      description:
        "Tập trung vào sức khỏe tinh thần và thể chất thông qua yoga và thiền, phù hợp cho người muốn giảm stress.",
      benefits: [
        "Tham gia không giới hạn các lớp yoga và thiền",
        "Sử dụng phòng thiền riêng",
        "2 buổi trị liệu tâm lý mỗi tháng",
        "Tư vấn dinh dưỡng lành mạnh",
        "Giờ tập: 6:00 - 22:00 các ngày trong tuần",
      ],
    },
  ];

  const paymentsData: Payment[] = [
    {
      id: 95,
      member_id: 1,
      package_id: 4,
      method: "Thẻ tín dụng",
      amount: 1490000,
      payment_date: "2024-11-10",
      status: "success",
    },
    {
      id: 101,
      member_id: 1,
      package_id: 2,
      method: "Chuyển khoản ngân hàng",
      amount: 1890000,
      payment_date: "2025-01-15",
      status: "success",
    },
    {
      id: 110,
      member_id: 1,
      package_id: 5,
      method: "Ví điện tử Momo",
      amount: 1290000,
      payment_date: "2025-03-01",
      status: "success",
    },
    {
      id: 115,
      member_id: 1,
      package_id: 1,
      method: "Thẻ tín dụng",
      amount: 990000,
      payment_date: "2025-03-15",
      status: "pending",
    },
  ];

  // Xử lý lọc dữ liệu theo tab
  const filteredMemberships = membershipData.filter((membership) => {
    if (activeTab === "all") return true;
    return membership.status === activeTab;
  });

  // Xử lý mở modal chi tiết
  const handleViewDetails = (id: number) => {
    const membership = membershipData.find((m) => m.id === id) || null;
    setSelectedMembership(membership);
    setIsModalOpen(true);
  };

  // Tìm thông tin gói tập và thanh toán cho modal
  const selectedPackage = selectedMembership
    ? packagesData.find((p) => p.id === selectedMembership.package_id) || null
    : null;

  const selectedPayment = selectedMembership
    ? paymentsData.find((p) => p.id === selectedMembership.payment_id) || null
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Gói tập đã đăng ký
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Quản lý và theo dõi các gói tập bạn đã đăng ký
        </p>
      </header>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <ul className="-mb-px flex flex-wrap text-center text-sm font-medium">
          <li className="mr-2">
            <button
              className={`inline-block rounded-t-lg border-b-2 p-4 ${
                activeTab === "all"
                  ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                  : "border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("all")}
            >
              Tất cả
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block rounded-t-lg border-b-2 p-4 ${
                activeTab === "active"
                  ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                  : "border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("active")}
            >
              Đang hoạt động
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block rounded-t-lg border-b-2 p-4 ${
                activeTab === "pending"
                  ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                  : "border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("pending")}
            >
              Đang xử lý
            </button>
          </li>
          <li>
            <button
              className={`inline-block rounded-t-lg border-b-2 p-4 ${
                activeTab === "expired"
                  ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                  : "border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("expired")}
            >
              Đã hết hạn
            </button>
          </li>
        </ul>
      </div>

      {/* Thông báo khi không có gói tập */}
      {filteredMemberships.length === 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex justify-center">
            <FiAlertCircle className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
            Không có gói tập nào
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {activeTab === "all"
              ? "Bạn chưa đăng ký gói tập nào."
              : activeTab === "active"
                ? "Bạn không có gói tập nào đang hoạt động."
                : activeTab === "expired"
                  ? "Bạn không có gói tập nào đã hết hạn."
                  : "Bạn không có gói tập nào đang xử lý."}
          </p>
          <div className="mt-4">
            <a
              href="/packages"
              className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
              Xem danh sách gói tập
            </a>
          </div>
        </div>
      )}

      {/* Danh sách gói tập đã đăng ký */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMemberships.map((membership) => {
          const packageInfo = packagesData.find(
            (p) => p.id === membership.package_id,
          )!;
          const payment = paymentsData.find(
            (p) => p.id === membership.payment_id,
          )!;

          return (
            <MembershipCard
              key={membership.id}
              membership={membership}
              packageInfo={packageInfo}
              payment={payment}
              onRenew={(id) => console.log("Gia hạn gói tập có id:", id)}
              onPause={(id) => console.log("Tạm dừng gói tập có id:", id)}
              onResume={(id) => console.log("Tiếp tục gói tập có id:", id)}
              onViewDetails={handleViewDetails}
            />
          );
        })}
      </div>

      {/* Modal xem chi tiết */}
      <MembershipDetailsModal
        membership={selectedMembership}
        packageInfo={selectedPackage}
        payment={selectedPayment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MyPackagesPage1;