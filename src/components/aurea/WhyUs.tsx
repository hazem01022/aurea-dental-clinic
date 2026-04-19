import calmImage from "@/assets/aurea-calm.jpg";

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
          src={calmImage}
          alt="Designed to feel calm from the moment you walk in"
          loading="lazy"
          className="w-full aspect-square object-cover shadow-elegant"
        />
      </div>

      <div className="order-1 md:order-2">
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-10">
          Why Choose <span className="italic text-gold">Us</span>
        </h2>

        <ul className="space-y-5">
          {points.map((p) => (
            <li key={p} className="flex gap-4 items-start">
              <span className="mt-3 w-2 h-2 rounded-full bg-gold flex-shrink-0" />
              <span className="text-lg md:text-2xl font-serif text-foreground/90 leading-snug">
                {p}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default WhyUs;
