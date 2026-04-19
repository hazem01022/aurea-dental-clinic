const reviews = [
  { quote: "Dr. Mohamed is extremely professional and delicate. Definitely recommended.", name: "Tarek" },
  { quote: "Very knowledgeable and professional. Thank you for the amazing work.", name: "Omar Elmanadily" },
  { quote: "Everything was explained clearly, and I felt relaxed the entire time.", name: "Nour Darwish" },
  { quote: "Friendly staff and very careful treatment. I felt comfortable throughout.", name: "Mohamed Abulmaaty" },
];

const Testimonials = () => (
  <section className="py-24 md:py-36">
    <div className="container">
      <div className="max-w-2xl mb-16">
        <p className="text-xs tracking-luxe uppercase text-gold mb-4">Patient Stories</p>
        <h2 className="font-serif text-4xl md:text-5xl leading-tight">
          Words from those who <span className="italic text-gold">smile with us.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-px bg-border">
        {reviews.map((r) => (
          <figure key={r.name} className="bg-background p-10 md:p-14">
            <span className="font-serif text-6xl text-gold leading-none">“</span>
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

export default Testimonials;
