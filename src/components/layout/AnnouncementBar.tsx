"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-ink text-cream">
      <div className="container-wide flex items-center justify-center py-2.5 text-center text-xs tracking-wide sm:text-sm">
        <p>
          Free shipping on orders over $200 · This is a demo showcase — no
          real orders are processed
        </p>
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Dismiss announcement"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/70 transition hover:text-cream"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
