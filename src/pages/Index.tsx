import Navbar from "@/components/aurea/Navbar";
import Hero from "@/components/aurea/Hero";
import TrustStrip from "@/components/aurea/TrustStrip";
import OurClinic from "@/components/aurea/OurClinic";
import BeforeAfter from "@/components/aurea/BeforeAfter";
import Services from "@/components/aurea/Services";
import WhyUs from "@/components/aurea/WhyUs";
import Testimonials from "@/components/aurea/Testimonials";
import Experience from "@/components/aurea/Experience";
import Booking from "@/components/aurea/Booking";
import Footer from "@/components/aurea/Footer";
import StickyWhatsApp from "@/components/aurea/StickyWhatsApp";
import BookNowCTA from "@/components/aurea/BookNowCTA";

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "Aurea Dental Clinic",
    image: "/og-image.jpg",
    telephone: "+201149043390",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Eterna Healthcare City, Clinic CN-B-2-11",
      addressLocality: "New Cairo",
      addressRegion: "Cairo Governorate",
      postalCode: "4760102",
      addressCountry: "EG",
    },
    priceRange: "$$$",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "120" },
  };

  return (
    <main className="bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <Hero />
      <TrustStrip />
      <OurClinic />
      <BeforeAfter />
      <BookNowCTA />
      <Services />
      <WhyUs />
      <BookNowCTA />
      <Testimonials />
      <Experience />
      <BookNowCTA />
      <Booking />
      <Footer />
      <StickyWhatsApp />
    </main>
  );
};

export default Index;
