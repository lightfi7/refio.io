import Toolbar from "@/components/account/toolbar";

export default function AcccountSettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col justify-center gap-4">
      <div className="inline-block max-w-8xl text-center justify-center">
        <Toolbar />
        {children}
      </div>
    </section>
  );
}
