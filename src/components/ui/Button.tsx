import { cn } from "@/lib/utils";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-ink text-cream hover:bg-terracotta-dark focus-visible:outline-ink",
  secondary:
    "bg-terracotta text-cream hover:bg-terracotta-dark focus-visible:outline-terracotta",
  outline:
    "border border-ink text-ink hover:bg-ink hover:text-cream focus-visible:outline-ink",
  ghost: "text-ink hover:bg-sand/60 focus-visible:outline-ink",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = BaseProps &
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> & {
    href: string;
  };

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps | LinkProps) {
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  if (rest.href) {
    const { href, target, rel } = rest as LinkProps;
    return (
      <Link href={href} target={target} rel={rel} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
