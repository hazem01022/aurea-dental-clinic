import logo from "@/assets/aurea-logo.jpg";

const Logo = ({ className = "" }: { className?: string }) => (
  <img
    src={logo}
    alt="Aurea Dental Clinic"
    className={`h-12 md:h-14 w-auto object-contain ${className}`}
  />
);

export default Logo;
