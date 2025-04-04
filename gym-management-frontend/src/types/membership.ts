export type MembershipStatus = 'active' | 'expired' | 'pending' | 'paused';

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
      }
    };
    
    start_date: Date | null;
    end_date: Date | null;
    auto_renew: boolean;
    status: 'active' | 'expired' | 'pending' | 'paused';
    created_at: Date;
    updated_at: Date;
  }

