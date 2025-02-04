import { TypographyH3, TypographyMuted } from "@/components/typography";

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-4">
      <TypographyH3 bold>Settings</TypographyH3>
      <TypographyMuted>
        Manage your account settings and set e-mail preferences.
      </TypographyMuted>
      {children}
    </div>
  );
}
