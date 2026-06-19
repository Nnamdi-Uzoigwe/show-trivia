import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Attempt from "@/models/Attempt";
import Question from "@/models/Question";
import Show from "@/models/Show";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const [totalUsers, totalAttempts, totalQuestions, totalShows, recentAttempts] =
      await Promise.all([
        User.countDocuments(),
        Attempt.countDocuments(),
        Question.countDocuments(),
        Show.countDocuments(),
        Attempt.find()
          .sort({ completedAt: -1 })
          .limit(10)
          .lean(),
      ]);

    const attemptsByShow = await Attempt.aggregate([
      { $group: { _id: "$showSlug", count: { $sum: 1 }, avgScore: { $avg: "$score" } } },
      { $sort: { count: -1 } },
    ]);

    return NextResponse.json({
      totalUsers,
      totalAttempts,
      totalQuestions,
      totalShows,
      recentAttempts,
      attemptsByShow,
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}