import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { SessionProvider } from "next-auth/react";

import { Providers, ToastProvider } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { CopyrightIcon, FacebookIcon, InstagramIcon, XIcon } from "lucide-react";
import { TwitterIcon } from "@/components/icons";
import { Link } from "@nextui-org/link";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <SessionProvider>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <ToastProvider>
              <div className="relative flex flex-col h-screen" style={{
                backgroundImage: 'url(/images/bg-modal.png)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}>
                <Navbar />
                <main className="container mx-auto max-w-8xl pt-16 px-4 md:px-6 flex-grow">
                  {children}
                </main>
                <footer className="w-full flex flex-col items-center justify-center py-3 px-4">
                  <div className="bg-[#EBE7FF] container rounded-3xl flex flex-col divide-y-1 divide-divider/10 py-4">
                    <div className="flex justify-around items-start pt-8 pb-6">
                      <div className="flex flex-col gap-3 pt-8">
                        <div>
                          <h3 className="text-xl font-semibold">Referalio</h3>
                        </div>
                        <div className="text-divider/80">The Ultimate Affiliate Program for Maximized
                          Earnings</div>
                        <div className="flex gap-3">
                          <Link color='foreground' href={'#'}>
                            <TwitterIcon size={24} />
                          </Link>
                          <Link color='foreground' href={'#'}>
                            <FacebookIcon size={24} />
                          </Link>
                          <Link color='foreground' href={'#'}>
                            <InstagramIcon size={24} />
                          </Link>
                        </div>
                      </div>
                      <div className="pt-6 flex flex-col gap-3">
                        <h3 className="text-divider/60">Links</h3>
                        <div className="flex flex-col gap-2">
                          {siteConfig.navMenuItems.map((item, index) => (
                            <Link
                              color="foreground"
                              href={item.href}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="pt-6 flex flex-col gap-3">
                        <h3 className="text-divider/60">Legal</h3>
                        <div className="flex flex-col gap-2">
                          <Link
                            color="foreground"
                            href={'#'}
                          >
                            Terms of Services
                          </Link>
                          <Link
                            color="foreground"
                            href={'#'}
                          >
                            Privacy Policy
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-center py-6">
                      <span className="text-divider flex gap-1 items-center">
                        <CopyrightIcon size={16} />
                        2024 Referalio. All rights reserved.</span>
                    </div>
                  </div>
                </footer>
              </div>
            </ToastProvider>
          </Providers >
        </SessionProvider >
      </body >
    </html >
  );
}
