import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/quiz", label: "Take Quiz" },
  { href: "/feedback", label: "View Feedback" },
  { href: "/chatbot", label: "Ask Chatbot" },
];

export function Sidebar() {
  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 self-start overflow-y-auto border-r border-violet-100/40 bg-gradient-to-b from-white/80 via-purple-50/50 to-white/60 p-4 backdrop-blur-sm md:block">
      <p className="mb-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-xs font-semibold uppercase tracking-wide text-transparent">
        Navigation
      </p>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded-xl px-3 py-2 text-sm text-slate-700 transition-all duration-150 hover:translate-x-1 hover:bg-gradient-to-r hover:from-violet-100/80 hover:to-fuchsia-100/80 hover:text-violet-700"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
