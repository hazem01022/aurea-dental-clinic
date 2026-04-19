const services = [
  { title: "Glow", items: ["Cleaning", "Polishing", "Whitening"] },
  { title: "Perfect", items: ["Veneers", "Smile Design", "Contouring"] },
  { title: "Protect", items: ["Checkups", "X-rays", "Gum Care"] },
  { title: "Restore", items: ["Fillings", "Crowns", "Implants"] },
  { title: "Align", items: ["Braces", "Clear Aligners", "Retainers"] },
  { title: "Gentle", items: ["Kids Dentistry", "Emergency Care"] },
];

const Services = () => (
  <section id="services" className="py-24 md:py-36">
    <div className="container">
      <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-14 md:mb-20">
        Our <span className="italic text-gold">Services</span>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {services.map((s) => (
          <article
            key={s.title}
            className="group bg-background p-10 md:p-12 hover:bg-cream-deep transition-colors duration-500"
          >
            <h3 className="font-serif text-4xl md:text-5xl mb-8">{s.title}</h3>
            <ul className="space-y-3">
              {s.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-lg md:text-xl text-foreground/85">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
