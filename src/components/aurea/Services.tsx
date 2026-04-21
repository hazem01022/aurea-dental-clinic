import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Service = { id: string; title: string; items: string[] };

const fallback: Service[] = [
  { id: "1", title: "Glow", items: ["Cleaning", "Polishing", "Whitening"] },
  { id: "2", title: "Perfect", items: ["Veneers", "Smile Design", "Contouring"] },
  { id: "3", title: "Protect", items: ["Checkups", "X-rays", "Gum Care"] },
  { id: "4", title: "Restore", items: ["Fillings", "Crowns", "Implants"] },
  { id: "5", title: "Align", items: ["Braces", "Clear Aligners", "Retainers"] },
  { id: "6", title: "Gentle", items: ["Kids Dentistry", "Emergency Care"] },
];

const Services = () => {
  const [services, setServices] = useState<Service[] | null>(null);

  useEffect(() => {
    supabase
      .from("services")
      .select("id,title,items")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setServices((data ?? []) as Service[]);
      });
  }, []);

  // Show EXACTLY the dashboard contents. Only fall back when DB is empty.
  const list: Service[] = services === null || services.length === 0 ? fallback : services;
  const count = list.length;
  const gridCols =
    count === 1
      ? "grid-cols-1"
      : count === 2
      ? "md:grid-cols-2"
      : count % 3 === 0
      ? "md:grid-cols-2 lg:grid-cols-3"
      : count % 2 === 0
      ? "md:grid-cols-2"
      : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="services" className="py-24 md:py-36">
      <div className="container">
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-14 md:mb-20">
          Our <span className="italic text-gold">Services</span>
        </h2>

        <div className={`grid ${gridCols} gap-px bg-border`}>
          {list.map((s) => (
            <article
              key={s.id}
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
};

export default Services;
