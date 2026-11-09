import { getSiteSettings } from "@/lib/data";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const settings = await getSiteSettings();

  return (
    <NavbarClient
      phone={settings.phone}
      email={settings.email}
      address={settings.address}
    />
  );
}
