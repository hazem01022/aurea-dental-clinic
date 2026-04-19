const items = [
  { label: "Rated 5.0 by Patients", icon: "★" },
  { label: "Expert Dentists", icon: "✦" },
  { label: "Advanced Treatments", icon: "◆" },
  { label: "Pain-Free Experience", icon: "✿" },
];

const TrustStrip = () => (
  <section className="border-y border-border/60 bg-cream-deep/60">
    <div className="container py-6 md:py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
      {items.map((it) => (
        <div key={it.label} className="flex items-center justify-center gap-3 text-center">
          <span className="text-gold text-lg">{it.icon}</span>
          <span className="text-xs md:text-sm tracking-wide text-foreground/80">{it.label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default TrustStrip;
