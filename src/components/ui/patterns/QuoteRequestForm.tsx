import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod/v4";
import { Section, Container, SectionHeader } from "../layout";
import { Button } from "../primitives";
import { Input } from "../forms/Input";
import { Textarea } from "../forms/Textarea";
import { Select } from "../forms/Select";
import { ProgressBar } from "../primitives/Progress";
import { getFieldError } from "../../../lib/getFieldError";

type Step = "project" | "details" | "contact";

const projectSchema = z.object({
  projectType: z.string().min(1, "Select a project type"),
  timeline: z.string().min(1, "Select a timeline"),
  budgetCents: z.string().min(1, "Select a budget range"),
});

const detailsSchema = z.object({
  scope: z.string().min(20, "Tell us more (20+ characters)"),
});

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Valid email required"),
  phone: z.string(),
  company: z.string(),
});

const fullSchema = projectSchema.merge(detailsSchema).merge(contactSchema);

const projectTypes = [
  { value: "commercial", label: "Commercial" },
  { value: "residential", label: "Residential" },
  { value: "industrial", label: "Industrial" },
  { value: "healthcare", label: "Healthcare" },
  { value: "mixed_use", label: "Mixed Use" },
];

const timelines = [
  { value: "urgent", label: "Urgent (< 3 months)" },
  { value: "3-6mo", label: "3 - 6 months" },
  { value: "6-12mo", label: "6 - 12 months" },
  { value: "planning", label: "Planning phase" },
];

const budgetRanges = [
  { value: "0", label: "Under $1M" },
  { value: "100000000", label: "$1M - $5M" },
  { value: "500000000", label: "$5M - $25M" },
  { value: "2500000000", label: "$25M - $100M" },
  { value: "10000000000", label: "$100M+" },
];

export function QuoteRequestForm() {
  const [step, setStep] = useState<Step>("project");
  const [submitted, setSubmitted] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm({
    defaultValues: {
      projectType: "",
      timeline: "",
      budgetCents: "",
      scope: "",
      name: "",
      email: "",
      phone: "",
      company: "",
    } as { projectType: string; timeline: string; budgetCents: string; scope: string; name: string; email: string; phone: string; company: string },
    validators: {
      onSubmit: fullSchema,
    },
    onSubmit: async () => {
      setSubmitted(true);
    },
  });

  if (submitted) {
    return (
      <Section>
        <Container className="max-w-2xl text-center">
          <p className="font-mono text-amber-500 text-xs uppercase tracking-[0.2em] mb-4">Quote Request Received</p>
          <h3 className="font-display text-4xl md:text-5xl text-zinc-50 mb-4">WE'LL BE IN TOUCH.</h3>
          <p className="text-steel-400">Our team reviews every request within 24 hours. Expect a call from a project manager, not a salesperson.</p>
        </Container>
      </Section>
    );
  }

  const steps: { key: Step; label: string; num: number }[] = [
    { key: "project", label: "Project Type", num: 1 },
    { key: "details", label: "Scope", num: 2 },
    { key: "contact", label: "Your Info", num: 3 },
  ];

  function validateCurrentStep(): boolean {
    const values = form.state.values;
    if (step === "project") {
      return !!(values.projectType && values.timeline && values.budgetCents);
    }
    if (step === "details") {
      return values.scope.length >= 20;
    }
    return !!(values.name.length >= 2 && values.email.includes("@"));
  }

  function next() {
    if (!validateCurrentStep()) {
      void form.validate("submit");
      return;
    }
    if (step === "project") setStep("details");
    else if (step === "details") setStep("contact");
  }

  function back() {
    if (step === "details") setStep("project");
    else if (step === "contact") setStep("details");
  }

  return (
    <Section>
      <Container className="max-w-2xl">
        <SectionHeader label="Get a Quote" title="TELL US ABOUT YOUR PROJECT" />

        <div className="flex items-center gap-4 mb-10">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-4 flex-1">
              <div className={`flex items-center gap-3 ${step === s.key ? "text-amber-500" : "text-steel-500"}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                  step === s.key ? "bg-amber-500 text-steel-950" : "bg-steel-800 text-steel-400"
                }`}>
                  {s.num}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest hidden md:inline">{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className="flex-1 h-px bg-steel-800" />}
            </div>
          ))}
        </div>

        <ProgressBar
          value={step === "project" ? 33 : step === "details" ? 66 : 100}
          label=""
          showValue={false}
          className="mb-10"
        />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step === "contact") {
              form.handleSubmit();
            }
          }}
          className="space-y-6"
        >
          {step === "project" && (
            <div className="space-y-6">
              <form.Field name="projectType">
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">Project Type</label>
                    <Select
                      name="projectType"
                      options={projectTypes}
                      value={field.state.value}
                      onValueChange={(v) => field.handleChange(v ?? "")}
                      error={field.state.meta.errors.length > 0}
                    />
                    {field.state.meta.errors.map((err: unknown) => (
                      <p key={String(err)} className="font-mono text-[10px] text-red-400">
                        {getFieldError(err)}
                      </p>
                    ))}
                  </div>
                )}
              </form.Field>

              <form.Field name="timeline">
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">Timeline</label>
                    <Select
                      name="timeline"
                      options={timelines}
                      value={field.state.value}
                      onValueChange={(v) => field.handleChange(v ?? "")}
                      error={field.state.meta.errors.length > 0}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="budgetCents">
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">Budget Range</label>
                    <Select
                      name="budgetCents"
                      options={budgetRanges}
                      value={field.state.value}
                      onValueChange={(v) => field.handleChange(v ?? "")}
                      error={field.state.meta.errors.length > 0}
                    />
                  </div>
                )}
              </form.Field>

              <div className="flex justify-end">
                <Button type="button" variant="primary" size="lg" onClick={next}>Continue</Button>
              </div>
            </div>
          )}

          {step === "details" && (
            <div className="space-y-6">
              <form.Field name="scope">
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">
                      Project Scope
                    </label>
                    <p className="font-mono text-[10px] text-steel-600 mb-1">
                      Describe the work, square footage, and any special requirements.
                    </p>
                    <Textarea
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="We're planning a 50,000 sq ft healthcare facility in Nashville..."
                      rows={6}
                      error={field.state.meta.errors.length > 0}
                    />
                    {field.state.meta.errors.map((err: unknown) => (
                      <p key={String(err)} className="font-mono text-[10px] text-red-400">
                        {getFieldError(err)}
                      </p>
                    ))}
                  </div>
                )}
              </form.Field>
              <div className="flex justify-between">
                <Button type="button" variant="outline" size="lg" onClick={back}>Back</Button>
                <Button type="button" variant="primary" size="lg" onClick={next}>Continue</Button>
              </div>
            </div>
          )}

          {step === "contact" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <form.Field name="name">
                  {(field) => (
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">Full Name</label>
                      <Input
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="John Doe"
                        error={field.state.meta.errors.length > 0}
                      />
                      {field.state.meta.errors.map((err: unknown) => (
                        <p key={String(err)} className="font-mono text-[10px] text-red-400">
                          {getFieldError(err)}
                        </p>
                      ))}
                    </div>
                  )}
                </form.Field>
                <form.Field name="email">
                  {(field) => (
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">Email</label>
                      <Input
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="john@example.com"
                        error={field.state.meta.errors.length > 0}
                      />
                      {field.state.meta.errors.map((err: unknown) => (
                        <p key={String(err)} className="font-mono text-[10px] text-red-400">
                          {getFieldError(err)}
                        </p>
                      ))}
                    </div>
                  )}
                </form.Field>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <form.Field name="phone">
                  {(field) => (
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">Phone (Optional)</label>
                      <Input
                        name={field.name}
                        type="tel"
                        value={field.state.value ?? ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="(615) 555-0199"
                      />
                    </div>
                  )}
                </form.Field>
                <form.Field name="company">
                  {(field) => (
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">Company (Optional)</label>
                      <Input
                        name={field.name}
                        value={field.state.value ?? ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="Acme Corp"
                      />
                    </div>
                  )}
                </form.Field>
              </div>
              <div className="flex justify-between">
                <Button type="button" variant="outline" size="lg" onClick={back}>Back</Button>
                <Button type="submit" variant="primary" size="lg">Submit Request</Button>
              </div>
            </div>
          )}
        </form>
      </Container>
    </Section>
  );
}