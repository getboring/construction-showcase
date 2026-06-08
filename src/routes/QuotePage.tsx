import { useRouteMeta } from "../lib/useRouteMeta";
import { PageHero, SectionDivider } from "../components/ui/layout";
import { QuoteRequestForm } from "../components/ui/patterns/QuoteRequestForm";

export function QuotePage() {
  useRouteMeta({
    title: "Request a Quote",
    description: "Tell us about your project and we'll have a real person reach out within 24 hours.",
  });

  return (
    <>
      <PageHero
        label="Get a Quote"
        title="START YOUR PROJECT."
        description="Tell us about your project and we'll have a real person, not a chatbot, reach out within 24 hours."
      />
      <SectionDivider />
      <QuoteRequestForm />
    </>
  );
}