import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IProgress extends Document {
  member_id: Types.ObjectId;
  weight: number;
  height: number;
  muscle_mass: number;
  body_fat: number;
  bmi: number;
  measurement_date: Date;
  created_at: Date;
  updated_at: Date;
}

const progressSchema: Schema = new Schema({
  member_id: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  muscle_mass: { type: Number, required: true },
  body_fat: { type: Number, required: true },
  bmi: { type: Number, required: true },
  measurement_date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model<IProgress>('Progress', progressSchema);