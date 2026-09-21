import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/content";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-6xl font-bold text-brand">404</p>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
        This page went for a coffee break.
      </h1>
      <p className="mt-3 max-w-md text-sm text-ink-muted">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you
        back to the good stuff.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-brand-solid px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
        >
          Back to homepage
        </Link>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface-hover"
        >
          <MessageCircle size={16} aria-hidden />
          Chat with us
        </a>
      </div>
    </main>
  );
}
