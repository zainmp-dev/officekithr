import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const WhatsAppButton = () => {
  const phone = "918137932991";
  const message = "Hi";

  const openWhatsApp = () => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={openWhatsApp}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-[5.5rem] z-[9998] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 sm:h-[60px] sm:w-[60px] lg:bottom-5 lg:right-[90px]"
    >
      <WhatsAppIcon size={34} />
    </button>
  );
};

export default WhatsAppButton;
