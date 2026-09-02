"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import Button from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-terracotta focus:outline-none";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-forest/10 px-6 py-14 text-center">
        <CheckCircle2 size={32} className="text-forest" />
        <h3 className="mt-4 font-serif-display text-xl text-ink">
          Message sent!
        </h3>
        <p className="mt-2 max-w-sm text-sm text-ink-soft">
          Thanks for reaching out — we&apos;ll get back to you within one
          business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-medium text-terracotta hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label>
          <span className="mb-1.5 block text-xs font-medium text-ink-soft">
            Name
          </span>
          <input name="name" required className={inputClass} placeholder="Your name" />
        </label>
        <label>
          <span className="mb-1.5 block text-xs font-medium text-ink-soft">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            className={inputClass}
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-ink-soft">
          Subject
        </span>
        <input name="subject" required className={inputClass} placeholder="How can we help?" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-ink-soft">
          Message
        </span>
        <textarea
          name="message"
          required
          rows={5}
          className={inputClass}
          placeholder="Tell us a bit more..."
        />
      </label>

      {status === "error" && (
        <p className="text-sm text-terracotta">{errorMessage}</p>
      )}

      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Send size={16} />
        )}
        {status === "loading" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
