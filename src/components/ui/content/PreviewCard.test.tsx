// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { PreviewCard } from "./PreviewCard";
import type { Project } from "../../../db/schema";

const mockProject: Project = {
  id: "1",
  slug: "meridian-tower",
  name: "Meridian Tower",
  type: "commercial",
  status: "in_progress",
  location: "Downtown Nashville, TN",
  sqft: 685000,
  valueCents: 18400000000,
  year: 2025,
  description: "Class A office and retail.",
  client: "Nashville Metro Development",
  completionDate: "Q4 2026",
  image: "https://example.com/photo.jpg",
  createdAt: new Date("2024-01-15"),
};

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe("PreviewCard", () => {
  it("renders project name", () => {
    renderWithRouter(<PreviewCard project={mockProject} />);
    expect(screen.getByText("MERIDIAN TOWER")).toBeInTheDocument();
  });

  it("renders status badge", () => {
    renderWithRouter(<PreviewCard project={mockProject} />);
    expect(screen.getByText("in progress")).toBeInTheDocument();
  });

  it("renders project type badge", () => {
    renderWithRouter(<PreviewCard project={mockProject} />);
    expect(screen.getByText("commercial")).toBeInTheDocument();
  });

  it("renders formatted area", () => {
    renderWithRouter(<PreviewCard project={mockProject} />);
    expect(screen.getByText(/685,000 sq ft/)).toBeInTheDocument();
  });

  it("renders project location", () => {
    renderWithRouter(<PreviewCard project={mockProject} />);
    expect(screen.getByText("Downtown Nashville, TN")).toBeInTheDocument();
  });

  it("renders link to project detail", () => {
    renderWithRouter(<PreviewCard project={mockProject} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/projects/meridian-tower");
  });

  it("renders project image with dimensions", () => {
    renderWithRouter(<PreviewCard project={mockProject} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("width", "1600");
    expect(img).toHaveAttribute("height", "900");
  });
});