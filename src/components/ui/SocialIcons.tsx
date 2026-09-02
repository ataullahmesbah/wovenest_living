type IconProps = { size?: number; className?: string };

export function InstagramIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 16, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M13.5 21v-8.2h2.75l.41-3.19H13.5V7.6c0-.92.26-1.55 1.58-1.55h1.68V3.19C16.47 3.13 15.4 3 14.16 3c-2.6 0-4.38 1.59-4.38 4.5v2.11H7v3.19h2.78V21h3.72Z" />
    </svg>
  );
}

export function XIcon({ size = 16, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M3 3h4.6l4.02 5.6L16.6 3H21l-6.62 8.36L21.4 21h-4.6l-4.36-6.05L6.9 21H2.5l7.05-8.9L3 3Z" />
    </svg>
  );
}

export function YoutubeIcon({ size = 16, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.3v5.4l5-2.7-5-2.7Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
