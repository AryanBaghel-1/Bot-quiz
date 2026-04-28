import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/quiz", label: "Take Quiz" },
  { href: "/feedback", label: "View Feedback" },
  { href: "/chatbot", label: "Ask Chatbot" },
];

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={`sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 self-start overflow-y-auto border-r border-white/10 bg-black/40 p-4 backdrop-blur-md md:block ${className || ""}`}>
      <p className="mb-3 bg-gradient-to-r from-[#f5d27a] via-[#e6c065] to-[#d4af37] bg-clip-text text-xs font-bold uppercase tracking-widest text-transparent">
        Chronicles
      </p>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded-xl px-3 py-2 text-sm text-[#9ca3af] transition-all duration-300 hover:translate-x-1 hover:bg-white/5 hover:text-[#f5d27a] hover:shadow-[inset_2px_0_0_0_#d4af37]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
