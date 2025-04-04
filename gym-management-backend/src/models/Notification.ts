import mongoose, { Document, Schema, Types } from 'mongoose';

export interface INotification extends Document {
  member_id: Types.ObjectId;
  trainer_id: Types.ObjectId;
  message: string;
  type: 'reminder' | 'promotion' | 'appointment';
  status: 'sent' | 'pending';
  created_at: Date;
  updated_at: Date;
}

const notificationSchema: Schema = new Schema({
  member_id: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
  trainer_id: { type: Schema.Types.ObjectId, ref: 'Trainer', required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['reminder', 'promotion', 'appointment'], required: true },
  status: { type: String, enum: ['sent', 'pending'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model<INotification>('Notification', notificationSchema);