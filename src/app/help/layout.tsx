"use client";

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header style={{ padding: "1rem", background: "#eee" }}>
        <h1>Help 헤더</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
