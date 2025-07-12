import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "User Dashboard | SkillSwap",
  description: "Manage your skills, swap requests, and profile.",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-primary text-body-col font-roboto">
      <main>{children}</main>
    </div>
  );
}
