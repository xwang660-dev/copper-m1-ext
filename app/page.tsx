import { Check, Minus } from "lucide-react";
import Image from "next/image";
import { SiteFooter } from "@/components/copper/site-footer";
import { SiteHeader } from "@/components/copper/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  formatMemory,
  formatNotesHours,
  formatUsd,
  getPlans,
  getPrivacySummary,
  getProducts,
  type Plan,
  type Product,
} from "@/lib/copper/catalog";
import { cn } from "@/lib/utils";

const TAGLINE = "From raw ideas to refined answers.";

// Swatch colors for the finishes named in the catalog (brand colors only).
const SWATCHES: Record<string, string> = {
  "Polished Copper": "#b87333",
  "Brushed Copper": "#b87333",
  "Patina Teal": "#4a8c82",
  "Desert Sand": "#efe3d0",
  "Night Sky": "#1c2333",
};

const CUTOUT_ALT: Record<string, string> = {
  "copper-home":
    "Copper Home smart speaker with a woven copper-orange shell and a clock display showing 4:25",
  "copper-notes":
    "Copper Notes clip-on recorder, a brushed copper square with a glowing amber ring",
};

const LIFESTYLE: Record<string, { alt: string; caption: string }> = {
  "/assets/lifestyle/copper-home-desert-light.png": {
    alt: "Copper Home speaker on a stone kitchen counter beside a window with a desert sunset and saguaro cacti",
    caption: "Copper Home keeps the household running while the desert glows.",
  },
  "/assets/lifestyle/copper-notes-stone-desk.png": {
    alt: "Copper Notes recorder and its magnetic clip standing on a stone desk in warm window light",
    caption: "Copper Notes sits on your desk, ready for the next meeting.",
  },
  "/assets/lifestyle/copper-notes-golden-hour.png": {
    alt: "Person in a linen shirt writing in a notebook with a Copper Notes recorder clipped to their pocket",
    caption: "Clip it on and capture every lecture and meeting hands-free.",
  },
};

function SectionHeading({
  title,
  intro,
  className,
}: {
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto mb-10 max-w-2xl text-center", className)}>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {intro && <p className="text-muted-foreground mt-3 text-lg">{intro}</p>}
    </div>
  );
}

function Hero({ products }: { products: Product[] }) {
  return (
    <section
      id="top"
      data-testid="hero"
      className="bg-secondary text-secondary-foreground relative isolate scroll-mt-24 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="from-primary/25 to-background absolute inset-0 -z-10 bg-gradient-to-b via-transparent"
      />
      <div
        aria-hidden="true"
        className="bg-primary/20 absolute top-1/2 right-0 -z-10 size-96 -translate-y-1/2 rounded-full blur-3xl md:right-10"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-24">
        <div className="text-center md:text-left">
          <Badge className="mb-4 h-6 px-3 text-sm">New for 2026</Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Meet Copper Home and Copper Notes
          </h1>
          <p className="mt-4 text-xl sm:text-2xl">{TAGLINE}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <Button
              asChild
              size="lg"
              className="h-11 px-6 text-base shadow-md transition-transform hover:-translate-y-0.5"
            >
              <a href="#products">See products</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 px-6 text-base transition-transform hover:-translate-y-0.5"
            >
              <a href="#plus">See plans</a>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-2 sm:gap-4">
          {products.map((product, index) => (
            <Image
              key={product.id}
              src={product.cutout}
              alt={CUTOUT_ALT[product.id] ?? `${product.name} ${product.type}`}
              width={1254}
              height={1254}
              sizes="(min-width: 768px) 25vw, 45vw"
              loading="eager"
              fetchPriority="high"
              className={cn(
                "float-gentle h-auto w-full drop-shadow-xl",
                index % 2 === 1 && "float-delay",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      data-testid="product-card"
      data-product={product.id}
      className="hover:ring-primary/40 gap-4 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="bg-secondary rounded-2xl p-4">
        <Image
          src={product.cutout}
          alt={CUTOUT_ALT[product.id] ?? `${product.name} ${product.type}`}
          width={1254}
          height={1254}
          sizes="(min-width: 768px) 40vw, 90vw"
          className="mx-auto h-auto w-full max-w-xs"
        />
      </div>
      <ul
        aria-label={`${product.name} finishes`}
        className="flex flex-wrap justify-center gap-4"
      >
        {product.colors.map((color) => (
          <li
            key={color}
            className="text-muted-foreground flex items-center gap-2 text-xs"
          >
            <span
              aria-hidden="true"
              className="ring-foreground/20 size-4 rounded-full ring-1"
              style={{ backgroundColor: SWATCHES[color] }}
            />
            {color}
          </li>
        ))}
      </ul>
      <div className="text-center">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="text-muted-foreground">{product.type}</p>
        <Badge
          variant="secondary"
          className="text-primary mt-2 h-auto px-4 py-1 text-3xl font-bold"
        >
          {formatUsd(product.priceUsd)}
        </Badge>
      </div>
      <ul className="space-y-3">
        {product.features.slice(0, 3).map((feature) => (
          <li key={feature.name}>
            <span className="font-semibold">{feature.name}.</span>{" "}
            <span className="text-muted-foreground">
              {feature.description}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Products({ products }: { products: Product[] }) {
  return (
    <section
      id="products"
      data-testid="products"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 md:py-24"
    >
      <SectionHeading
        title="Two helpers, one Copper"
        intro="Pick the one that fits your day, or bring both home."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function Showcase({ products }: { products: Product[] }) {
  const photos = products.flatMap((product) =>
    product.lifestyle.map((src) => ({ product, src })),
  );
  return (
    <section
      id="showcase"
      data-testid="showcase"
      className="bg-muted scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          title="Made for life in Arizona"
          intro="Copper fits right into sunny kitchens, busy desks and long days."
        />
        <div className="space-y-12">
          {photos.map(({ product, src }, index) => {
            const photo = LIFESTYLE[src];
            return (
              <div
                key={src}
                className="group grid items-center gap-6 md:grid-cols-2 md:gap-10"
              >
                <div
                  className={cn(
                    "relative aspect-video overflow-hidden rounded-3xl shadow-lg",
                    index % 2 === 1 && "md:order-last",
                  )}
                >
                  <Image
                    src={src}
                    alt={photo?.alt ?? `${product.name} in everyday use`}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="border-primary text-center md:border-l-4 md:pl-6 md:text-left">
                  <p className="text-primary text-sm font-semibold tracking-wide uppercase">
                    {product.name}
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {photo?.caption ?? `${product.name}, at home in Arizona.`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const isPlus = plan.id === "copper-plus";
  const rows = [
    ["Monthly price", formatUsd(plan.monthlyUsd)],
    ["Annual price", formatUsd(plan.annualUsd)],
    ["Memory kept", formatMemory(plan.memoryDays)],
    ["Notes recording", formatNotesHours(plan.notesHoursPerMonth)],
    ["Refined answers", plan.refinedAnswers ? "Included" : "Not included"],
  ];
  return (
    <Card
      data-plan={plan.id}
      className={cn(
        "gap-6 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        isPlus && "bg-primary text-primary-foreground ring-primary ring-2",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-2xl font-bold">{plan.name}</h3>
        {isPlus && (
          <Badge className="bg-primary-foreground text-primary h-6 px-3 text-sm">
            Most popular
          </Badge>
        )}
      </div>
      <dl className="space-y-3">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="border-foreground/10 flex items-baseline justify-between gap-4 border-b pb-3 last:border-b-0 last:pb-0"
          >
            <dt className={isPlus ? "" : "text-muted-foreground"}>{label}</dt>
            <dd className="flex items-center justify-end gap-2 text-right text-lg font-semibold">
              {label === "Refined answers" &&
                (value === "Included" ? (
                  <Check aria-hidden="true" className="size-5" />
                ) : (
                  <Minus aria-hidden="true" className="size-5" />
                ))}
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

function Plus({ plans }: { plans: Plan[] }) {
  return (
    <section
      id="plus"
      data-testid="plus-pricing"
      className="mx-auto max-w-4xl scroll-mt-24 px-4 py-16 md:py-24"
    >
      <SectionHeading
        title="Free, or go further with Copper Plus"
        intro="Every Copper device works on the Free plan. Plus adds more memory and more recording."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  );
}

function Privacy() {
  const privacy = getPrivacySummary();
  return (
    <section
      id="privacy"
      data-testid="privacy-summary"
      className="bg-accent text-accent-foreground scroll-mt-24"
    >
      <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-16 md:grid-cols-[1fr_2fr] md:py-24">
        <Image
          src="/assets/brand/copper-mascot.png"
          alt="Copper the robot mascot waving, wearing a yellow hard hat and holding a checklist"
          width={1254}
          height={1254}
          sizes="(min-width: 768px) 25vw, 50vw"
          className="bg-secondary/30 mx-auto h-auto w-1/2 rounded-full p-4 shadow-lg md:w-full"
        />
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your privacy, in plain words
          </h2>
          <p className="mt-2 text-lg">
            How Copper handles what you say and record, under our{" "}
            {privacy.policy} policy.
          </p>
          <ul className="mt-6 space-y-3">
            {privacy.points.map((point) => (
              <li
                key={point}
                className="bg-background/15 flex gap-3 rounded-xl p-4"
              >
                <Check
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const products = getProducts();
  const plans = getPlans();
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero products={products} />
        <Products products={products} />
        <Showcase products={products} />
        <Plus plans={plans} />
        <Privacy />
      </main>
      <SiteFooter />
    </>
  );
}
