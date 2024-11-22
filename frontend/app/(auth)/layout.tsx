import Image from "next/image";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {children}
        <div className={"hidden md:inline"}>
          <Image
            alt="preview"
            height={578}
            src={"/images/preview.png"}
            width={640}
          />
        </div>
      </section>
    </>
  );
}
