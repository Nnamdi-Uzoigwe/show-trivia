import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Question from "@/models/Question";
import Show from "@/models/Show";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    const query = slug ? { showSlug: slug } : {};
    const questions = await Question.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ questions });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { showSlug, question, options, correctAnswer, explanation, difficulty } = body;

    const show = await Show.findOne({ slug: showSlug });
    if (!show) return NextResponse.json({ error: "Show not found" }, { status: 404 });

    const newQuestion = await Question.create({
      showId: show._id,
      showSlug,
      question,
      options,
      correctAnswer,
      explanation,
      difficulty,
    });

    return NextResponse.json({ question: newQuestion });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await Question.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}