import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const OurClinic = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

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

    const tryUnmute = () => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = false;
      v.volume = 1;
      setMuted(false);
      v.play().catch(() => {
        v.muted = true;
        setMuted(true);
      });
    };

    const onInteract = () => {
      tryUnmute();
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("click", onInteract);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("keydown", onInteract);
    };

    window.addEventListener("scroll", onInteract, { passive: true, once: true });
    window.addEventListener("click", onInteract, { once: true });
    window.addEventListener("touchstart", onInteract, { passive: true, once: true });
    window.addEventListener("keydown", onInteract, { once: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("click", onInteract);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("keydown", onInteract);
    };
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
    if (!next) video.play().catch(() => {});
  };

  return (
    <section id="clinic" className="py-24 md:py-36 bg-cream-deep">
      <div className="container">
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-14 md:mb-20">
          Our <span className="italic text-gold">Clinic</span>
        </h2>
      </div>

      <div className="relative w-full overflow-hidden bg-foreground/5">
        <video
          ref={videoRef}
          src="/clinic.mp4"
          muted={muted}
          loop
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noplaybackrate"
          className="w-full h-auto block select-none"
        />

        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-12 h-12 md:w-14 md:h-14 rounded-full bg-foreground/70 hover:bg-foreground text-background backdrop-blur-sm flex items-center justify-center transition-colors"
        >
          {muted ? <VolumeX className="w-5 h-5 md:w-6 md:h-6" /> : <Volume2 className="w-5 h-5 md:w-6 md:h-6" />}
        </button>
      </div>
    </section>
  );
};

export default OurClinic;
