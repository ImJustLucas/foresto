import { TypographyMuted } from "@/components/typography";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My profile",
};

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto pt-28 px-4 py-8">
      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-3xl font-bold text-center">Settings ⚙️</h1>
        <TypographyMuted>
          Manage your account settings and set e-mail preferences.
        </TypographyMuted>
      </div>

      {children}
    </div>
  );
}
