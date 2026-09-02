"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Lock } from "lucide-react";
import { useCartStore, cartLineDetails } from "@/store/cart";
import { formatPrice, generateOrderNumber } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SmartImage from "@/components/ui/SmartImage";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a valid phone number"),
  address: z.string().min(5, "Enter your address"),
  city: z.string().min(2, "Enter your city"),
  postalCode: z.string().min(3, "Enter a postal code"),
  cardNumber: z
    .string()
    .min(12, "Enter a 12-19 digit card number")
    .max(19, "Enter a 12-19 digit card number"),
  cardExpiry: z.string().min(4, "MM/YY"),
  cardCvc: z.string().min(3, "CVC"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const inputClass =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-terracotta focus:outline-none";

export default function CheckoutClient() {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const lines = items.map(cartLineDetails).filter(Boolean) as NonNullable<
    ReturnType<typeof cartLineDetails>
  >[];
  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 25;
  const total = subtotal + shipping;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutForm>({ resolver: zodResolver(checkoutSchema) });

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 900));
    setOrderNumber(generateOrderNumber());
    setOrderComplete(true);
    clear();
  }

  if (orderComplete) {
    return (
      <Container className="flex flex-col items-center py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-forest/10 text-forest">
          <CheckCircle2 size={30} />
        </span>
        <h1 className="mt-6 font-serif-display text-3xl text-ink">
          Thank you for your order!
        </h1>
        <p className="mt-2 max-w-md text-sm text-ink-soft">
          This is a demo storefront — no real payment was processed and no
          product will ship. Your demo order number is{" "}
          <span className="font-semibold text-ink">{orderNumber}</span>.
        </p>
        <Button href="/shop" className="mt-8">
          Continue Shopping
        </Button>
      </Container>
    );
  }

  if (lines.length === 0) {
    return (
      <Container className="flex flex-col items-center py-24 text-center">
        <h1 className="font-serif-display text-3xl text-ink">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Add something to your cart before checking out.
        </p>
        <Button href="/shop" className="mt-6">
          Shop Now
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-14 sm:py-20">
      <h1 className="font-serif-display text-3xl text-ink sm:text-4xl">
        Checkout
      </h1>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
        <Lock size={13} /> Demo checkout — this form does not process real
        payments.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]"
      >
        <div className="space-y-10">
          <section>
            <h2 className="mb-4 font-serif-display text-xl text-ink">
              Contact & Shipping
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Full name"
                error={errors.fullName?.message}
                inputProps={register("fullName")}
              />
              <Field
                label="Email"
                type="email"
                error={errors.email?.message}
                inputProps={register("email")}
              />
              <Field
                label="Phone"
                error={errors.phone?.message}
                inputProps={register("phone")}
              />
              <Field
                label="Postal code"
                error={errors.postalCode?.message}
                inputProps={register("postalCode")}
              />
              <Field
                label="Address"
                className="sm:col-span-2"
                error={errors.address?.message}
                inputProps={register("address")}
              />
              <Field
                label="City"
                error={errors.city?.message}
                inputProps={register("city")}
              />
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-serif-display text-xl text-ink">
              Payment (Demo)
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Card number"
                placeholder="4242 4242 4242 4242"
                className="sm:col-span-2"
                error={errors.cardNumber?.message}
                inputProps={register("cardNumber")}
              />
              <Field
                label="Expiry (MM/YY)"
                placeholder="12/28"
                error={errors.cardExpiry?.message}
                inputProps={register("cardExpiry")}
              />
              <Field
                label="CVC"
                placeholder="123"
                error={errors.cardCvc?.message}
                inputProps={register("cardCvc")}
              />
            </div>
          </section>

          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? "Processing..." : `Place Demo Order — ${formatPrice(total)}`}
          </Button>
        </div>

        <div className="h-fit rounded-2xl bg-sand/40 p-6 sm:p-8">
          <h2 className="font-serif-display text-xl text-ink">Order Summary</h2>
          <div className="mt-5 space-y-4">
            {lines.map((line) => (
              <div key={line.product.id} className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-sand">
                  <SmartImage
                    src={line.product.images[0]}
                    alt={line.product.name}
                    label={line.product.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">
                    {line.product.name}
                  </p>
                  <p className="text-xs text-muted">
                    Qty {items.find((i) => i.productId === line.product.id)?.quantity}
                  </p>
                </div>
                <p className="text-sm text-ink">{formatPrice(line.lineTotal)}</p>
              </div>
            ))}
          </div>
          <dl className="mt-5 space-y-3 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Subtotal</dt>
              <dd className="text-ink">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Shipping</dt>
              <dd className="text-ink">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-medium">
              <dt className="text-ink">Total</dt>
              <dd className="text-ink">{formatPrice(total)}</dd>
            </div>
          </dl>
        </div>
      </form>
    </Container>
  );
}

function Field({
  label,
  error,
  className,
  type = "text",
  placeholder,
  inputProps,
}: {
  label: string;
  error?: string;
  className?: string;
  type?: string;
  placeholder?: string;
  inputProps: ReturnType<ReturnType<typeof useForm<CheckoutForm>>["register"]>;
}) {
  return (
    <label className={className}>
      <span className="mb-1.5 block text-xs font-medium text-ink-soft">
        {label}
      </span>
      <input type={type} placeholder={placeholder} className={inputClass} {...inputProps} />
      {error && <span className="mt-1 block text-xs text-terracotta">{error}</span>}
    </label>
  );
}
