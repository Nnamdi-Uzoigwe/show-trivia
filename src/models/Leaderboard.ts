import mongoose, { Schema, Document } from "mongoose";

export interface ILeaderboard extends Document {
  showId: mongoose.Types.ObjectId;
  showSlug: string;
  userId: mongoose.Types.ObjectId;
  userName: string;
  bestScore: number;
  bestTime: number;
  totalAttempts: number;
}

const LeaderboardSchema = new Schema<ILeaderboard>({
  showId: { type: Schema.Types.ObjectId, ref: "Show", required: true },
  showSlug: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String, required: true },
  bestScore: { type: Number, required: true },
  bestTime: { type: Number },
  totalAttempts: { type: Number, default: 1 },
}, { timestamps: true });

LeaderboardSchema.index({ showSlug: 1, bestScore: -1 });

export default mongoose.models.Leaderboard || mongoose.model<ILeaderboard>("Leaderboard", LeaderboardSchema);