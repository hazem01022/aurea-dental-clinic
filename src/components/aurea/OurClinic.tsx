import { useEffect, useRef } from "react";

const OurClinic = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="clinic" className="py-24 md:py-36 bg-cream-deep">
      <div className="container">
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-14 md:mb-20">
          Our <span className="italic text-gold">Clinic</span>
        </h2>

        <div className="relative w-full overflow-hidden shadow-elegant aspect-video bg-foreground/5">
          <video
            ref={videoRef}
            src="/clinic.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            controls={false}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noplaybackrate"
            className="w-full h-full object-cover pointer-events-none select-none"
          />
        </div>
      </div>
    </section>
  );
};

export default OurClinic;
