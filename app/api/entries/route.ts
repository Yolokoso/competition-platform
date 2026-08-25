import { NextRequest, NextResponse } from "next/server";

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

    if (!competitionId || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // ============================================
    // HOW TO ACTUALLY RECEIVE THE EMAILS
    // ============================================
    //
    // Option 1 (Easiest - Formspree):
    // 1. Go to https://formspree.io and create a free form
    // 2. Replace the fetch below with your Formspree endpoint
    //
    // Option 2 (Resend - recommended for production):
    // Use the Resend API to email yourself the entry
    //
    // Option 3 (Google Sheets):
    // Use a Google Apps Script web app or SheetDB
    //
    // For now we log the entry. Replace this block with your preferred method.

    console.log("=== NEW COMPETITION ENTRY ===");
    console.log("Competition:", competitionTitle, `(${competitionId})`);
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Time:", new Date().toISOString());
    console.log("=============================");

    // Example Formspree integration (uncomment & replace with your form ID):
    //
    // await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     competition: competitionTitle,
    //     name,
    //     email,
    //     _subject: `New entry: ${competitionTitle}`,
    //   }),
    // });

    return NextResponse.json({
      success: true,
      message: "Entry recorded successfully",
    });
  } catch (error) {
    console.error("Entry submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
