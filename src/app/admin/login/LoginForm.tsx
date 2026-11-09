"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowRight } from "lucide-react";
import InlineLoader from "@/components/ui/InlineLoader";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      toast.error("Incorrect email or password");
      setLoading(false);
    } else {
      toast.success("Signed in");
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full h-11 px-3.5 bg-brand-surface border border-brand-line text-sm text-brand-navy placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-navy focus:bg-white"
          placeholder="abbasalfa@yahoo.com"
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
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full h-11 px-3.5 bg-brand-surface border border-brand-line text-sm text-brand-navy placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-navy focus:bg-white"
          placeholder="Enter password"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 flex justify-center items-center gap-2 bg-brand-navy hover:bg-brand-navy-light text-white font-display font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-70"
      >
        {loading ? (
          <InlineLoader label="Signing in..." tone="light" size="sm" />
        ) : (
          <>
            <span>Sign In</span>
            <ArrowRight size={16} />
          </>
        )}
      </button>
    </form>
  );
}
