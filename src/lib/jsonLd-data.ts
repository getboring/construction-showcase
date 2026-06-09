export const organizationLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "J.A. Street & Associates",
  url: "https://jastreet.com",
  logo: "https://jastreet.com/favicon.svg",
  description: "Respected general contracting firm in Northeast Tennessee and Southwest Virginia. Commercial, industrial, and institutional construction since 1985.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Blountville",
    addressRegion: "TN",
    addressCountry: "US",
  },
  telephone: "(423) 323-8017",
  email: "jastreet@jastreet.com",
  sameAs: [],
  foundingDate: "1985",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: 35,
  },
};

export const localBusinessLd: Record<string, unknown> = {
  ...organizationLd,
  "@type": "LocalBusiness",
  "@id": "https://jastreet.com",
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
