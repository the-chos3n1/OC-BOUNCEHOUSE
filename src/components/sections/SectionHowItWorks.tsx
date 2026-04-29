import { howItWorksSteps } from "@/content/site";

export function SectionHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-b border-border py-16 sm:py-20 sm:scroll-mt-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          How it works
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Outline your process below — tighten to match ops, insurance, and deposit policy.
        </p>
        <ol className="mt-12 space-y-10">
          {howItWorksSteps.map((step, i) => (
            <li key={step.title} className="flex gap-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
