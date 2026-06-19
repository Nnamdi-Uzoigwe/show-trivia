import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Attempt from "@/models/Attempt";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const showSlug = searchParams.get("showSlug");

    if (!userId || !showSlug) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [showAttempts, totalAttempts] = await Promise.all([
      Attempt.countDocuments({ userId, showSlug, completedAt: { $gte: today } }),
      Attempt.countDocuments({ userId, completedAt: { $gte: today } }),
    ]);

    return NextResponse.json({
      showAttempts,
      totalAttempts,
      canAttempt: showAttempts < 4 && totalAttempts < 20,
      showLimitReached: showAttempts >= 4,
      totalLimitReached: totalAttempts >= 20,
      remainingShowAttempts: Math.max(0, 4 - showAttempts),
      remainingTotalAttempts: Math.max(0, 20 - totalAttempts),
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}