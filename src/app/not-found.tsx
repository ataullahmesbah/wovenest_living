import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-32 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sand text-terracotta">
        <Compass size={28} />
      </span>
      <p className="mt-6 font-serif-display text-6xl text-ink">404</p>
      <h1 className="mt-3 font-serif-display text-2xl text-ink">
        This room doesn&apos;t exist... yet.
      </h1>
      <p className="mt-2 max-w-sm text-sm text-ink-soft">
        The page you&apos;re looking for may have been moved or no longer
        exists. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button href="/">Back to Home</Button>
        <Button href="/shop" variant="outline">
          Browse Shop
        </Button>
      </div>
    </Container>
  );
}
