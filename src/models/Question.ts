import mongoose, { Schema, Document } from "mongoose";

export interface IQuestion extends Document {
  showId: mongoose.Types.ObjectId;
  showSlug: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const QuestionSchema = new Schema<IQuestion>({
  showId: { type: Schema.Types.ObjectId, ref: "Show", required: true },
  showSlug: { type: String, required: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  explanation: { type: String },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Medium" },
}, { timestamps: true });

export default mongoose.models.Question || mongoose.model<IQuestion>("Question", QuestionSchema);