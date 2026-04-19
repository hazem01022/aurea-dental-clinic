import { useState } from "react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { PHONE, PHONE_INTL, WHATSAPP_LINK } from "./contact";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(6, "Please enter a valid phone").max(25),
  service: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(500).optional().or(z.literal("")),
});

const services = [
  "Glow — Whitening & Cleaning",
  "Perfect — Veneers & Smile Design",
  "Protect — Checkup & Gum Care",
  "Restore — Fillings, Crowns, Implants",
  "Align — Braces & Aligners",
  "Gentle — Kids & Emergency",
];

const Booking = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast({ title: "Please check your details", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSubmitting(true);

    const text = `New Appointment Request%0A%0AName: ${encodeURIComponent(parsed.data.name)}%0APhone: ${encodeURIComponent(parsed.data.phone)}%0AService: ${encodeURIComponent(parsed.data.service || "—")}%0AMessage: ${encodeURIComponent(parsed.data.message || "—")}`;
    window.open(`https://wa.me/${PHONE_INTL}?text=${text}`, "_blank", "noopener");

    toast({ title: "Opening WhatsApp…", description: "We'll confirm your appointment shortly." });
    form.reset();
    setSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-cream-deep">
      <div className="container grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8">
            Book <span className="italic text-gold">Appointment</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md">
            Reach out by phone, WhatsApp, or fill in the form — we usually reply within minutes.
          </p>

          <div className="space-y-5">
            <a href={`tel:${PHONE}`} className="group flex items-center gap-5 border-t border-border pt-5">
              <span className="text-xs tracking-luxe uppercase text-muted-foreground w-20">Call</span>
              <span className="font-serif text-2xl md:text-3xl group-hover:text-gold transition-colors">{PHONE}</span>
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 border-t border-border pt-5">
              <span className="text-xs tracking-luxe uppercase text-muted-foreground w-20">WhatsApp</span>
              <span className="font-serif text-2xl md:text-3xl group-hover:text-gold transition-colors">{PHONE}</span>
            </a>
            <div className="flex items-start gap-5 border-t border-border pt-5">
              <span className="text-xs tracking-luxe uppercase text-muted-foreground w-20">Hours</span>
              <span className="font-serif text-xl">Sat – Thu · 11:00 – 21:00</span>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="bg-background p-8 md:p-10 shadow-soft">
          <div className="space-y-6">
            <div>
              <label className="text-xs tracking-luxe uppercase text-muted-foreground">Name</label>
              <input name="name" required maxLength={80} className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-lg font-serif transition-colors" placeholder="Your full name" />
            </div>
            <div>
              <label className="text-xs tracking-luxe uppercase text-muted-foreground">Phone</label>
              <input name="phone" required maxLength={25} type="tel" className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-lg font-serif transition-colors" placeholder="01xxxxxxxxx" />
            </div>
            <div>
              <label className="text-xs tracking-luxe uppercase text-muted-foreground">Service</label>
              <select name="service" className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-lg font-serif transition-colors">
                <option value="">Select a service</option>
                {services.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs tracking-luxe uppercase text-muted-foreground">Message</label>
              <textarea name="message" rows={3} maxLength={500} className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-base font-sans transition-colors resize-none" placeholder="Tell us briefly what you need" />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-4 px-8 py-4 text-xs tracking-luxe uppercase bg-foreground text-background hover:bg-gold transition-all duration-500 disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Request Appointment"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Booking;
