"use client";

import { CircleCheck, LoaderCircle, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { products, whatsappUrl } from "@/lib/content";

type Status = "idle" | "loading" | "success" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setMessage(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again or message us on WhatsApp.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-card">
        <CircleCheck size={40} className="mx-auto text-brand" aria-hidden />
        <h3 className="mt-4 text-xl font-bold">Demo request received!</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-muted">
          We&apos;ll reach out on WhatsApp within one business hour to lock in a
          time that suits you.
        </p>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-solid px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
        >
          <MessageCircle size={16} aria-hidden />
          Message us now
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Your name"
          name="name"
          required
          autoComplete="name"
          placeholder="Ahmad"
        />
        <Field
          label="Business name"
          name="business_name"
          required
          autoComplete="organization"
          placeholder="TwentyOne.cafe"
        />
        <Field
          label="WhatsApp number"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="012 345 6789"
        />
        <Field
          label="Email (optional)"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@business.com"
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="lead-package"
            className="block text-sm font-medium text-ink"
          >
            Interested in
          </label>
          <select
            id="lead-package"
            name="package_interest"
            defaultValue="operations"
            className="mt-1.5 w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-ink focus:border-brand focus:outline-none"
          >
            <option value="">Not sure yet</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.tagline}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="lead-locations"
            className="block text-sm font-medium text-ink"
          >
            Number of locations
          </label>
          <input
            id="lead-locations"
            name="locations"
            type="number"
            min={1}
            max={50}
            defaultValue={1}
            className="mt-1.5 w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-ink focus:border-brand focus:outline-none"
          />
        </div>
      </div>

      {message && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-[#ef44441a] px-3 py-2.5 text-sm text-[#dc2626]"
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-solid px-6 py-3.5 text-base font-medium text-white transition-colors hover:bg-brand-hover disabled:opacity-60"
      >
        {status === "loading" ? (
          <LoaderCircle size={18} className="animate-spin" aria-hidden />
        ) : (
          <Send size={16} aria-hidden />
        )}
        {status === "loading" ? "Sending…" : "Book my free demo"}
      </button>

      <p className="mt-3 text-center text-xs text-ink-subtle">
        No spam, no hard sell. We&apos;ll show you the system and answer your
        questions.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={`lead-${name}`}
        className="block text-sm font-medium text-ink"
      >
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      <input
        id={`lead-${name}`}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-ink placeholder:text-ink-subtle focus:border-brand focus:outline-none"
      />
    </div>
  );
}

