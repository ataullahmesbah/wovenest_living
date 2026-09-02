export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "8801234567890";

export function whatsappLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi Wovenest Living! I'd like to know more about your furniture collection.";
