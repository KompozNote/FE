"use client";
import ProfileHeader from "@/components/ProfileHeader";

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProfileHeader />
      {children}
    </>
  );
}
