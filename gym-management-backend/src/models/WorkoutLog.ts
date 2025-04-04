import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IWorkoutLog extends Document {
  member_id: Types.ObjectId;
  date: Date;
  duration: number;
  calories_burned: number;
  exercises: { name: string; reps: number; sets: number }[]; // Mảng bài tập
  notes?: string;
  trainer_id?: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const workoutLogSchema: Schema = new Schema({
  member_id: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  calories_burned: { type: Number, required: true },
  exercises: [
    {
      name: { type: String, required: true },
      reps: { type: Number, required: true },
      sets: { type: Number, required: true },
    },
  ],
  notes: { type: String },
  trainer_id: { type: Schema.Types.ObjectId, ref: 'Trainer', default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model<IWorkoutLog>('WorkoutLog', workoutLogSchema);
