import { useRouteMeta } from "../lib/useRouteMeta";
import { PageHero, SectionDivider } from "../components/ui/layout";
import { ContactForm } from "../components/ui/patterns/ContactForm";
import { siteConfig } from "../lib/data";

export function ContactPage() {
  useRouteMeta({
    title: "Contact",
    description: "Get in touch with Titan Build Co. Whether you're ready to break ground or just exploring options, we're here.",
  });

  return (
    <>
      <PageHero
        label="Contact"
        title="LET'S TALK."
        description="Whether you're ready to break ground or just exploring options, we're here."
      />
      <SectionDivider />
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <div className="bg-steel-900 border border-steel-800 rounded-lg p-8 space-y-8">
              <div>
                <h3 className="font-display text-xl text-zinc-50 mb-3">OFFICE</h3>
                <p className="text-steel-400 text-sm leading-relaxed">{siteConfig.address}</p>
              </div>
              <div>
                <h3 className="font-display text-xl text-zinc-50 mb-3">PHONE</h3>
                <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`} className="text-amber-500 hover:text-amber-400 transition-colors font-mono text-sm">{siteConfig.phone}</a>
              </div>
              <div>
                <h3 className="font-display text-xl text-zinc-50 mb-3">EMAIL</h3>
                <a href={`mailto:${siteConfig.email}`} className="text-amber-500 hover:text-amber-400 transition-colors font-mono text-sm">{siteConfig.email}</a>
              </div>
              <div>
                <h3 className="font-display text-xl text-zinc-50 mb-3">HOURS</h3>
                <p className="text-steel-400 text-sm">Monday - Friday: 7:00 AM - 5:00 PM</p>
                <p className="text-steel-400 text-sm">Saturday: By appointment</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}