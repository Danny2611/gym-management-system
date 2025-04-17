import React, { useState, useEffect } from "react";
import ComponentCard from "~/components/dashboard/common/ComponentCard";
import transactionHistoryData from "./transactionHistoryData"; // Import dữ liệu mẫu

// Định nghĩa kiểu cho thông tin hội viên
interface Member {
    _id: string;
    name: string;
    image: string;
  }
  
  // Định nghĩa kiểu cho gói dịch vụ
  interface Package {
    _id: string;
    name: string;
    price: number;
  }
  
  // Định nghĩa kiểu cho thông tin thanh toán qua ngân hàng
  interface BankPaymentInfo {
    bank: string;
    accountNumber: string;
  }
  
  // Định nghĩa kiểu cho thông tin thanh toán qua ví điện tử (MoMo)
  interface MomoPaymentInfo {
    phoneNumber: string;
  }
  
  // Định nghĩa union type cho các loại thông tin thanh toán
  type PaymentInfo =  MomoPaymentInfo | Record<string, never>;
  
  // Định nghĩa các loại phương thức thanh toán
  type PaymentMethod = 'bank_transfer' | 'momo' | 'cash';
  
  // Định nghĩa các trạng thái giao dịch
  type TransactionStatus = 'completed' | 'pending' | 'cancelled' | 'failed';
  
  // Định nghĩa kiểu cho lịch sử giao dịch
  interface Transaction {
    _id: string;
    member_id: Member;
    package_id: Package;
    amount: number;
    status: TransactionStatus;
    paymentMethod: PaymentMethod;
    transactionId: string;
    paymentInfo: PaymentInfo;
    created_at: Date;
    updated_at: Date;
  }
  

// Định nghĩa kiểu dữ liệu cho một giao dịch
interface Transaction {
    _id: string;
    member_id: Member;
    package_id: Package;
    amount: number;
    status: TransactionStatus;
    paymentMethod: PaymentMethod;
    transactionId: string;
    paymentInfo: PaymentInfo;
    created_at: Date;
    updated_at: Date;
  }

// Định nghĩa kiểu dữ liệu cho bộ lọc ngày
interface DateRange {
  start: string;
  end: string;
}

// Props cho component StatusBadge
interface StatusBadgeProps {
  status: TransactionStatus;
}

// Props cho component PaymentMethodBadge
interface PaymentMethodBadgeProps {
  method: PaymentMethod;
}

// Props cho component TransactionDetail
interface TransactionDetailProps {
  transaction: Transaction | null;
  onClose: () => void;
}

// Các hàm tiện ích
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0
  }).format(amount);
};

const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

// Component hiển thị trạng thái thanh toán
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig: Record<TransactionStatus, { color: string; text: string }> = {
    completed: {
      color: "success",
      text: "Hoàn thành"
    },
    pending: {
      color: "info",
      text: "Đang xử lý"
    },
    failed: {
      color: "error",
      text: "Thất bại"
    },
    cancelled: {
      color: "warning",
      text: "Đã hủy"
    }
  };

  const config = statusConfig[status] || { color: "info", text: status };
  
  const colorClasses: Record<string, string> = {
    success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
  };
  
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClasses[config.color]}`}>
      {config.text}
    </span>
  );
};

// Component hiển thị phương thức thanh toán
const PaymentMethodBadge: React.FC<PaymentMethodBadgeProps> = ({ method }) => {
  const methodConfig: Record<PaymentMethod, { color: string; text: string }> = {
    momo: {
      color: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
      text: "MoMo"
    },
    cash: {
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      text: "Tiền mặt"
    },
    bank_transfer: {
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      text: "Chuyển khoản"
    }
  };

  const config = methodConfig[method] || { 
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400", 
    text: method 
  };
  
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}>
      {config.text}
    </span>
  );
};

// Component chi tiết giao dịch
const TransactionDetail: React.FC<TransactionDetailProps> = ({ transaction, onClose }) => {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Chi tiết giao dịch</h3>
          <button 
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
          <div className="mb-4 flex items-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">{transaction.package_id.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Mã giao dịch: {transaction.transactionId}</p>
            </div>
          </div>
          
          <div className="mb-2 flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Số tiền:</span>
            <span className="font-bold text-green-600 dark:text-green-400">{formatCurrency(transaction.amount)}</span>
          </div>
          
          <div className="mb-2 flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Trạng thái:</span>
            <StatusBadge status={transaction.status} />
          </div>
          
          <div className="mb-2 flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Phương thức:</span>
            <PaymentMethodBadge method={transaction.paymentMethod} />
          </div>
          
          <div className="mb-2 flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Thời gian:</span>
            <span>{formatDate(transaction.created_at)}</span>
          </div>
          
         
         
          {transaction.paymentMethod === 'momo' && transaction.paymentInfo?.phoneNumber && (
            <div className="mb-2 flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Số điện thoại:</span>
              <span>{transaction.paymentInfo.phoneNumber}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-2">
          {transaction.status === 'pending' && (
            <button className="rounded-lg border border-red-500 px-4 py-2 text-red-500 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20">
              Hủy giao dịch
            </button>
          )}
          <button 
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterMethod, setFilterMethod] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange>({ start: "", end: "" });
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const transactionsPerPage = 10;

  // Giả lập việc lấy dữ liệu từ API
  useEffect(() => {
    // Trong thực tế, đây sẽ là API call
    setTransactions(transactionHistoryData as Transaction[]);
  }, []);

  // Lọc giao dịch dựa trên các tiêu chí
  const filteredTransactions = transactions.filter(transaction => {
    // Lọc theo trạng thái
    if (filterStatus !== "all" && transaction.status !== filterStatus) {
      return false;
    }
    
    // Lọc theo phương thức thanh toán
    if (filterMethod !== "all" && transaction.paymentMethod !== filterMethod) {
      return false;
    }
    
    // Lọc theo từ khóa tìm kiếm (tên gói hoặc ID giao dịch)
    if (searchTerm.trim() !== "") {
      const searchLower = searchTerm.toLowerCase();
      const packageNameMatch = transaction.package_id.name.toLowerCase().includes(searchLower);
      const transactionIdMatch = transaction.transactionId.toLowerCase().includes(searchLower);
      if (!packageNameMatch && !transactionIdMatch) {
        return false;
      }
    }
    
    // Lọc theo khoảng thời gian
    if (dateRange.start && new Date(transaction.created_at) < new Date(dateRange.start)) {
      return false;
    }
    if (dateRange.end) {
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999); // Đặt thời gian là cuối ngày
      if (new Date(transaction.created_at) > endDate) {
        return false;
      }
    }
    
    return true;
  });
  
  // Phân trang
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  // Xử lý khi chọn giao dịch để xem chi tiết
  const handleViewDetail = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
        Quản lý lịch sử giao dịch
      </h1>

      <div className="grid gap-6 lg:grid-cols-4">
        
        {/* Bộ lọc */}
        <ComponentCard title="Bộ lọc giao dịch" className="lg:col-span-1">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Trạng thái
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="completed">Hoàn thành</option>
                <option value="pending">Đang xử lý</option>
                <option value="failed">Thất bại</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phương thức thanh toán
              </label>
              <select
                value={filterMethod}
                onChange={(e) => setFilterMethod(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
              >
                <option value="all">Tất cả phương thức</option>
                <option value="momo">MoMo</option>
                <option value="cash">Tiền mặt</option>
                <option value="bank_transfer">Chuyển khoản</option>
              </select>
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Từ ngày
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Đến ngày
              </label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
            
            <div className="pt-2">
              <button
                onClick={() => {
                  setFilterStatus("all");
                  setFilterMethod("all");
                  setSearchTerm("");
                  setDateRange({ start: "", end: "" });
                  setCurrentPage(1);
                }}
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          </div>
        </ComponentCard>

        {/* Danh sách giao dịch */}
        <div className="lg:col-span-3">
          <ComponentCard title="Lịch sử giao dịch">
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên gói hoặc mã giao dịch..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Tên gói
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Số tiền
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Phương thức
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Trạng thái
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Ngày tạo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {currentTransactions.length > 0 ? (
                    currentTransactions.map((transaction) => (
                      <tr 
                        key={transaction._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {transaction.package_id.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {transaction.transactionId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatCurrency(transaction.amount)}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <PaymentMethodBadge method={transaction.paymentMethod} />
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <StatusBadge status={transaction.status} />
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(transaction.created_at)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                          <button
                            onClick={() => handleViewDetail(transaction)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            Chi tiết
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        Không tìm thấy giao dịch nào phù hợp với bộ lọc
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Phân trang */}
            {filteredTransactions.length > 0 && (
              <div className="mt-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                      currentPage === 1
                        ? "cursor-not-allowed text-gray-400"
                        : "text-gray-700 hover:bg-gray-50"
                    } dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200`}
                  >
                    Trước
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                      currentPage === totalPages
                        ? "cursor-not-allowed text-gray-400"
                        : "text-gray-700 hover:bg-gray-50"
                    } dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200`}
                  >
                    Tiếp
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Hiển thị <span className="font-medium">{indexOfFirstTransaction + 1}</span> đến{" "}
                      <span className="font-medium">
                        {Math.min(indexOfLastTransaction, filteredTransactions.length)}
                      </span>{" "}
                      trong tổng số <span className="font-medium">{filteredTransactions.length}</span> kết quả
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium ${
                          currentPage === 1
                            ? "cursor-not-allowed text-gray-400"
                            : "text-gray-500 hover:bg-gray-50"
                        } dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300`}
                      >
                        <span className="sr-only">Trang trước</span>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      
                      {/* Số trang */}
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                        // Tính toán số trang hiển thị
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
                              currentPage === pageNum
                                ? "z-10 border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium ${
                          currentPage === totalPages
                            ? "cursor-not-allowed text-gray-400"
                            : "text-gray-500 hover:bg-gray-50"
                        } dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300`}
                      >
                        <span className="sr-only">Trang tiếp</span>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </ComponentCard>
        </div>
      </div>
      
      {/* Modal xem chi tiết giao dịch */}
      {selectedTransaction && (
        <TransactionDetail 
          transaction={selectedTransaction} 
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
};

export default TransactionHistory;