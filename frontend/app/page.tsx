export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <section className="relative isolate pt-8" id="hero">
        <div className="py-24 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6">
                <a className="md:inline-flex space-x-4" href="#affiliate">
                  <span className="rounded  px-2.5 py-1 text-xs font-semibold tracking-wide uppercase">
                    Our affiliate program
                  </span>
                  <span className="inline-flex items-center text-sm font-medium space-x-1">
                    <span>Earn 50% of each sales of Affilisting now.</span>
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      x-description="Heroicon name: solid/chevron-right"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </span>
                </a>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl flex flex-col space-y-1">
                <span>
                  <span className="text-blue-600">17074</span> Affiliate
                  Programs
                </span>{" "}
                <span>
                  <span className="text-blue-600">708</span> Niches
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                Affilisting.com offers you the best solution to find the
                affiliate programs that match your niches in a minute.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href="https://affilisting.com/buy"
                >
                  Get for $99
                </a>
                <a
                  className="text-sm font-semibold leading-6 text-gray-900"
                  href="https://affilisting.com/register"
                >
                  Try for free <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="text-xs text-gray-700 mt-4">
                <p>One time payment, lifetime access.</p>
                <p>
                  Access to all affiliate programs that we will add in the
                  future also included.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
