import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod/v4";
import { Section, Container } from "../layout";
import { Button } from "../primitives";
import { Input } from "../forms/Input";
import { Textarea } from "../forms/Textarea";
import { getFieldError } from "../../../lib/getFieldError";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Valid email required"),
  phone: z.string(),
  message: z.string().min(10, "Please provide more detail (10+ characters)"),
});

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validators: {
      onSubmit: contactSchema,
    },
    onSubmit: ({ value }) => {
      void value;
      setSubmitted(true);
    },
  });

  if (submitted) {
    return (
      <Section className={className}>
        <Container className="max-w-2xl text-center">
          <p className="font-mono text-amber-500 text-xs uppercase tracking-[0.2em] mb-4">Message Sent</p>
          <h3 className="font-display text-4xl text-zinc-50 mb-4">WE'LL BE IN TOUCH.</h3>
          <p className="text-steel-400">A member of our team will reach out within 24 hours.</p>
        </Container>
      </Section>
    );
  }

  return (
    <Section className={className}>
      <Container className="max-w-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void form.handleSubmit();
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form.Field name="name">
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">
                    Full Name
                  </label>
                  <Input
                    id="contact-name"
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
                  <label htmlFor="contact-email" className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">
                    Email
                  </label>
                  <Input
                    id="contact-email"
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

          <form.Field name="phone">
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-phone" className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">
                  Phone (Optional)
                </label>
                <Input
                  id="contact-phone"
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

          <form.Field name="message">
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Tell us about your project..."
                  rows={5}
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

          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="lg">Send Message</Button>
          </div>
        </form>
      </Container>
    </Section>
  );
}