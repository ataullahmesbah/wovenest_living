"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
      setMessage("You're on the list — welcome!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <div
        className={`flex items-center gap-2 rounded-full border px-2 py-1.5 ${
          dark ? "border-cream/25 bg-cream/5" : "border-line bg-white"
        }`}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className={`w-full flex-1 bg-transparent px-3 py-1.5 text-sm focus:outline-none ${
            dark ? "text-cream placeholder:text-cream/50" : "text-ink placeholder:text-muted"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Subscribe"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terracotta text-cream transition hover:bg-terracotta-dark disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
        </button>
      </div>
      {message && (
        <p
          className={`mt-2 text-xs ${
            status === "error"
              ? "text-terracotta"
              : dark
                ? "text-cream/70"
                : "text-ink-soft"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
