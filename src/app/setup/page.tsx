import type { Metadata } from "next";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { createAdminUser } from "./actions";
import SubmitButton from "@/components/ui/SubmitButton";

export const metadata: Metadata = {
  title: "Initial Account Setup",
  description: "Create the initial staff account for Alfa Industrial Products.",
  robots: { index: false, follow: false },
};

export default async function SetupPage() {
  const userCount = await prisma.user.count();

  if (userCount > 0) {
    redirect("/");
  }

  return (
    <div className="min-h-screen w-full bg-brand-navy bg-honeycomb-navy flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white border border-brand-line p-8 sm:p-10 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-11 w-11 border border-brand-line p-1 flex items-center justify-center">
            <img
              src="/logo.jpeg"
              alt="Alfa Industrial Products"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="font-display font-bold text-lg text-brand-navy leading-none">
              ALFA INDUSTRIAL
            </div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-brand-steel mt-1">
              First-Time Setup
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-display font-bold text-brand-navy mb-2">
          Create Staff Account
        </h1>
        <p className="text-sm text-brand-muted mb-6">
          Set up the primary administrator login. This page locks automatically
          once created.
        </p>

        <form action={createAdminUser as any} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-1.5"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="block w-full h-11 px-3.5 bg-brand-surface border border-brand-line text-sm text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-1.5"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full h-11 px-3.5 bg-brand-surface border border-brand-line text-sm text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="block w-full h-11 px-3.5 bg-brand-surface border border-brand-line text-sm text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white"
            />
          </div>

          <SubmitButton
            pendingLabel="Creating account..."
            loaderTone="light"
            className="w-full h-12 bg-brand-navy hover:bg-brand-navy-light text-white font-display font-bold text-xs uppercase tracking-wider"
          >
            Create Administrator
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
