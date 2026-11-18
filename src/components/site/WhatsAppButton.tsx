import { CONTACT } from "@/lib/site-config";

const PREFILL = encodeURIComponent("Hi Wild Agile Foundation, I found you on your website and have a question.");

/** Floating WhatsApp chat button, bottom-left (the Nisarg Baithak promo sits bottom-right). */
export function WhatsAppButton() {
  return (
    <a
      href={`${CONTACT.whatsappUrl}?text=${PREFILL}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Wild Agile Foundation on WhatsApp"
      className="group fixed bottom-6 left-6 z-40 flex h-14 items-center gap-2 rounded-full bg-[#25D366] pl-3.5 pr-3.5 text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,0.65)] ring-4 ring-background transition-all hover:pr-5 focus:outline-none focus-visible:ring-[var(--gold)]/60 sm:bottom-8 sm:left-8"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden fill="currentColor">
        <path d="M19.11 4.91A9.82 9.82 0 0 0 12.04 2C6.6 2 2.17 6.43 2.17 11.87c0 1.74.46 3.44 1.32 4.94L2.09 22l5.33-1.4a9.86 9.86 0 0 0 4.62 1.18h.01c5.44 0 9.87-4.43 9.87-9.87a9.8 9.8 0 0 0-2.81-7Zm-7.07 15.2h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.16.83.84-3.08-.2-.32a8.17 8.17 0 0 1-1.25-4.34c0-4.52 3.68-8.2 8.21-8.2a8.2 8.2 0 0 1 8.2 8.21c0 4.52-3.68 8.2-8.15 8.2Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.96-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.31c-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.16 1.73 2.64 4.2 3.7.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.14-1.17-.06-.11-.22-.17-.47-.29Z" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-40">
        Chat with us
      </span>
    </a>
  );
}
