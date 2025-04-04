import mongoose, { Document, Schema } from 'mongoose';

export interface IPromotion extends Document {
  name: string;
  description?: string;
  discount: number;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at: Date;
}

const promotionSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: String,
  discount: { type: Number, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model<IPromotion>('Promotion', promotionSchema);