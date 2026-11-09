"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { saveSettings } from "./actions";
import SubmitButton from "@/components/ui/SubmitButton";

interface SettingsFormProps {
  settings: Record<string, string>;
}

const VERIFIED_DEFAULTS = {
  WHATSAPP_NUMBER: "+919849323057",
  CONTACT_PHONE: "+91 98493 23057",
  CONTACT_EMAIL: "abbasalfa@yahoo.com",
  ADDRESS:
    "Central Bank Building, H. No. 4-3-140, Shyam Market, Hill Street, Near City Light Hotel, Ranigunj, Secunderabad, Telangana 500003",
};

export default function SettingsForm({ settings }: SettingsFormProps) {
  const [whatsapp, setWhatsapp] = useState(settings["WHATSAPP_NUMBER"] || "");
  const [phone, setPhone] = useState(settings["CONTACT_PHONE"] || "");
  const [email, setEmail] = useState(settings["CONTACT_EMAIL"] || "");
  const [address, setAddress] = useState(settings["ADDRESS"] || "");

  const handleAction = async (formData: FormData) => {
    const res = await saveSettings(formData);
    if (res?.success) {
      toast.success("Site contact details updated across all pages");
    }
  };

  const handleFillVerified = () => {
    setWhatsapp(VERIFIED_DEFAULTS.WHATSAPP_NUMBER);
    setPhone(VERIFIED_DEFAULTS.CONTACT_PHONE);
    setEmail(VERIFIED_DEFAULTS.CONTACT_EMAIL);
    setAddress(VERIFIED_DEFAULTS.ADDRESS);
    toast.success("Loaded verified Ranigunj store details. Click Save to apply.");
  };

  return (
    <form action={handleAction} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-brand-line">
        <p className="text-xs text-brand-muted">
          Leave fields blank to use the verified Ranigunj store defaults, or
          save custom contact details below.
        </p>
        <button
          type="button"
          onClick={handleFillVerified}
          className="px-4 py-2 rounded-lg border border-brand-line bg-brand-surface hover:border-brand-navy text-xs font-mono font-medium text-brand-navy transition-colors shrink-0"
        >
          Fill Verified Ranigunj Store Details
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-1.5">
            WhatsApp Number
          </label>
          <input
            name="WHATSAPP_NUMBER"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full h-11 px-3.5 bg-brand-surface border border-brand-line text-sm text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white"
            placeholder={VERIFIED_DEFAULTS.WHATSAPP_NUMBER}
          />
          <p className="text-xs text-brand-muted mt-1">
            Include country code. Used for all WhatsApp quote buttons.
          </p>
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-1.5">
            Sales Phone Number
          </label>
          <input
            name="CONTACT_PHONE"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-11 px-3.5 bg-brand-surface border border-brand-line text-sm text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white"
            placeholder={VERIFIED_DEFAULTS.CONTACT_PHONE}
          />
          <p className="text-xs text-brand-muted mt-1">
            Shown in the top bar, footer, home, about, and contact pages.
          </p>
        </div>
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-1.5">
          Sales Email Address
        </label>
        <input
          name="CONTACT_EMAIL"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-11 px-3.5 bg-brand-surface border border-brand-line text-sm text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white"
          placeholder={VERIFIED_DEFAULTS.CONTACT_EMAIL}
        />
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-1.5">
          Store &amp; Counter Address
        </label>
        <textarea
          name="ADDRESS"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={3}
          className="w-full p-3.5 bg-brand-surface border border-brand-line text-sm text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white resize-y"
          placeholder={VERIFIED_DEFAULTS.ADDRESS}
        />
      </div>

      <div className="pt-2">
        <SubmitButton
          pendingLabel="Saving settings..."
          loaderTone="light"
          className="bg-brand-navy hover:bg-brand-navy-light text-white font-display font-bold text-xs uppercase tracking-wider px-7 py-3.5"
        >
          Save Contact Settings
        </SubmitButton>
      </div>
    </form>
  );
}
