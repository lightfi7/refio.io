"use client";
import { Switch } from "@nextui-org/switch";
import { useState } from "react";

export default function Page() {
  const [annual, setAnnual] = useState(false);

  return (
    <div>
      <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-base font-semibold leading-7 text-blue-600">
            Pricing
          </h1>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Simple pricing
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-divider/50">
          Get lifetime access to our app for a one-time price that won&apos;t
          break the bank!
        </p>
        <div className="py-4 w-full flex justify-center">
          <Switch onChange={() => setAnnual(!annual)}>
            {annual ? "Annual" : "Monthly"}
          </Switch>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-divider sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight">
              Lifetime membership with futures updates
            </h3>
            <p className="mt-6 text-base leading-7 text-divider/50">
              Enjoy lifetime access to our app, including all future updates,
              all futures affiliate programs, for a one-time affordable price!
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <div className="flex-none text-sm font-semibold leading-6 text-blue-600">
                What’s included
              </div>
              <div className="h-px flex-auto bg-divider/10" />
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-divider/50 sm:grid-cols-2 sm:gap-6">
              <li className="flex gap-x-3">
                <svg
                  aria-hidden="true"
                  className="h-6 w-5 flex-none text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    fillRule="evenodd"
                  />
                </svg>
                17,033 affiliate programs
              </li>

              <li className="flex gap-x-3">
                <svg
                  aria-hidden="true"
                  className="h-6 w-5 flex-none text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    fillRule="evenodd"
                  />
                </svg>
                708 niches
              </li>

              <li className="flex gap-x-3">
                <svg
                  aria-hidden="true"
                  className="h-6 w-5 flex-none text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    fillRule="evenodd"
                  />
                </svg>
                Lifetime access
              </li>

              <li className="flex gap-x-3">
                <svg
                  aria-hidden="true"
                  className="h-6 w-5 flex-none text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    fillRule="evenodd"
                  />
                </svg>
                Futures updates and affiliate programs
              </li>

              <li className="flex gap-x-3">
                <svg
                  aria-hidden="true"
                  className="h-6 w-5 flex-none text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    fillRule="evenodd"
                  />
                </svg>
                Access to &quot;For You&quot; page
              </li>

              <li className="flex gap-x-3">
                <svg
                  aria-hidden="true"
                  className="h-6 w-5 flex-none text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    fillRule="evenodd"
                  />
                </svg>
                Access to &quot;Niche ideas&quot; page
              </li>
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl py-10 text-center ring-1 ring-inset ring-divider/10 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold ">
                  Pay once, own it forever
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight ">
                    ${annual ? "200" : "19"}
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-divider/50">
                    USD
                  </span>
                </p>
                <a
                  className="mt-10 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href={annual ? "/payment?annual=true" : "/payment"}
                >
                  Get access
                </a>
                <div className="mt-4">
                  <a
                    className="text-sm font-semibold text-gray-900"
                    href="/sign-up"
                  >
                    Try for free <span aria-hidden="true">→</span>
                  </a>
                  <p className="mt-6 text-xs leading-5 text-divider/50">
                    Affilisting uses Gumroad for payment. Invoice available on
                    your Gumroad space
                  </p>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6">
          <div className="rounded-3xl px-6 py-8 sm:p-10 lg:flex lg:items-center">
            <div className="flex-1">
              <div>
                <h3 className="inline-flex rounded-full px-4 py-1 text-base font-semibold text-divider/80">
                  Free plan
                </h3>
              </div>
              <div className="mt-4 text-lg  my-4 mx-2">
                <div className="flex gap-x-3">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-5 flex-none text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      clipRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      fillRule="evenodd"
                    />
                  </svg>
                  Access to a list of 30 affiliate programs that changes every
                  month for free.
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-md shadow lg:mt-0 lg:ml-10 lg:flex-shrink-0">
              <a
                className="flex items-center justify-center rounded-md border border-divider/10 px-5 py-3 text-base font-medium text-divider/80 hover:bg-divider/10"
                href="/sign-up"
              >
                Get access to free list
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
