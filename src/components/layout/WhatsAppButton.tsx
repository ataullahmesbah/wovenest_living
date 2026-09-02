"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 animate-pulse-soft items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <MessageCircle size={28} fill="white" className="text-[#25D366]" />
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-ink px-3 py-1.5 text-xs font-medium text-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  );
}
