"use client";
import ProfileHeader from "@/components/ProfileHeader";

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ProfileHeader />
      <main>{children}</main>
    </div>
  );
}
