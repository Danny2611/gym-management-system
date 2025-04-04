/**
 * Định dạng ngày tháng (ví dụ: "October 15, 2023")
 * @param date - Chuỗi hoặc đối tượng Date
 * @returns Chuỗi ngày tháng đã định dạng
 */
export const formatDate = (date: Date | string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("vi-VN", options);
};
