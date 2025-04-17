export type MembershipStatus = "active" | "expired" | "pending" | "paused";

export interface Membership {
  _id: string;
  member_id: string;
  package_id: {
    _id: string;
    name: string;
    price: number;
    duration: number;
    max_members: number;
    description: string;
    benefits: string[];
    status: string;
    category?: string;
    popular?: boolean;
    training_sessions?: number;
    session_duration?: number;
    details?: {
      _id: string;
      package_id: string;
      schedule: string[];
      training_areas: string[];
      additional_services: string[];
      status: "active" | "inactive";
    };
  };
  payment_id: {
    _id: string;
    paymentMethod: string;
    amount: number;
    payment_date: Date;
    status: string;
    paymentInfo: {
      responseTime: string;
      message: string;
    };
  };

  start_date: Date | null;
  end_date: Date | null;
  auto_renew: boolean;
  status: "active" | "expired" | "pending" | "paused";
  available_sessions: number;
  used_sessions: number;
  last_sessions_reset?: Date;
  created_at: Date;
  updated_at: Date;
}
