import type { Project, Equipment, Testimonial } from "../db/schema";

export const siteConfig = {
  name: "J.A. Street & Associates",
  tagline: "General Contractors Since 1985",
  phone: "(423) 323-8017",
  email: "jastreet@jastreet.com",
  address: "245 Birch Street, Blountville, TN 37617",
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
  { value: 41, suffix: "yrs", label: "Years in Business" },
  { value: 15, suffix: "+", label: "AGC Awards" },
  { value: 6, suffix: "x", label: "Circle of Excellence" },
  { value: 35, suffix: "%", label: "Employee-Owned" },
] as const;

export const featuredProjects: Project[] = [
  {
    id: "1",
    slug: "seaman-corporation-phase-i",
    name: "Seaman Corporation Phase I",
    type: "industrial",
    status: "in_progress",
    location: "Bristol, TN",
    sqft: 102000,
    valueCents: 8500000000,
    year: 2025,
    description: "102,000 SF industrial facility. New construction for Seaman Corporation in the Tri-Cities region.",
    client: "Seaman Corporation",
    completionDate: "Q4 2025",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80&auto=format&fit=crop",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    slug: "towne-acres-elementary-school",
    name: "Towne Acres Elementary School",
    type: "commercial",
    status: "in_progress",
    location: "Johnson City, TN",
    sqft: 65000,
    valueCents: 2200000000,
    year: 2025,
    description: "New school construction for the Johnson City school system.",
    client: "Johnson City Schools",
    completionDate: "Q3 2025",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop",
    createdAt: new Date("2023-06-01"),
  },
  {
    id: "3",
    slug: "food-city-store-706",
    name: "Food City Store 706",
    type: "commercial",
    status: "completed",
    location: "Highway 58, TN",
    sqft: 48000,
    valueCents: 6200000000,
    year: 2023,
    description: "Retail grocery construction for Food City on Highway 58.",
    client: "K-VA-T Food Stores",
    completionDate: "March 2023",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80&auto=format&fit=crop",
    createdAt: new Date("2022-01-10"),
  },
  {
    id: "4",
    slug: "blountville-recreational-center",
    name: "Blountville Recreational Center",
    type: "commercial",
    status: "in_progress",
    location: "Blountville, TN",
    sqft: 35000,
    valueCents: 4800000000,
    year: 2025,
    description: "Community recreational facility for Sullivan County.",
    client: "Sullivan County",
    completionDate: "Q1 2026",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop",
    createdAt: new Date("2024-03-01"),
  },
  {
    id: "5",
    slug: "wallace-ford-dealership",
    name: "Wallace Ford Dealership",
    type: "commercial",
    status: "completed",
    location: "Bristol, TN",
    sqft: 32000,
    valueCents: 5400000000,
    year: 2022,
    description: "Automotive dealership facility construction.",
    client: "Wallace Ford",
    completionDate: "November 2022",
    image: "https://images.unsplash.com/photo-1590725140246-20acdee442be?w=1200&q=80&auto=format&fit=crop",
    createdAt: new Date("2021-09-15"),
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
  "AGC Contractor of the Year (15+ Awards)",
  "AGC Circle of Excellence (6-time Winner)",
  "Tennessee Governor's Environmental Stewardship Award",
  "LEED Certified Projects",
  "Employee Stock Ownership Plan (ESOP)",
  "Bonded & Insured",
] as const;

export const services = [
  {
    slug: "pre-construction",
    title: "Pre-Construction Services",
    description: "Laying the groundwork. Planning, cost modeling, value engineering, and scheduling before the first shovel hits dirt.",
    icon: "calculator",
  },
  {
    slug: "design",
    title: "Design Services",
    description: "An appropriate game plan is key to any successful project. Full design-build and design-assist capabilities.",
    icon: "compass",
  },
  {
    slug: "construction",
    title: "Construction Services",
    description: "Working as your construction manager. Full-service general contracting from groundbreaking to ribbon cutting.",
    icon: "building",
  },
  {
    slug: "build-to-suit",
    title: "Build to Suit",
    description: "A hands-on approach. Custom facilities designed and built to your exact specifications.",
    icon: "hard-hat",
  },
] as const;

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Steven C. Smith",
    company: "Food City",
    role: "President/CEO",
    quote: "For a number of years Food City has enjoyed a successful working relationship with J. A. Street and Associates. Our company has benefited greatly from the successful and timely completion of numerous projects entrusted to J. A. Street. We are confident in their abilities and expertise and have found that they operate in a timely and professional manner.",
    photo: null,
    projectId: "3",
    createdAt: new Date("2024-06-01"),
  },
  {
    id: "2",
    name: "Dennis Phillips",
    company: "City of Kingsport, TN",
    role: "Mayor",
    quote: "During my ten years as Mayor of the City of Kingsport, Tennessee, I had the pleasure of working with J.A. Street & Associates on a variety of projects. One of the more notable was the redevelopment of an industrial site. Without Jim's and the J. A. Street team's creativity and input, the project would never have materialized.",
    photo: null,
    projectId: null,
    createdAt: new Date("2024-07-15"),
  },
  {
    id: "3",
    name: "David Kidd",
    company: "Emory & Henry College",
    role: "Director of Capital Designs",
    quote: "I have found the J. A. Street team to be responsive and conscientious for our end goal and associated budget while understanding the importance of schedule for the new class year.",
    photo: null,
    projectId: null,
    createdAt: new Date("2024-08-20"),
  },
];

export const teamMembers = [
  {
    name: "J.A. Street, P.E.",
    role: "CEO & President",
    bio: "Jim was graduated from Virginia Tech with a degree in Civil Engineering. He spent 13 years as a construction company project manager and vice president before starting J. A. Street & Associates in 1985.",
    photo: "https://jastreet.com/wp-content/uploads/2022/10/Headshot_JAStreet.jpeg",
  },
  {
    name: "Mark Wininger",
    role: "Vice President",
    bio: null,
    photo: "https://jastreet.com/wp-content/uploads/2022/10/Headshot_Mark-Wininger-2019-01.jpeg",
  },
  {
    name: "Don Osborne",
    role: "VP, Operations",
    bio: null,
    photo: "https://jastreet.com/wp-content/uploads/2025/02/Don.jpg",
  },
  {
    name: "Terry Hopkins",
    role: "Safety Director",
    bio: null,
    photo: "https://jastreet.com/wp-content/uploads/2025/02/Terry.jpg",
  },
];

export const formatCents = (cents: number): string => {
  if (cents >= 1_000_000_000) {
    return `$${(cents / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  }
  return `$${(cents / 100).toLocaleString("en-US")}`;
};

export const formatSqft = (sqft: number): string => {
  return sqft.toLocaleString("en-US");
};
