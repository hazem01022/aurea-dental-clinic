import Logo from "./Logo";
import { PHONE, WHATSAPP_LINK, INSTAGRAM_LINK, ADDRESS, MAPS_EMBED, HOURS } from "./contact";

const Footer = () => (
  <footer className="bg-foreground text-background pt-20 pb-10">
    <div className="container grid md:grid-cols-4 gap-12 mb-16">
      <div className="md:col-span-2">
        <Logo className="text-background [&_span]:text-background" />
        <p className="mt-6 max-w-sm font-serif text-2xl leading-snug text-background/85">
          Premium dental care, <span className="italic text-gold">delivered with calm.</span>
        </p>

        <div className="mt-8 flex items-center gap-3">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-11 h-11 rounded-full bg-[hsl(142,70%,38%)] hover:bg-[hsl(142,70%,32%)] flex items-center justify-center transition-colors"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="white" aria-hidden>
              <path d="M20.52 3.48A11.78 11.78 0 0 0 12 0C5.37 0 0 5.37 0 12a11.92 11.92 0 0 0 1.64 6L0 24l6.18-1.62A12 12 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52ZM12 22a9.93 9.93 0 0 1-5.07-1.39l-.36-.21-3.67.96.98-3.58-.23-.37A9.94 9.94 0 1 1 22 12c0 5.52-4.48 10-10 10Z"/>
            </svg>
          </a>
          <a
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-11 h-11 rounded-full bg-gradient-to-tr from-[hsl(340,75%,50%)] via-[hsl(20,90%,55%)] to-[hsl(45,95%,60%)] hover:opacity-90 flex items-center justify-center transition-opacity"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="1.8" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
            </svg>
          </a>
        </div>
      </div>

      <div>
        <p className="text-xs tracking-luxe uppercase text-gold mb-5">Visit</p>
        <p className="text-background/80 leading-relaxed text-sm">
          {ADDRESS}
        </p>
        <p className="mt-4 text-background/60 text-sm">{HOURS}</p>
      </div>

      <div>
        <p className="text-xs tracking-luxe uppercase text-gold mb-5">Contact</p>
        <ul className="space-y-2 text-background/80">
          <li><a href={`tel:${PHONE}`} className="hover:text-gold">{PHONE}</a></li>
          <li><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-gold">WhatsApp · {PHONE}</a></li>
          <li><a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-gold">Instagram</a></li>
        </ul>
      </div>
    </div>

    <div className="container">
      <div className="aspect-[16/6] w-full overflow-hidden border border-background/10">
        <iframe
          title="Aurea Dental Clinic location"
          src={MAPS_EMBED}
          className="w-full h-full grayscale opacity-90"
          loading="lazy"
        />
      </div>
    </div>

    <div className="container mt-10 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between gap-4 text-xs tracking-wide text-background/50">
      <p>© {new Date().getFullYear()} Aurea Dental Clinic. All rights reserved.</p>
      <p>Crafted with care.</p>
    </div>
  </footer>
);

export default Footer;
