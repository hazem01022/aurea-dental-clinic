import { WHATSAPP_LINK } from "./contact";

const StickyWhatsApp = () => (
  <a
    href={WHATSAPP_LINK}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with Aurea Dental Clinic on WhatsApp"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-gold shadow-gold flex items-center justify-center hover:scale-110 transition-transform duration-300"
  >
    <svg viewBox="0 0 24 24" width="26" height="26" fill="white" aria-hidden>
      <path d="M20.52 3.48A11.78 11.78 0 0 0 12 0C5.37 0 0 5.37 0 12a11.92 11.92 0 0 0 1.64 6L0 24l6.18-1.62A12 12 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52ZM12 22a9.93 9.93 0 0 1-5.07-1.39l-.36-.21-3.67.96.98-3.58-.23-.37A9.94 9.94 0 1 1 22 12c0 5.52-4.48 10-10 10Zm5.47-7.46c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.95 1.17-.35.22-.65.07a8.16 8.16 0 0 1-2.4-1.48 9 9 0 0 1-1.66-2.07c-.17-.3 0-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5l-.57-.01a1.1 1.1 0 0 0-.8.37 3.36 3.36 0 0 0-1.05 2.5c0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.07 4.49.71.31 1.26.5 1.7.64.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/>
    </svg>
  </a>
);

export default StickyWhatsApp;
