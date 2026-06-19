import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Attempt from "@/models/Attempt";
import Leaderboard from "@/models/Leaderboard";
import User from "@/models/User";
import Show from "@/models/Show";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { userId, userName, showSlug, score, totalQuestions, timeTaken, answers, fingerprint } = body;

    const show = await Show.findOne({ slug: showSlug });
    if (!show) return NextResponse.json({ error: "Show not found" }, { status: 404 });

    // Check attempt limits
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const showAttempts = await Attempt.countDocuments({
      userId, showSlug, completedAt: { $gte: today },
    });

    if (showAttempts >= 4) {
      return NextResponse.json({ error: "Max 4 attempts per show per day reached" }, { status: 429 });
    }

    const totalAttempts = await Attempt.countDocuments({
      userId, completedAt: { $gte: today },
    });

    if (totalAttempts >= 20) {
      return NextResponse.json({ error: "Max 20 total attempts per day reached" }, { status: 429 });
    }

    // Save attempt
    const attempt = await Attempt.create({
      userId, userName, showId: show._id, showSlug,
      score, totalQuestions, timeTaken, answers,
    });

    // Update leaderboard
    const existing = await Leaderboard.findOne({ userId, showSlug });
    if (!existing) {
      await Leaderboard.create({
        showId: show._id, showSlug, userId, userName,
        bestScore: score, bestTime: timeTaken, totalAttempts: 1,
      });
    } else if (score > existing.bestScore || (score === existing.bestScore && timeTaken < existing.bestTime)) {
      existing.bestScore = score;
      existing.bestTime = timeTaken;
      existing.totalAttempts += 1;
      await existing.save();
    } else {
      existing.totalAttempts += 1;
      await existing.save();
    }

    // Update user stats
   const userDoc = fingerprint
  ? await User.findOne({ fingerprint })
  : await User.findById(userId);
  
if (userDoc) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let newStreak = 1;

  if (userDoc.lastPlayedDate) {
    const last = new Date(userDoc.lastPlayedDate);
    const lastDay = new Date(last.getFullYear(), last.getMonth(), last.getDate());
    const diffDays = Math.round((today.getTime() - lastDay.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      newStreak = userDoc.streak || 1;
    } else if (diffDays === 1) {
      newStreak = (userDoc.streak || 0) + 1;
    } else {
      newStreak = 1;
    }
  }

  await User.findByIdAndUpdate(userId, {
    $inc: { totalQuizzesTaken: 1 },
    lastPlayedDate: now,
    streak: newStreak,
  });
}

    return NextResponse.json({ attempt });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}