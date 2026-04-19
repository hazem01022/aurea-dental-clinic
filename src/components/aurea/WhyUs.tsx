import clinic from "@/assets/clinic-interior.jpg";

const points = [
  "Highly professional and experienced dentists",
  "Clear explanations before every procedure",
  "Gentle and pain-free treatments",
  "Friendly, calming environment",
  "Consistent high-quality results",
];

const WhyUs = () => (
  <section id="why" className="py-24 md:py-36 bg-cream-deep">
    <div className="container grid md:grid-cols-2 gap-16 items-center">
      <div className="order-2 md:order-1">
        <img
          src={clinic}
          alt="Aurea dental clinic interior with warm minimal design"
          loading="lazy"
          width={1600}
          height={1100}
          className="w-full aspect-[4/3] object-cover shadow-elegant"
        />
      </div>

      <div className="order-1 md:order-2">
        <p className="text-xs tracking-luxe uppercase text-gold mb-4">Why Aurea</p>
        <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
          Why patients trust <span className="italic text-gold">Aurea Dental Clinic.</span>
        </h2>

        <ul className="space-y-5">
          {points.map((p) => (
            <li key={p} className="flex gap-4 items-start">
              <span className="mt-2 w-6 h-px bg-gold flex-shrink-0" />
              <span className="text-base md:text-lg text-foreground/85 leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default WhyUs;
