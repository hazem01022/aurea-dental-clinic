import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "#clinic", label: "Our Clinic" },
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why Choose Us" },
  { href: "#before-after", label: "Before & After" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Book" },
  { href: "#location", label: "Location" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-cream/90 backdrop-blur-md shadow-soft py-3" : "bg-transparent py-6"
      }`}
    >
      <nav className="container flex items-center justify-between">
        <a href="#top" aria-label="Aurea home"><Logo /></a>

        <ul className="hidden md:flex items-center gap-10 text-sm tracking-wide">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-foreground/80 hover:text-gold transition-colors duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center px-6 py-2.5 text-xs tracking-luxe uppercase border border-foreground/80 text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
        >
          Book Appointment
        </a>

        <button
          aria-label="Menu"
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
        >
          <div className="w-6 h-px bg-foreground mb-1.5" />
          <div className="w-6 h-px bg-foreground mb-1.5" />
          <div className="w-4 h-px bg-foreground ml-auto" />
        </button>
      </nav>

      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-cream border-t border-border animate-fade-in">
          <ul className="container py-6 space-y-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-foreground/80 hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block w-full text-center mt-2 px-6 py-3 text-xs tracking-luxe uppercase bg-foreground text-background"
              >
                Book Appointment
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
