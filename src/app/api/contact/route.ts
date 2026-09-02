import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(1, "Message is required").max(5000),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  try {
    await prisma.contactMessage.create({ data: parsed.data });
  } catch (err) {
    console.error(
      "[contact] Could not save message — is DATABASE_URL configured? See .env.example.",
      err
    );
    return NextResponse.json(
      {
        error:
          "We couldn't save your message right now. Please try again shortly or reach us on WhatsApp.",
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
