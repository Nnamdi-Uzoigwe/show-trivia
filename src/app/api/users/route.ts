import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, fingerprint } = await req.json();

    if (!name || !fingerprint) {
      return NextResponse.json({ error: "Name and fingerprint required" }, { status: 400 });
    }

    let user = await User.findOne({ fingerprint });

    if (user) {
      user.name = name;
      await user.save();
    } else {
      user = await User.create({ name, fingerprint });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}