const services = [
  { tag: "01", title: "Glow", items: "Cleaning · Polishing · Whitening", desc: "That fresh, just-left-the-dentist shine." },
  { tag: "02", title: "Perfect", items: "Veneers · Smile Design · Contouring", desc: "Shape, smooth, and elevate your smile." },
  { tag: "03", title: "Protect", items: "Checkups · X-rays · Gum Care", desc: "Healthy teeth, always." },
  { tag: "04", title: "Restore", items: "Fillings · Crowns · Implants", desc: "Strong, natural-looking results." },
  { tag: "05", title: "Align", items: "Braces · Clear Aligners · Retainers", desc: "Straight teeth, softly." },
  { tag: "06", title: "Gentle", items: "Kids Dentistry · Emergency Care", desc: "Calm, stress-free visits for everyone." },
];

const Services = () => (
  <section id="services" className="py-24 md:py-36">
    <div className="container">
      <div className="max-w-2xl mb-16 md:mb-24">
        <p className="text-xs tracking-luxe uppercase text-gold mb-4">Our Services</p>
        <h2 className="font-serif text-4xl md:text-6xl leading-tight">
          Considered care for <span className="italic text-gold">every smile.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {services.map((s) => (
          <article
            key={s.tag}
            className="group bg-background p-8 md:p-10 hover:bg-cream-deep transition-colors duration-500 cursor-default"
          >
            <div className="flex items-baseline justify-between mb-6">
              <span className="font-serif text-sm text-gold">{s.tag}</span>
              <span className="w-10 h-px bg-foreground/20 group-hover:bg-gold group-hover:w-16 transition-all duration-500" />
            </div>
            <h3 className="font-serif text-3xl md:text-4xl mb-3">{s.title}</h3>
            <p className="text-sm text-foreground/70 mb-4">{s.items}</p>
            <p className="text-base text-muted-foreground leading-relaxed">{s.desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
