const Doctors = () => (
  <section id="doctors" className="py-24 md:py-36 bg-foreground text-background">
    <div className="container grid md:grid-cols-12 gap-12 items-center">
      <div className="md:col-span-5">
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
          Our <span className="italic text-gold">Doctors</span>
        </h2>
      </div>
      <div className="md:col-span-7 md:border-l md:border-background/15 md:pl-12">
        <p className="font-serif text-2xl md:text-3xl leading-relaxed text-background/90">
          Led by highly skilled dentists including
          <span className="text-gold"> Dr. Mohamed </span>
          and
          <span className="text-gold"> Dr. Heiba</span>,
          our team is dedicated to delivering precision, comfort, and exceptional results in every visit.
        </p>
        <div className="mt-10 flex gap-12 text-sm text-background/70">
          <div>
            <p className="font-serif text-4xl text-gold mb-1">15+</p>
            <p className="tracking-wide">Years of combined experience</p>
          </div>
          <div>
            <p className="font-serif text-4xl text-gold mb-1">2k+</p>
            <p className="tracking-wide">Smiles perfected</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Doctors;
