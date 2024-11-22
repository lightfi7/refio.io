import Image from "next/image";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="grid grid-cols-1 items-baseline md:grid-cols-2 min-h-screen">
        {children}
        <div className={"hidden md:inline"}>
          <Image
            width={640}
            height={578}
            src={'/images/preview.png'}
            alt="preview"
          />
          </div>
      </section>
    </>
  );
}
