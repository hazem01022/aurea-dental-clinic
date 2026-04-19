import img1 from "@/assets/before-after-1.jpg";
import img2 from "@/assets/before-after-2.jpg";
import img3 from "@/assets/before-after-3.jpg";
import img4 from "@/assets/before-after-4.jpg";

const cases = [
  { src: img1, alt: "Smile makeover with veneers — before and after" },
  { src: img2, alt: "Natural smile transformation — before and after" },
  { src: img3, alt: "Veneers and cosmetic dentistry — before and after" },
  { src: img4, alt: "Smile design result — before and after" },
];

const BeforeAfter = () => (
  <section id="before-after" className="py-24 md:py-36">
    <div className="container">
      <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-14 md:mb-20">
        Before <span className="italic text-gold">&</span> After
      </h2>

      <div className="grid sm:grid-cols-2 gap-6 md:gap-10">
        {cases.map((c) => (
          <figure
            key={c.src}
            className="relative overflow-hidden bg-foreground/5 shadow-elegant group"
          >
            <img
              src={c.src}
              alt={c.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default BeforeAfter;
