"use client";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import {
  BadgeDollarSign,
  CameraIcon,
  ChartNoAxesCombinedIcon,
  ChartPieIcon,
  CheckIcon,
  CloudIcon,
  Flower2Icon,
  GraduationCapIcon,
  HandshakeIcon,
  HeartIcon,
  HeartPulseIcon,
  MapPinnedIcon,
  MonitorSmartphoneIcon,
  Share2Icon,
  ShirtIcon,
  VideoIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();

  return (
    <section className="relative flex flex-col items-center justify-center rounded-xl gap-8 py-8 md:py-10">
      <section
        className="relative isolate pt-8 w-full rounded-3xl bg-[#DDD7FF]"
        id="hero"
      >
        <div className="py-24 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6">
                <a
                  className="md:inline-flex space-x-4 p-1.5 rounded-3xl bg-white dark:bg-black"
                  href="#affiliate"
                >
                  <span className="rounded px-2.5 py-1 text-xs font-semibold tracking-wide uppercase">
                    Join the Leading Affiliate Program
                  </span>
                </a>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl flex flex-col space-y-1">
                <span>The Ultimate Affiliate Program</span>{" "}
                <span>for Maximized Earnings</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-950 max-w-2xl mx-auto">
                join our affiliate program today and turn your audience into
                income
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href="https://refio.io/pricing"
                >
                  Get for $19
                </a>
                <a
                  className="text-sm font-semibold leading-6 text-black/90"
                  href="https://refio.io/sign-up"
                >
                  Try for free <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="px-24">
          {theme == "light" ? (
            <img
              alt="hero"
              className="backdrop-blur-sm bg-transparent rounded-3xl opacity-10 md:opacity-90 border-divider/10"
              src="/images/home-light.png"
            />
          ) : (
            <img
              alt="hero"
              className="backdrop-blur-sm bg-transparent rounded-3xl opacity-10 md:opacity-90 border-divider/10"
              src="/images/home-dark.png"
            />
          )}
        </div>
      </section>
      <section className="relative isolate pt-40 w-full rounded-3xl" id="hero">
        <div className="flex flex-col items-center gap-4 max-w-xl mx-auto">
          <div>
            <a
              className="shadow-md py-2.5 px-3.5 rounded-3xl text-sm border-1 border-divider"
              href="#features"
              id="features"
            >
              Features
            </a>
          </div>
          <div className="text-center">
            <h1 className="text-[40px] font-semibold">
              But, Why Choose Referalio?
            </h1>
            <span className="font-medium text-divider/30 text-base">
              Yes, there are other affiliate program providers, but our goal is
              to be the best, and we&apos;re almost there!
            </span>
          </div>
        </div>
        <div className="pt-8 w-full flex flex-col items-center">
          <div className="flex flex-col md:flex-row justify-around border-t-1 border-divider">
            <div className="flex flex-col gap-2 p-9 items-start" />
            <div className="relative hidden md:inline-block md:h-[480px]">
              <div className="absolute h-full p-[0.5px] -left-[0.5px] bg-gradient-to-b from-divider to-divider/0 border-transparent" />
              <div className="absolute w-[22px] h-[22px] -top-[11px] -left-[11px] border-1 shadow-md rounded-full bg-white dark:bg-[#242424] border-divider" />
            </div>
            <div className="flex flex-col gap-2 p-9 items-start">
              <div>
                <div className="rounded-full px-5 py-2.5 bg-[#FFE2C5]">
                  <MonitorSmartphoneIcon size={18} />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Easy to Use</h3>
              <h4 className="text-base text-divider/60">
                Our intuitive dashboard is designed to lower your time managing
                your affiliate program.
              </h4>
            </div>
            <div className="relative hidden md:inline-block md:h-[480px]">
              <div className="absolute h-full p-[0.5px] -left-[0.5px] bg-gradient-to-b from-divider to-divider/0 border-transparent" />
              <div className="absolute w-[22px] h-[22px] -top-[11px] -left-[11px] border-1 shadow-md rounded-full bg-white dark:bg-[#242424] border-divider" />
            </div>
            <div className="flex flex-col gap-2 p-9 items-start">
              <div>
                <div className="rounded-full px-5 py-2.5 bg-[#BAFFF3]">
                  <ChartPieIcon size={18} />
                </div>
              </div>
              <h3 className="text-xl font-semibold">
                Fixed Commission or Percentage
              </h3>
              <h4 className="text-base text-divider/60">
                Offer your affiliates a percentage of your program plans or a
                fixed commission for every paid sign-up.
              </h4>
            </div>
            <div className="relative hidden md:inline-block md:h-[480px]">
              <div className="absolute h-full p-[0.5px] -left-[0.5px] bg-gradient-to-b from-divider to-divider/0 border-transparent" />
              <div className="absolute w-[22px] h-[22px] -top-[11px] -left-[11px] border-1 shadow-md rounded-full bg-white dark:bg-[#242424] border-divider" />
            </div>
            <div className="flex flex-col gap-2 p-9 items-start">
              <div>
                <div className="rounded-full px-5 py-2.5 bg-[#FFC6DE]">
                  <Share2Icon size={18} />
                </div>
              </div>
              <h3 className="text-xl font-semibold">
                Thousands Affiliate Programs
              </h3>
              <h4 className="text-base text-divider/60">
                Discover thousand of affiliate programs for a lifetime. Never
                worry about expiration dates or subscription renewals.
              </h4>
            </div>
            <div className="relative hidden md:inline-block md:h-[480px]">
              <div className="absolute h-full p-[0.5px] -left-[0.5px] bg-gradient-to-b from-divider to-divider/0 border-transparent" />
              <div className="absolute w-[22px] h-[22px] -top-[11px] -left-[11px] border-1 shadow-md rounded-full bg-white dark:bg-[#242424] border-divider" />
            </div>
            <div className="relative hidden md:inline-block md:h-[480px]">
              <div className="absolute h-full p-[0.5px] -left-[0.5px] bg-gradient-to-b from-divider to-divider/0 border-transparent" />
              <div className="absolute w-[22px] h-[22px] -top-[11px] -left-[11px] border-1 shadow-md rounded-full bg-white dark:bg-[#242424] border-divider" />
            </div>
            <div className="flex flex-col gap-2 p-9 items-start" />
          </div>
          <div className="relative md:-top-[180px]">
            {theme == "light" ? (
              <Image alt="" className="" src={"/images/provider-light.png"} />
            ) : (
              <Image alt="" className="" src={"/images/provider-dark.png"} />
            )}
          </div>
        </div>
      </section>
      <section className="relative isolate pt-30 w-full rounded-3xl" id="hero">
        <div className="flex flex-col items-center gap-4 max-w-xl mx-auto">
          <div>
            <a
              className="shadow-md py-2.5 px-3.5 rounded-3xl text-sm border-1 border-divider"
              href="#niches"
              id="niches"
            >
              Niches
            </a>
          </div>
          <div className="text-center">
            <h1 className="text-[40px] font-semibold">
              Discover the Trending Niches
            </h1>
            <span className="font-medium text-divider/30 text-base">
              Hundreds of Affiliate Program Niches ready to explore!{" "}
            </span>
          </div>
        </div>
        <div className="pt-10 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-divider/5 p-9 flex flex-col gap-4 rounded-2xl dark:border-1 border-divider">
            <ShirtIcon size={30} />
            <h3 className="text-lg font-semibold">Fashion</h3>
            <h5 className="text-divider/60 text-sm">
              15 affiliate programs for this available
            </h5>
          </div>
          <div className="bg-divider/5 p-9 flex flex-col gap-4 rounded-2xl dark:border-1 border-divider">
            <Flower2Icon size={30} />
            <h3 className="text-lg font-semibold">Groceries</h3>
            <h5 className="text-divider/60 text-sm">
              34 affiliate programs for this available
            </h5>
          </div>
          <div className="bg-divider/5 p-9 flex flex-col gap-4 rounded-2xl dark:border-1 border-divider">
            <GraduationCapIcon size={30} />
            <h3 className="text-lg font-semibold">Knowledge</h3>
            <h5 className="text-divider/60 text-sm">
              23 affiliate programs for this available
            </h5>
          </div>
          <div className="bg-divider/5 p-9 flex flex-col gap-4 rounded-2xl dark:border-1 border-divider">
            <MapPinnedIcon size={30} />
            <h3 className="text-lg font-semibold">Travel</h3>
            <h5 className="text-divider/60 text-sm">
              11 affiliate programs for this available
            </h5>
          </div>
          <div className="bg-divider/5 p-9 flex flex-col gap-4 rounded-2xl dark:border-1 border-divider">
            <VideoIcon size={30} />
            <h3 className="text-lg font-semibold">Video</h3>
            <h5 className="text-divider/60 text-sm">
              38 affiliate programs for this available
            </h5>
          </div>
          <div className="bg-divider/5 p-9 flex flex-col gap-4 rounded-2xl dark:border-1 border-divider">
            <CloudIcon size={30} />
            <h3 className="text-lg font-semibold">SaaS</h3>
            <h5 className="text-divider/60 text-sm">
              7 affiliate programs for this available
            </h5>
          </div>
          <div className="bg-divider/5 p-9 flex flex-col gap-4 rounded-2xl dark:border-1 border-divider">
            <HeartIcon size={30} />
            <h3 className="text-lg font-semibold">Beauty</h3>
            <h5 className="text-divider/60 text-sm">
              10 affiliate programs for this available
            </h5>
          </div>
          <div className="bg-divider/5 p-9 flex flex-col gap-4 rounded-2xl dark:border-1 border-divider">
            <BadgeDollarSign size={30} />
            <h3 className="text-lg font-semibold">Marketing</h3>
            <h5 className="text-divider/60 text-sm">
              29 affiliate programs for this available
            </h5>
          </div>
          <div className="bg-divider/5 p-9 flex flex-col gap-4 rounded-2xl dark:border-1 border-divider">
            <CameraIcon size={30} />
            <h3 className="text-lg font-semibold">Photography</h3>
            <h5 className="text-divider/60 text-sm">
              25 affiliate programs for this available
            </h5>
          </div>
          <div className="bg-divider/5 p-9 flex flex-col gap-4 rounded-2xl dark:border-1 border-divider">
            <ChartNoAxesCombinedIcon size={30} />
            <h3 className="text-lg font-semibold">Influencer</h3>
            <h5 className="text-divider/60 text-sm">
              21 affiliate programs for this available
            </h5>
          </div>
          <div className="bg-divider/5 p-9 flex flex-col gap-4 rounded-2xl dark:border-1 border-divider">
            <HeartPulseIcon size={30} />
            <h3 className="text-lg font-semibold">Health Supplements</h3>
            <h5 className="text-divider/60 text-sm">
              8 affiliate programs for this available
            </h5>
          </div>
          <div className="bg-divider/5 p-9 flex flex-col gap-4 rounded-2xl dark:border-1 border-divider">
            <HandshakeIcon size={30} />
            <h3 className="text-lg font-semibold">Business</h3>
            <h5 className="text-divider/60 text-sm">
              32 affiliate programs for this available
            </h5>
          </div>
        </div>
      </section>
      <section className="relative isolate pt-40 w-full rounded-3xl" id="hero">
        <div className="flex flex-col items-center gap-4 max-w-xl mx-auto">
          <div>
            <a
              className="shadow-md py-2.5 px-3.5 rounded-3xl text-sm border-1 border-divider"
              href="#testimonials"
              id="testimonials"
            >
              Testimonials
            </a>
          </div>
          <div className="text-center">
            <h1 className="text-[40px] font-semibold">
              People just like you are already using Referalio
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 justify-center px-2 pt-8">
          <div className="flex gap-3 flex-col">
            <div className="p-4 w-full gap-20 md:gap-[156px] flex flex-col justify-between rounded-xl border-1 border-divider">
              <div>
                &quot;The affiliate program exceeded my expectations! The
                dashboard is intuitive, the commissions are competitive, and the
                payments are always on time. Partnering with this brand has been
                a game-changer for my passive income strategy.&quot;
              </div>
              <div>
                <span className="text-sm font-medium">Alex J.</span>
                <span className="text-base font-semibold">
                  Digital Marketer
                </span>
              </div>
            </div>
            <div className="p-4 w-full gap-20 md:gap-32 flex flex-col justify-between rounded-xl border-1 border-divider">
              <div>
                &quot;What I love most about this affiliate program is the
                support team. They’re always available to answer questions and
                help optimize my campaigns”.
              </div>
              <div>
                <span className="text-sm font-medium">David K.</span>
                <span className="text-base font-semibold">
                  Social Media Influencer
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 flex-col">
            <div className="p-4 w-full gap-20 md:gap-36 flex flex-col justify-between rounded-xl border-1 border-divider">
              <div>
                &quot;What I love most about this affiliate program is the
                support team. They’re always available to answer questions and
                help optimize my campaigns”.
              </div>
              <div>
                <span className="text-sm font-medium">David K.</span>
                <span className="text-base font-semibold">
                  Social Media Influencer
                </span>
              </div>
            </div>
            <div className="p-4 w-full gap-20 md:gap-[186px] flex flex-col justify-between rounded-xl border-1 border-divider">
              <div>
                &quot;What I love most about this affiliate program is the
                support team. They’re always available to answer questions and
                help optimize my campaigns”.
              </div>
              <div>
                <span className="text-sm font-medium">David K.</span>
                <span className="text-base font-semibold">
                  Social Media Influencer
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 flex-col">
            <div className="p-4 w-full gap-20 md:gap-36 flex flex-col justify-between rounded-xl border-1 border-divider">
              <div>
                &quot;What I love most about this affiliate program is the
                support team. They’re always available to answer questions and
                help optimize my campaigns”.
              </div>
              <div>
                <span className="text-sm font-medium">David K.</span>
                <span className="text-base font-semibold">
                  Social Media Influencer
                </span>
              </div>
            </div>
            <div className="p-4 w-full gap-20 md:gap-[186px] flex flex-col justify-between rounded-xl border-1 border-divider">
              <div>
                &quot;What I love most about this affiliate program is the
                support team. They’re always available to answer questions and
                help optimize my campaigns”.
              </div>
              <div>
                <span className="text-sm font-medium">David K.</span>
                <span className="text-base font-semibold">
                  Social Media Influencer
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative isolate pt-40 w-full rounded-3xl" id="hero">
        <div className="flex flex-col items-center gap-4 max-w-xl mx-auto">
          <div>
            <a
              className="shadow-md py-2.5 px-3.5 rounded-3xl text-sm border-1 border-divider"
              href="#pricing"
              id="pricing"
            >
              Pricing
            </a>
          </div>
          <div className="text-center">
            <h1 className="text-[40px] font-semibold">Simple Pricing</h1>
            <span className="font-medium text-divider/30 text-base">
              Get lifetime access to our app for a none-time price that won’t
              break the bank
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          <div className="flex flex-col gap-16 p-10 rounded-2xl border-1 border-divider shadow-sm h-90">
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="text-[40px] font-bold">Free</h3>
              </div>
              <span className="text-[15px] text-divider/50">
                Try it as long as you like
              </span>
              <div className="flex flex-col gap-2 mt-10 w-full md:min-w-80">
                <div className="flex gap-2">
                  <CheckIcon size={16} />
                  Limited programs
                </div>
                <div className="flex gap-2">
                  <CheckIcon size={16} />
                  Get access to free listing
                </div>
              </div>
            </div>
            <Button className="bg-[#F9F2FF] text-black" radius="full" size="lg">
              Sign up for free
            </Button>
          </div>

          <div className="w-full flex flex-col gap-16 p-10 rounded-2xl bg-[#C0B4FE] h-90">
            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex flex-col">
                  <h3 className="text-[40px] font-bold text-black">
                    Unlimited
                  </h3>
                  <span className="text-[15px] text-black/90">
                    Limtless possibilites
                  </span>
                </div>
                <Button className="bg-[#361C6C] text-white" radius="full">
                  RECOMMENDED
                </Button>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-10 w-full md:min-w-80 text-black/90">
                <div className="flex gap-2">
                  <CheckIcon size={16} />
                  Unlimited Affiliate Programs
                </div>
                <div className="flex gap-2">
                  <CheckIcon size={16} />
                  Lifetime Access
                </div>
                <div className="flex gap-2">
                  <CheckIcon size={16} />
                  708 Niches
                </div>
                <div className="flex gap-2">
                  <CheckIcon size={16} />
                  Future updates and affiliate programs
                </div>
                <div className="flex gap-2">
                  <CheckIcon size={16} />
                  Access to ‘Niches Ideas’ page
                </div>
                <div className="flex gap-2">
                  <CheckIcon size={16} />
                  Access to ‘For You’ page
                </div>
              </div>
            </div>
            <Button
              className="bg-[#F9F2FF] text-[#4E2D92] md:w-64"
              radius="full"
              size="lg"
            >
              Choose plan ($45)
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
}
