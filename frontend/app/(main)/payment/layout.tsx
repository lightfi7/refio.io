"use client";
import { useTheme } from "next-themes";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <section className="grid grid-cols-1 items-center md:grid-cols-2 min-h-screen">
        {children}
        <div
          className={"hidden md:inline rounded-3xl"}
          style={{
            backgroundImage:
              theme === "light"
                ? "url(/images/preview-light.png)"
                : "url(/images/preview-dark.png)",
            backgroundSize: "cover",
          }}
        >
          {/* <Image
            alt="preview"
            className=""
            style={{
              backgroundSize: "cover",
            }}
            height={578}
            src={"/images/preview.png"}
            width={640}
          /> */}
        </div>
      </section>
    </>
  );
}
