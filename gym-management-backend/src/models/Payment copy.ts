import mongoose, { Document, Schema, Types } from 'mongoose';

// Interface cho Social Links
export interface ISocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

// Interface cho Payment
export interface IPayment extends Document {
  member_id: Types.ObjectId;
  package_id: Types.ObjectId;
  method: string;
  amount: number;
  social_links?: ISocialLinks; // 👈 Chuyển thành object thay vì string
  payment_date: Date;
  rating?: number;
  status: 'success' | 'pending' | 'cancelled';
  created_at: Date;
  updated_at: Date;
}

const paymentSchema: Schema = new Schema({
  member_id: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
  package_id: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
  method: { type: String, required: true },
  amount: { type: Number, required: true },
  social_links: {
    facebook: { type: String, required: false },
    instagram: { type: String, required: false },
    twitter: { type: String, required: false },
  }, // 👈 Định nghĩa dưới dạng object thay vì string
  payment_date: { type: Date, required: true },
  rating: { type: Number, min: 1, max: 5 },
  status: { type: String, enum: ['success', 'pending', 'cancelled'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model<IPayment>('Payment', paymentSchema);
