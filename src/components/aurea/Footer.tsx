import Logo from "./Logo";
import { PHONE, WHATSAPP_LINK } from "./contact";

const Footer = () => (
  <footer className="bg-foreground text-background pt-20 pb-10">
    <div className="container grid md:grid-cols-4 gap-12 mb-16">
      <div className="md:col-span-2">
        <Logo className="text-background [&_span]:text-background" />
        <p className="mt-6 max-w-sm font-serif text-2xl leading-snug text-background/85">
          Premium dental care, <span className="italic text-gold">delivered with calm.</span>
        </p>
      </div>

      <div>
        <p className="text-xs tracking-luxe uppercase text-gold mb-5">Visit</p>
        <p className="text-background/80 leading-relaxed">
          Aurea Dental Clinic<br />
          Cairo, Egypt
        </p>
        <p className="mt-4 text-background/60 text-sm">Sat – Thu · 11:00 – 21:00</p>
      </div>

      <div>
        <p className="text-xs tracking-luxe uppercase text-gold mb-5">Contact</p>
        <ul className="space-y-2 text-background/80">
          <li><a href={`tel:${PHONE}`} className="hover:text-gold">{PHONE}</a></li>
          <li><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-gold">WhatsApp · {PHONE}</a></li>
        </ul>
      </div>
    </div>

    <div className="container">
      <div className="aspect-[16/6] w-full overflow-hidden border border-background/10">
        <iframe
          title="Aurea Dental Clinic location"
          src="https://www.google.com/maps?q=Cairo,Egypt&output=embed"
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
