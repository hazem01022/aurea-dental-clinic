import { useEffect, useState } from "react";
import img1 from "@/assets/before-after-1.jpg";
import img2 from "@/assets/before-after-2.jpg";
import img3 from "@/assets/before-after-3.jpg";
import img4 from "@/assets/before-after-4.jpg";
import { supabase } from "@/integrations/supabase/client";

type Item = { id: string; src: string; alt: string };

const fallback: Item[] = [
  { id: "1", src: img1, alt: "Smile makeover with veneers — before and after" },
  { id: "2", src: img2, alt: "Natural smile transformation — before and after" },
  { id: "3", src: img3, alt: "Veneers and cosmetic dentistry — before and after" },
  { id: "4", src: img4, alt: "Smile design result — before and after" },
];

const BeforeAfter = () => {
  const [cases, setCases] = useState<Item[] | null>(null);

  useEffect(() => {
    supabase
      .from("before_after")
      .select("id,image_url,alt")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        const mapped = (data ?? [])
          .filter((d) => d.image_url)
          .map((d) => ({ id: d.id, src: d.image_url, alt: d.alt || "Before and after" }));
        // Only show fallback when the database is completely empty.
        // Once any photos exist in the CMS, show exactly those — no duplicates.
        setCases(mapped.length === 0 ? fallback : mapped);
      });
  }, []);

  const list = cases ?? fallback;

  return (
    <section id="before-after" className="py-24 md:py-36">
      <div className="container">
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-14 md:mb-20">
          Before <span className="italic text-gold">&</span> After
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-10">
          {list.map((c) => (
            <figure
              key={c.id}
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
};

export default BeforeAfter;
