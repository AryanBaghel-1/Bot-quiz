"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: (props: { className?: string }) => React.ReactNode;
};

const navItems: NavItem[] = [
  {
    href: "/",
    label: "Home",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v6H5a1 1 0 0 1-1-1v-9.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/quiz",
    label: "Take Quiz",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M9 12h6M9 16h3M8 6h8a2 2 0 0 1 2 2v13H6V8a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 6V4h8v2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/feedback",
    label: "View Feedback",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-5 3v-3H6a2 2 0 0 1-2-2V6Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M8 9h8M8 13h6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/chatbot",
    label: "Ask Chatbot",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 3a7 7 0 0 0-7 7v1a4 4 0 0 0 4 4h1l2 3 2-3h1a4 4 0 0 0 4-4v-1a7 7 0 0 0-7-7Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9 10h.01M12 10h.01M15 10h.01"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/settings",
    label: "Settings",
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M19.4 15a8.9 8.9 0 0 0 .1-1 8.9 8.9 0 0 0-.1-1l2-1.6-2-3.5-2.4 1a7.9 7.9 0 0 0-1.7-1L15 4h-6l-.3 2.9c-.6.3-1.2.6-1.7 1l-2.4-1-2 3.5L4.6 13a8.9 8.9 0 0 0-.1 1c0 .3 0 .7.1 1l-2 1.6 2 3.5 2.4-1c.5.4 1.1.7 1.7 1L9 20h6l.3-2.9c.6-.3 1.2-.6 1.7-1l2.4 1 2-3.5-2-1.6Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function Sidebar({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(window.innerWidth >= 768);
  }, []);

  return (
    <aside
      className={`sticky top-16 h-[calc(100vh-4rem)] shrink-0 self-start overflow-y-auto border-r border-white/10 bg-black/40 backdrop-blur-md transition-[width] duration-300 ${
        isOpen ? "w-60 p-4" : "w-14 p-2"
      } ${className ?? ""}`.trim()}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        {isOpen && (
          <p className="bg-gradient-to-r from-[#f5d27a] via-[#e6c065] to-[#d4af37] bg-clip-text text-xs font-bold uppercase tracking-widest text-transparent">
            Chronicles
          </p>
        )}
        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-expanded={isOpen}
          className={`rounded-xl border border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-widest text-[#f5d27a] transition-all duration-300 hover:bg-white/10 hover:shadow-[inset_2px_0_0_0_#d4af37] ${
            isOpen ? "px-3 py-2" : "w-full px-2 py-2"
          }`}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={isOpen ? "" : "mx-auto"}
            aria-hidden="true"
          >
            {isOpen ? (
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>
      </div>

      <ul className={isOpen ? "space-y-1" : "space-y-2"}>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-label={item.label}
              className={
                isOpen
                  ? "block rounded-xl px-3 py-2 text-sm text-[#9ca3af] transition-all duration-300 hover:translate-x-1 hover:bg-white/5 hover:text-[#f5d27a] hover:shadow-[inset_2px_0_0_0_#d4af37]"
                  : "flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-3 text-[#f5d27a] transition-all duration-300 hover:bg-white/10 hover:shadow-[inset_2px_0_0_0_#d4af37]"
              }
              title={isOpen ? undefined : item.label}
            >
              {isOpen ? item.label : item.icon({ className: "h-5 w-5" })}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
