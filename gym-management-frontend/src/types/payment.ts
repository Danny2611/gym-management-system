export type PaymentStatus = "pending" | "completed" | "failed" | "cancelled";
export type PaymentMethod = "momo" | "cash" | "bank_transfer";

export interface Payment {
  _id?: string;
  member_id: string; // ObjectId dưới dạng string
  package_id: string; // ObjectId dưới dạng string
  amount: number;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  paymentInfo?: any; // có thể khai báo kỹ hơn nếu biết rõ cấu trúc
  created_at: string; // ISO string
  updated_at: string; // ISO string
}
