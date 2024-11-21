"use client";

import { SearchProvider } from "@/app/providers";

export default function DashboardLayout({
  modal,
  children,
}: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <SearchProvider>
      <section className="flex flex-col justify-center gap-4">
        <div className="inline-block max-w-8xl text-center justify-center">
          {children}
          {modal}
        </div>
      </section>
    </SearchProvider>
  );
}
