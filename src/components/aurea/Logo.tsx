const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M16 3c-4 0-7 2.5-7 6.5 0 2 .6 3.6 1.4 6.5.7 2.5.9 4.5.9 7.5 0 3 1.4 5.5 3 5.5 1.1 0 1.7-1.3 1.7-3 0-1.5.3-2.5 1-2.5s1 1 1 2.5c0 1.7.6 3 1.7 3 1.6 0 3-2.5 3-5.5 0-3 .2-5 .9-7.5.8-2.9 1.4-4.5 1.4-6.5C23 5.5 20 3 16 3z"
        fill="hsl(var(--gold))"
      />
    </svg>
    <span className="font-serif text-xl tracking-wide">Aurea</span>
  </div>
);

export default Logo;
