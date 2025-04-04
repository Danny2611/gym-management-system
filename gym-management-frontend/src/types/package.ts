export type PackageStatus = 'active' | 'inactive';
export type PackageCategory = 'basic' | 'premium' | 'specialized' | 'standard' | 'vip';

export interface Package {
  _id?: string; // thường sẽ có khi lấy từ DB
  name: string;
  max_members?: number;
  price: number;
  duration: number;
  description?: string;
  benefits: string[];
  status: PackageStatus;
  created_at: string; // ISO date string khi truyền từ backend
  deleted_at?: string;
  updated_at: string;
  category?: PackageCategory;
  popular?: boolean;
  training_sessions?: number;
  session_duration?: number;
}
