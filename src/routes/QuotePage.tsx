import { useEffect } from "react";
import { PageHero, SectionDivider } from "../components/ui/layout";
import { QuoteRequestForm } from "../components/ui/patterns/QuoteRequestForm";

export function QuotePage() {
  useEffect(() => { document.title = "Request a Quote | Titan Build Co."; }, []);
  return (
    <>
      <PageHero
        label="Get a Quote"
        title="START YOUR PROJECT."
        description="Tell us about your project and we'll have a real person—not a chatbot—reach out within 24 hours."
      />
      <SectionDivider />
      <QuoteRequestForm />
    </>
  );
}