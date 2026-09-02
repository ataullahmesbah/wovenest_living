import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  try {
    await prisma.newsletterSubscriber.create({ data: parsed.data });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }
    console.error(
      "[newsletter] Could not save subscriber — is DATABASE_URL configured? See .env.example.",
      err
    );
    return NextResponse.json(
      { error: "We couldn't subscribe you right now. Please try again shortly." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
