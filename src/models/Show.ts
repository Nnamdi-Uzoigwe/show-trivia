import mongoose, { Schema, Document } from "mongoose";

export interface IShow extends Document {
  id: string;
  title: string;
  slug: string;
  description: string;
  bannerImage: string;
  posterImage: string;
  genre: string[];
  releaseYear: number;
  totalSeasons: number;
  difficulty: "Easy" | "Medium" | "Hard";
  totalQuestions: number;
  isActive: boolean;
}

const ShowSchema = new Schema<IShow>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  bannerImage: { type: String, required: true },
  posterImage: { type: String, required: true },
  genre: [{ type: String }],
  releaseYear: { type: Number },
  totalSeasons: { type: Number },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Medium" },
  totalQuestions: { type: Number, default: 200 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Show || mongoose.model<IShow>("Show", ShowSchema);