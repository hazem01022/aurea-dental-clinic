import { useEffect, useState } from "react";
import heroImage from "@/assets/aurea-smile.jpg";
import { PHONE, WHATSAPP_LINK } from "./contact";
import { supabase } from "@/integrations/supabase/client";

type HeroData = {
  eyebrow: string | null;
  headline: string | null;
  subheadline: string | null;
  image_url: string | null;
  badge_label: string | null;
  badge_text: string | null;
};

const defaults: HeroData = {
  eyebrow: "Aurea Dental Clinic",
  headline: "Your Smile, Perfected with Care.",
  subheadline: "Premium dental care with precision, comfort, and results you can trust.",
  image_url: null,
  badge_label: "Rated 5.0",
  badge_text: "Trusted by hundreds of patients across Cairo",
};

const Hero = () => {
  const [hero, setHero] = useState<HeroData>(defaults);

  useEffect(() => {
    supabase.from("hero_content").select("*").maybeSingle().then(({ data }) => {
      if (data) {
        setHero({
          eyebrow: data.eyebrow || defaults.eyebrow,
          headline: data.headline || defaults.headline,
          subheadline: data.subheadline || defaults.subheadline,
          image_url: data.image_url,
          badge_label: data.badge_label || defaults.badge_label,
          badge_text: data.badge_text || defaults.badge_text,
        });
      }
    });
  }, []);

  return (
    <section id="top" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 gradient-warm -z-10" />

      <div className="container grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7 animate-fade-up">
          <p className="text-xs tracking-luxe uppercase text-gold mb-6">{hero.eyebrow}</p>
          <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-foreground whitespace-pre-line">
            {hero.headline}
          </h1>
          <p className="mt-8 max-w-md text-base md:text-lg text-muted-foreground leading-relaxed">
            {hero.subheadline}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 text-xs tracking-luxe uppercase bg-foreground text-background hover:bg-gold transition-all duration-500 shadow-soft"
            >
              Book Appointment
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 text-xs tracking-luxe uppercase border border-foreground/30 text-foreground hover:border-gold hover:text-gold transition-all duration-500"
            >
              WhatsApp Us
            </a>
          </div>

          <a
            href={`tel:${PHONE}`}
            className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
          >
            <span className="w-8 h-px bg-current" />
            Call now {PHONE}
          </a>
        </div>

        <div className="md:col-span-5 animate-fade-in">
          <div className="relative aspect-[4/5] overflow-hidden shadow-elegant">
            <img
              src={hero.image_url || heroImage}
              alt="Patient with a perfected smile at Aurea Dental Clinic"
              width={1080}
              height={1350}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-cream/95 backdrop-blur-sm p-5 border-l-2 border-gold">
              <p className="text-xs tracking-luxe uppercase text-gold mb-1">{hero.badge_label}</p>
              <p className="font-serif text-lg leading-tight">{hero.badge_text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
