import type { Project, Equipment, Testimonial } from "../db/schema";

export const siteConfig = {
  name: "TITAN Build Co.",
  tagline: "Industrial Construction Since 1998",
  phone: "(615) 555-0199",
  email: "bids@titanbuild.co",
  address: "Nashville, TN",
  licensing: "Licensed · Bonded · Insured",
} as const;

export const navItems = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/process", label: "Process" },
  { href: "/fleet", label: "Fleet" },
  { href: "/safety", label: "Safety" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

export const stats = [
  { value: 847, suffix: "+", label: "Projects Completed" },
  { value: 27, suffix: "yrs", label: "Years in Business" },
  { value: 4.2, suffix: "M", label: "Square Feet Built", decimals: 1 },
  { value: 150, suffix: "+", label: "Team Members" },
] as const;

export const featuredProjects: Project[] = [
  {
    id: "1",
    slug: "meridian-tower",
    name: "Meridian Tower",
    type: "commercial",
    status: "in_progress",
    location: "Downtown Nashville, TN",
    sqft: 685000,
    valueCents: 18400000000,
    year: 2025,
    description: "Class A office and retail. Topped out Q3 2025. LEED Platinum target. The largest single contract in company history.",
    client: "Nashville Metro Development",
    completionDate: "Q4 2026",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80&auto=format&fit=crop",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    slug: "riverside-commons",
    name: "Riverside Commons",
    type: "mixed_use",
    status: "completed",
    location: "Chattanooga, TN",
    sqft: 142000,
    valueCents: 4200000000,
    year: 2023,
    description: "Mixed-use development with retail, residential, and green space along the Tennessee River.",
    client: "Chattanooga Riverfront Group",
    completionDate: "March 2023",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop",
    createdAt: new Date("2021-06-01"),
  },
  {
    id: "3",
    slug: "summit-medical-center",
    name: "Summit Medical Center",
    type: "healthcare",
    status: "completed",
    location: "Knoxville, TN",
    sqft: 198000,
    valueCents: 9800000000,
    year: 2024,
    description: "State-of-the-art medical facility with emergency department, surgical suites, and patient tower.",
    client: "Summit Health Systems",
    completionDate: "January 2024",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80&auto=format&fit=crop",
    createdAt: new Date("2022-03-15"),
  },
  {
    id: "4",
    slug: "harbor-point-residences",
    name: "Harbor Point Residences",
    type: "residential",
    status: "completed",
    location: "Memphis, TN",
    sqft: 310000,
    valueCents: 7600000000,
    year: 2023,
    description: "Luxury waterfront condominiums with panoramic Mississippi River views.",
    client: "Harbor Point Developers",
    completionDate: "September 2023",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop",
    createdAt: new Date("2021-09-01"),
  },
  {
    id: "5",
    slug: "eastgate-industrial-park",
    name: "Eastgate Industrial Park",
    type: "industrial",
    status: "in_progress",
    location: "Murfreesboro, TN",
    sqft: 520000,
    valueCents: 5800000000,
    year: 2025,
    description: "Multi-building industrial campus with distribution centers and manufacturing facilities.",
    client: "Eastgate Development Corp",
    completionDate: "Q2 2026",
    image: "https://images.unsplash.com/photo-1590725140246-20acdee442be?w=1200&q=80&auto=format&fit=crop",
    createdAt: new Date("2023-11-01"),
  },
];

export const equipmentList: Equipment[] = [
  {
    id: "1",
    name: "Liebherr LTM 1750",
    model: "LTM 1750-9.1",
    capacity: "750 TON",
    category: "crane",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80&auto=format&fit=crop",
    description: "Heavy structural steel lifts · 350ft boom reach",
    year: 2024,
  },
  {
    id: "2",
    name: "CAT 390F Excavator",
    model: "390F",
    capacity: "90 TON",
    category: "excavator",
    image: "https://images.unsplash.com/photo-1590725140246-20acdee442be?w=1600&q=80&auto=format&fit=crop",
    description: "Deep foundation excavation · 4.5 cubic yard bucket",
    year: 2023,
  },
  {
    id: "3",
    name: "Volvo A60H Hauler",
    model: "A60H",
    capacity: "60 TON",
    category: "hauler",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80&auto=format&fit=crop",
    description: "Site earthwork & grading · 60-ton payload",
    year: 2024,
  },
];

export const phases = [
  { title: "Pre-Construction", desc: "Planning, permits, and site preparation", duration: "2-4 weeks" },
  { title: "Foundation", desc: "Excavation, footings, and concrete pouring", duration: "4-6 weeks" },
  { title: "Structural Framing", desc: "Steel erection and structural systems", duration: "6-10 weeks" },
  { title: "MEP Systems", desc: "Mechanical, electrical, and plumbing", duration: "4-8 weeks" },
  { title: "Finishes", desc: "Interior and exterior finishing work", duration: "6-8 weeks" },
  { title: "Final Inspection", desc: "Punch list, commissioning, and handoff", duration: "2-3 weeks" },
] as const;

export const certifications = [
  "LEED Gold Certified",
  "OSHA VPP Star Site",
  "ISO 9001:2015",
  "Bonded & Insured",
  "DBE/WBE Certified",
  "Zero Lost Time Incidents",
] as const;

export const services = [
  {
    slug: "general-contracting",
    title: "General Contracting",
    description: "Full-service construction management from groundbreaking to ribbon cutting.",
    icon: "building",
  },
  {
    slug: "design-build",
    title: "Design-Build",
    description: "Single-source accountability. We design it, we build it, we own the result.",
    icon: "compass",
  },
  {
    slug: "construction-management",
    title: "Construction Management",
    description: "Expert oversight of your project, keeping timelines and budgets on track.",
    icon: "clipboard",
  },
  {
    slug: "pre-construction",
    title: "Pre-Construction",
    description: "Cost modeling, value engineering, and scheduling before the first shovel hits dirt.",
    icon: "calculator",
  },
  {
    slug: "steel-erection",
    title: "Steel Erection",
    description: "Structural steel, metal building systems, and miscellaneous metals.",
    icon: "wrench",
  },
  {
    slug: "concrete",
    title: "Concrete & Foundations",
    description: "Foundations, slabs, tilt-up panels, and flatwork across the Southeast.",
    icon: "hard-hat",
  },
] as const;

export const testimonials = [
  { id: "1", name: "James Mitchell", company: "Nashville Metro Development", role: "VP of Real Estate", quote: "Titan delivered on every promise. The Meridian Tower project was complex, fast-tracked, and they never missed a milestone.", photo: null, projectId: "1", createdAt: new Date() },
  { id: "2", name: "Dr. Sarah Patel", company: "Summit Health Systems", role: "Chief Facilities Officer", quote: "Healthcare construction requires zero tolerance for error. Titan understood that from day one.", photo: null, projectId: "3", createdAt: new Date() },
  { id: "3", name: "Robert Chen", company: "Eastgate Development Corp", role: "Director of Operations", quote: "They brought order to what could have been chaos. 520,000 square feet and not a single delay attributable to their team.", photo: null, projectId: "5", createdAt: new Date() },
  { id: "4", name: "Maria Gonzalez", company: "Harbor Point Developers", role: "Project Director", quote: "From pre-construction through closeout, Titan's communication was flawless. We knew exactly where every dollar went.", photo: null, projectId: "4", createdAt: new Date() },
  { id: "5", name: "Tom Whitfield", company: "Tennessee Valley Authority", role: "Capital Projects Manager", quote: "They tackled our industrial facility expansion without shutting down active operations. That takes real expertise.", photo: null, projectId: null, createdAt: new Date() },
] as Testimonial[];

export const formatCents = (cents: number): string => {
  if (cents >= 1_000_000_00) {
    return `$${(cents / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  }
  return `$${(cents / 100).toLocaleString("en-US")}`;
};

export const formatSqft = (sqft: number): string => {
  return sqft.toLocaleString("en-US");
};