import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SectionHero } from "@/components/sections/SectionHero";
import { SectionFeatures } from "@/components/sections/SectionFeatures";
import { SectionTestimonials } from "@/components/sections/SectionTestimonials";
import { SectionFaq } from "@/components/sections/SectionFaq";
import { SectionRentals } from "@/components/sections/SectionRentals";
import { SectionHowItWorks } from "@/components/sections/SectionHowItWorks";
import { SectionServiceAreas } from "@/components/sections/SectionServiceAreas";
import { SectionContact } from "@/components/sections/SectionContact";
import { BookingSection } from "@/components/booking/BookingSection";

export const metadata: Metadata = buildPageMetadata({
  path: "/",
  description:
    "Book insured bounce house rentals in Orange County for birthdays, church events, and school parties — delivery and setup across North, Central, and South OC zones.",
});

type PageProps = {
  searchParams: Promise<{ unit?: string }>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <>
      <SectionHero />
      <SectionRentals />
      <BookingSection initialUnitId={params.unit} />
      <SectionHowItWorks />
      <SectionFeatures />
      <SectionServiceAreas />
      <SectionTestimonials />
      <SectionFaq />
      <SectionContact />
    </>
  );
}
