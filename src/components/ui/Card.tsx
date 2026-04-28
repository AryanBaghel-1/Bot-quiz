import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export function Card({ children, className }: CardProps) {
  return (
    <section
      className={`surface rounded-2xl border border-violet-100/40 p-5 shadow-[0_10px_30px_-15px_rgba(88,28,135,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(88,28,135,0.3)] ${className ?? ""}`.trim()}
    >
      {children}
    </section>
  );
}
