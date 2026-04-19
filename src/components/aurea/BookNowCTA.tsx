import { PHONE } from "./contact";

const BookNowCTA = ({ label = "Book Your Appointment Now" }: { label?: string }) => (
  <section className="py-14 md:py-20 bg-background">
    <div className="container flex justify-center">
      <a
        href={`tel:${PHONE}`}
        className="group inline-flex items-center gap-4 px-10 md:px-14 py-5 md:py-6 bg-foreground text-background hover:bg-gold transition-all duration-500 text-xs md:text-sm tracking-luxe uppercase shadow-elegant"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
        </svg>
        <span>{label}</span>
      </a>
    </div>
  </section>
);

export default BookNowCTA;
