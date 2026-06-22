"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const InquirySchema = z.object({
  name: z.string().min(2, "Please provide your name"),
  email: z.string().email("Invalid email address"),
  projectType: z
    .enum(["IT Consulting", "Staffing / Talent Sourcing", "Software Project", "Other"])
    .optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Please provide more details (min 10 chars)"),
});

export default function InquiryForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(InquirySchema) });

  const [status, setStatus] = useState(null);

  async function onSubmit(data) {
    setStatus(null);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        setStatus({ ok: true, message: "Thanks! Your inquiry has been sent." });
        reset();
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "generate_lead", { method: "contact_form" });
        }
      } else if (res.status === 503 && json?.error?.includes("SendGrid")) {
        setStatus({
          ok: false,
          message:
            "Email sending is not configured on the server. Please email contact@supervalue.info directly or try again later.",
        });
      } else if (res.status === 422 && json?.errors) {
        setStatus({ ok: false, message: "Validation failed on the server." });
      } else {
        setStatus({ ok: false, message: json?.error || "Server error" });
      }
    } catch (err) {
      console.error(err);
      setStatus({ ok: false, message: "Network error; please try again later." });
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-card p-6 rounded-lg shadow-sm">
        {status && (
          <div
            className={`p-3 rounded text-sm ${status.ok ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {status.message}
          </div>
        )}

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          className="mt-1 block w-full rounded border px-3 py-2"
          {...register("name")}
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          className="mt-1 block w-full rounded border px-3 py-2"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Inquiry Type</label>
        <select className="mt-1 block w-full rounded border px-3 py-2" {...register("projectType")}>
          <option value="">Select...</option>
          <option value="IT Consulting">IT Consulting</option>
          <option value="Staffing / Talent Sourcing">Staffing / Talent Sourcing</option>
          <option value="Software Project">Software Project</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Budget (optional)</label>
          <input className="mt-1 block w-full rounded border px-3 py-2" {...register("budget")} />
        </div>
        <div>
          <label className="block text-sm font-medium">Timeline (optional)</label>
          <input className="mt-1 block w-full rounded border px-3 py-2" {...register("timeline")} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Message</label>
        <textarea
          rows={5}
          className="mt-1 block w-full rounded border px-3 py-2"
          {...register("message")}
        />
        {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex items-center rounded px-4 py-2 text-white transition-all transform active:scale-95 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:bg-primary/90 active:bg-primary/80'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </span>
          ) : (
            "Send Inquiry"
          )}
        </button>

        <a
          href="mailto:contact@supervalue.info?subject=Supervalue%20LLC%20Inquiry"
          className="text-sm text-muted-foreground underline hover:text-primary transition-colors"
        >
          Send by email
        </a>
      </div>

      <p className="text-xs text-muted-foreground">
        We will never sell your contact information. By submitting this form, you agree to our{" "}
        <Link href="/privacy" className="underline hover:text-primary">
          Privacy Policy
        </Link>{" "}
        and consent to be contacted about your inquiry.
      </p>
      </form>
    </div>
  );
}
