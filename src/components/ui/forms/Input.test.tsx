// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { NumberField } from "./NumberField";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input placeholder="Enter value" />);
    expect(screen.getByPlaceholderText("Enter value")).toBeInTheDocument();
  });

  it("applies default border styles", () => {
    render(<Input name="test" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("border-steel-700");
  });

  it("applies error border styles", () => {
    render(<Input error name="test" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("border-red-500");
  });

  it("passes through HTML attributes", () => {
    render(<Input name="email" type="email" required />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toBeRequired();
  });
});

describe("Textarea", () => {
  it("renders a textarea element", () => {
    render(<Textarea placeholder="Enter details" />);
    expect(screen.getByPlaceholderText("Enter details")).toBeInTheDocument();
  });

  it("applies default border styles", () => {
    render(<Textarea name="desc" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea.className).toContain("border-steel-700");
  });

  it("applies error border styles", () => {
    render(<Textarea error name="desc" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea.className).toContain("border-red-500");
  });

  it("has minimum height", () => {
    render(<Textarea name="desc" />);
    expect(screen.getByRole("textbox").className).toContain("min-h-[120px]");
  });
});

describe("NumberField", () => {
  it("renders input with type=number", () => {
    render(<NumberField name="budget" />);
    const input = document.querySelector('input[type="number"]');
    expect(input).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<NumberField name="budget" label="Budget" />);
    const label = screen.getByText("Budget");
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "budget");
  });

  it("associates label with input via htmlFor/id", () => {
    render(<NumberField name="budget" label="Budget" />);
    const label = screen.getByText("Budget");
    const input = document.getElementById("budget");
    expect(label.getAttribute("for")).toBe(input?.id);
  });

  it("uses custom id when provided", () => {
    render(<NumberField name="budget" id="custom-id" label="Budget" />);
    const input = document.getElementById("custom-id");
    expect(input).toBeInTheDocument();
    expect(screen.getByText("Budget")).toHaveAttribute("for", "custom-id");
  });

  it("applies error border styles", () => {
    render(<NumberField error name="budget" />);
    const input = document.querySelector('input[type="number"]');
    expect(input?.className).toContain("border-red-500");
  });

  it("removes spin buttons", () => {
    render(<NumberField name="budget" />);
    const input = document.querySelector('input[type="number"]');
    expect(input?.className).toContain("appearance-none");
  });
});