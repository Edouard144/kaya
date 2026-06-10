import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={"flex items-center gap-2.5 leading-none " + className}>
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-[12px] bg-foreground text-background shadow-sm"
        style={{
          backgroundImage:
            "linear-gradient(135deg, var(--terracotta) 0%, var(--terracotta-deep) 60%, var(--foreground) 100%)",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 4v16" />
          <path d="M6 12 L18 4" />
          <path d="M10 12 L18 20" />
        </svg>
      </span>
      <div className="flex flex-col">
        <span className="font-display text-2xl tracking-tight">kaya</span>
        <span className="-mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Hotel Solutions
        </span>
      </div>
    </Link>
  );
}
