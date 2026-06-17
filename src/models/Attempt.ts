import mongoose, { Schema, Document } from "mongoose";

export interface IAttempt extends Document {
  userId: mongoose.Types.ObjectId;
  userName: string;
  showId: mongoose.Types.ObjectId;
  showSlug: string;
  score: number;
  totalQuestions: number;
  timeTaken: number;
  answers: { questionId: string; selected: number; correct: boolean }[];
  completedAt: Date;
}

const AttemptSchema = new Schema<IAttempt>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String, required: true },
  showId: { type: Schema.Types.ObjectId, ref: "Show", required: true },
  showSlug: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, default: 20 },
  timeTaken: { type: Number },
  answers: [{ questionId: String, selected: Number, correct: Boolean }],
  completedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Attempt || mongoose.model<IAttempt>("Attempt", AttemptSchema);