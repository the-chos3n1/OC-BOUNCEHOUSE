import type { Metadata } from "next";
import { howItWorksSteps } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/how-it-works",
  titleSegment: "How it works",
  description:
    "How bounce house rentals work in OC — choose your unit and zone, scheduled delivery with setup and safety briefing, then pickup after your birthday, church, or school event.",
});

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight">How it works</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Placeholder process copy — tighten to match your ops, insurance, and deposit policy.
      </p>
      <ol className="mt-12 space-y-10">
        {howItWorksSteps.map((step, i) => (
          <li key={step.title} className="flex gap-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {i + 1}
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold">{step.title}</h2>
              <p className="mt-2 text-muted-foreground">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
