import { PHONE, WHATSAPP_LINK, ADDRESS, MAPS_LINK, HOURS } from "./contact";

const Booking = () => {
  return (
    <section id="contact" className="py-24 md:py-36 bg-cream-deep">
      <div className="container grid md:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8">
            Book <span className="italic text-gold">Appointment</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md">
            Reach out by phone or WhatsApp — we usually reply within minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`tel:${PHONE}`}
              className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-5 bg-foreground text-background hover:bg-gold transition-all duration-500 text-xs tracking-luxe uppercase shadow-elegant"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>
              </svg>
              Call Us
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-5 bg-[hsl(142,70%,38%)] text-white hover:bg-[hsl(142,70%,32%)] transition-all duration-500 text-xs tracking-luxe uppercase shadow-elegant"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
                <path d="M20.52 3.48A11.78 11.78 0 0 0 12 0C5.37 0 0 5.37 0 12a11.92 11.92 0 0 0 1.64 6L0 24l6.18-1.62A12 12 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52ZM12 22a9.93 9.93 0 0 1-5.07-1.39l-.36-.21-3.67.96.98-3.58-.23-.37A9.94 9.94 0 1 1 22 12c0 5.52-4.48 10-10 10Z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>

        <div className="bg-background p-8 md:p-10 shadow-soft">
          <h3 className="font-serif text-3xl md:text-5xl leading-[0.95] mb-6">
            Our <span className="italic text-gold">Location</span>
          </h3>

          <div className="space-y-6">
            <div>
              <p className="text-xs tracking-luxe uppercase text-muted-foreground mb-2">Address</p>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-xl md:text-2xl leading-snug hover:text-gold transition-colors block"
              >
                {ADDRESS}
              </a>
            </div>

            <div className="border-t border-border pt-6">
              <p className="text-xs tracking-luxe uppercase text-muted-foreground mb-2">Working Hours</p>
              <p className="font-serif text-xl md:text-2xl">{HOURS}</p>
            </div>

            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs tracking-luxe uppercase text-foreground hover:text-gold transition-colors pt-2"
            >
              Get Directions
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
