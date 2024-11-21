export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {children}
        <div className={"hidden md:inline"}>Preview Image</div>
      </section>
    </>
  );
}
