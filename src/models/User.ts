import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  fingerprint: string;
  totalQuizzesTaken: number;
  streak: number;
  lastPlayedDate: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  fingerprint: { type: String, required: true, unique: true },
  totalQuizzesTaken: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastPlayedDate: { type: Date },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);