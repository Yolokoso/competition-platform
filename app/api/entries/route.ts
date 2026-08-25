import { NextRequest, NextResponse } from "next/server";
import { addEntry, getEntries } from "@/lib/entries-store";

// SQLite needs the Node.js runtime (not Edge)
export const runtime = "nodejs";

type EntryBody = {
  competitionId: string;
  competitionTitle: string;
  name: string;
  email: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: EntryBody = await request.json();
    const { competitionId, competitionTitle, name, email } = body;

    if (!competitionId || !name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const entry = addEntry({
      competitionId,
      competitionTitle,
      name: name.trim(),
      email: email.trim().toLowerCase(),
    });

    return NextResponse.json({
      success: true,
      message: "Entry recorded successfully",
      id: entry.id,
    });
  } catch (error) {
    console.error("Entry submission error:", error);
    return NextResponse.json(
      {
        error:
          "Could not save entry. SQLite needs a writable filesystem (local, Railway, Render, or a VPS). Vercel serverless will not work for this setup.",
      },
      { status: 500 }
    );
  }
}

// Admin: GET /api/entries?key=YOUR_ADMIN_KEY
export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey || key !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const entries = getEntries();
    return NextResponse.json({ entries });
  } catch (error) {
    console.error("List entries error:", error);
    return NextResponse.json(
      { error: "Could not read entries" },
      { status: 500 }
    );
  }
}
