import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Staff Sign In",
  description:
    "Sign in to manage Alfa Industrial Products inventory and site settings.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-white">
      {/* Left 6 Columns: Brand Panel */}
      <div className="lg:col-span-6 bg-brand-navy bg-honeycomb-navy text-white px-6 sm:px-12 lg:px-16 py-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-brand-line-dark">
        <Link href="/" className="inline-flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-lg bg-white p-1 flex items-center justify-center">
            <img
              src="/logo.jpeg"
              alt="Alfa Industrial Products"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="font-display font-bold text-xl leading-none">
              ALFA INDUSTRIAL
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-sun mt-1">
              Inventory Console
            </div>
          </div>
        </Link>

        <div className="my-12">
          <div className="font-mono text-xs uppercase tracking-widest text-brand-sun mb-3">
            Authorized Staff Access
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-bold leading-tight mb-4">
            Catalog &amp; Site Management
          </h1>
          <p className="text-blue-100/85 text-sm sm:text-base max-w-md leading-relaxed">
            Add single or bulk products, upload product photos, organize
            categories, and update live phone, WhatsApp, and address settings.
          </p>
        </div>

        <div className="font-mono text-xs text-blue-200/70">
          <Link href="/" className="hover:text-brand-sun transition-colors">
            &larr; Return to Public Website
          </Link>
        </div>
      </div>

      {/* Right 6 Columns: Sign In Form */}
      <div className="lg:col-span-6 px-6 sm:px-12 lg:px-20 py-14 flex flex-col justify-center bg-brand-surface bg-honeycomb-light">
        <div className="w-full max-w-md mx-auto rounded-2xl bg-white border border-brand-line p-8 sm:p-10 shadow-sm">
          <div className="font-mono text-xs uppercase tracking-wider text-brand-steel mb-1">
            Staff Portal
          </div>
          <h2 className="text-2xl font-display font-bold text-brand-navy mb-6">
            Sign In to Continue
          </h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
