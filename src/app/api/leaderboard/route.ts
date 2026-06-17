import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Leaderboard from "@/models/Leaderboard";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!slug) {
      return NextResponse.json({ error: "slug required" }, { status: 400 });
    }

    const entries = await Leaderboard.find({ showSlug: slug })
      .sort({ bestScore: -1, bestTime: 1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ entries });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}