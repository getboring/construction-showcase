export const organizationLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TITAN Build Co.",
  url: "https://titanbuild.co",
  logo: "https://titanbuild.co/favicon.svg",
  description: "Industrial construction since 1998. Commercial, healthcare, industrial, and residential construction across the Southeast.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nashville",
    addressRegion: "TN",
    addressCountry: "US",
  },
  telephone: "(615) 555-0199",
  email: "bids@titanbuild.co",
  sameAs: [],
  foundingDate: "1998",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: 150,
  },
};

export const localBusinessLd: Record<string, unknown> = {
  ...organizationLd,
  "@type": "LocalBusiness",
  "@id": "https://titanbuild.co",
  priceRange: "$$$$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "17:00",
    },
  ],
};

export function projectLd(project: {
  name: string;
  description: string;
  image: string;
  location: string;
  sqft: number;
  year: number;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Project",
    name: project.name,
    description: project.description,
    image: project.image,
    location: project.location,
    areaServed: project.location,
    spatialCoverage: {
      "@type": "Place",
      name: project.location,
    },
  };
}

export function faqLd(faqs: Array<{ q: string; a: string }>): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}
