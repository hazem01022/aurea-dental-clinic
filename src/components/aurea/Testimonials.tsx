import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Review = { id: string; quote: string; name: string };

const fallback: Review[] = [
  { id: "1", quote: "Dr. Mohamed is extremely professional and delicate. Definitely recommended.", name: "Tarek" },
  { id: "2", quote: "Very knowledgeable and professional. Thank you for the amazing work.", name: "Omar Elmanadily" },
  { id: "3", quote: "Everything was explained clearly, and I felt relaxed the entire time.", name: "Nour Darwish" },
  { id: "4", quote: "Friendly staff and very careful treatment. I felt comfortable throughout.", name: "Mohamed Abulmaaty" },
];

const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[] | null>(null);

  useEffect(() => {
    supabase
      .from("reviews")
      .select("id,quote,name")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setReviews((data ?? []) as Review[]);
      });
  }, []);

  const list: Review[] = reviews === null || reviews.length === 0 ? fallback : reviews;
  const count = list.length;
  const gridCols = count === 1 ? "grid-cols-1" : "md:grid-cols-2";

  return (
    <section id="reviews" className="py-24 md:py-36">
      <div className="container">
        <div className="mb-14 md:mb-20">
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
            Patient <span className="italic text-gold">Reviews</span>
          </h2>
        </div>

        <div className={`grid ${gridCols} gap-px bg-border`}>
          {list.map((r) => (
            <figure key={r.id} className="bg-background p-10 md:p-14">
              <span className="font-serif text-6xl text-gold leading-none">"</span>
              <blockquote className="font-serif text-2xl md:text-3xl leading-snug text-foreground/90 -mt-4">
                {r.quote}
              </blockquote>
              <figcaption className="mt-8 text-xs tracking-luxe uppercase text-muted-foreground">
                — {r.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
