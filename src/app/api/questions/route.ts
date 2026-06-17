import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Question from "@/models/Question";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const limit = parseInt(searchParams.get("limit") || "20");

    if (!slug) {
      return NextResponse.json({ error: "slug required" }, { status: 400 });
    }

    const questions = await Question.aggregate([
      { $match: { showSlug: slug } },
      { $sample: { size: limit } },
    ]);

    return NextResponse.json({ questions });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}