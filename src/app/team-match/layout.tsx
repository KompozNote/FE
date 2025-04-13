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
      <h1>Help 헤더</h1>
      <main>{children}</main>
    </div>
  );
}
