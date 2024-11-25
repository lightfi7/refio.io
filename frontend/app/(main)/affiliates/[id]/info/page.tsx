"use client";
import {
  ArrowRightIcon,
  CircleDollarSignIcon,
  CookieIcon,
  PercentCircleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Chip } from "@nextui-org/chip";
import Link from "next/link";

import { getRateValue, timeDiff } from "@/utils/common";

export default function Page() {
  const [program, setProgram] = useState<any>();
  const [_activities, setActivities] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch("/api/main/get-program", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uuid: params.id }),
    })
      .then((res) => res.json())
      .then(({ program }) => {
        setProgram(program);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={"flex flex-col md:flex-row justify-between gap-12 py-10 "}>
      <div className="flex-1 flex flex-col gap-12">
        <div className={"flex flex-col border border-divider rounded-xl"}>
          <div
            className={
              "flex flex-col items-start gap-0 p-4 rounded-t-xl border-b border-divider"
            }
            style={{
              backgroundImage: "url(/images/bg-pcard.png)",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h1 className={"font-semibold text-xl"}>Information</h1>
            <span className="text-divider/70">{program?.name} information</span>
          </div>

          <div
            className={
              "flex items-center justify-between px-6 py-4 border-b border-divider"
            }
          >
            <span className={"text-md"}>Affiliate Type</span>
            <span>{program?.platform ? program?.platform.name : "--"}</span>
          </div>
          <div
            className={
              "flex items-center justify-between px-6 py-4 border-b border-divider"
            }
          >
            <span className={"text-md"}>Affiliate Program</span>
            <span>
              {program?.commission_type
                ?.replace(/_/g, " ")
                .replace(/^\w/, (c: string) => c.toUpperCase())}
            </span>
          </div>
          <div
            className={
              "flex items-center justify-between px-6 py-4 border-b border-divider"
            }
          >
            <span className={"text-md"}>Product Type</span>
            <span>
              {program?.product_type
                ? program?.product_type.machine_name
                    .split("_")
                    .map((s: any) => s)
                    .join(" ")
                    .replace(/^\w/, (c: string) => c.toUpperCase())
                : "--"}
            </span>
          </div>
          <div
            className={
              "flex items-center justify-between px-6 py-4 border-b border-divider"
            }
          >
            <span className={"text-md"}>Geolocation</span>
            <span>
              {program?.is_international == 1
                ? "International"
                : program?.langs.length
                  ? program?.langs
                      .slice(0, 8)
                      .map((item: any) => item.country_code)
                      .join(", ")
                  : "--"}
            </span>
          </div>
          <div
            className={
              "flex items-center justify-between px-6 py-4 border-b border-divider"
            }
          >
            <span className={"text-md"}>Commission (%)</span>
            <span>
              {program?.commission_in_percentage_formatted
                ? program?.commission_in_percentage_formatted
                : "--"}
            </span>
          </div>
          <div
            className={
              "flex items-center justify-between px-6 py-4 border-b border-divider"
            }
          >
            <span className={"text-md"}>Commission</span>
            <span>
              {program?.commission_amount_formatted
                ? program?.commission_amount_formatted
                : "--"}
            </span>
          </div>
          <div
            className={
              "flex items-center justify-between px-6 py-4 border-b border-divider"
            }
          >
            <span className={"text-md"}>Cash Limit</span>
            <span>{program?.cash_limit ? program?.cash_limit : "--"}</span>
          </div>
          <div
            className={
              "flex items-center justify-between px-6 py-4 border-b border-divider"
            }
          >
            <span className={"text-md"}>Cash Limit (Per Referral)</span>
            <span>
              {program?.cash_limit_per_referal
                ? program?.cash_limit_per_referal
                : "--"}
            </span>
          </div>
          <div
            className={
              "flex items-center justify-between px-6 py-4 border-b border-divider"
            }
          >
            <span className={"text-md"}>Cookie Duration</span>
            <span>
              {program?.duration ? program?.duration.replace("_", " ") : "--"}
            </span>
          </div>
          <div
            className={
              "flex items-center justify-between px-6 py-4 border-b border-divider"
            }
          >
            <span className={"text-md"}>Contact Email</span>
            <span>
              {program?.contact_email ? program?.contact_email : "--"}
            </span>
          </div>
          <div
            className={
              "flex flex-col gap-3 items-start justify-between px-6 py-4 border-b border-divider"
            }
          >
            <span className={"text-md"}>Niches</span>
            <div className={"flex flex-wrap gap-2"}>
              {program?.tags.map((item: any, i: number) => (
                <Chip key={i}>{item.name}</Chip>
              ))}
            </div>
          </div>
        </div>
        {_activities.length > 0 && (
          <div className={"flex flex-col border border-divider rounded-xl"}>
            <div
              className={
                "flex flex-col items-start gap-0 p-4 rounded-t-xl border-b border-divider mb-6"
              }
              style={{
                backgroundImage: "url(/images/bg-pcard.png)",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h1 className={"font-semibold text-xl"}>Activity</h1>
            </div>
            {_activities.map(
              (
                activity: { user: any; program: any; createdAt: string | Date },
                i,
              ) => {
                const { days, hours, minutes } = timeDiff(
                  activity.createdAt,
                  new Date(),
                );

                return (
                  <div key={i} className={"flex items-center gap-2 py-3 px-6"}>
                    <li className="relative flex gap-x-4 w-full">
                      {i != _activities.length - 1 && (
                        <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                          <div className="w-px bg-divider/30" />
                        </div>
                      )}
                      <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white dark:bg-black ">
                        <div className="h-1.5 w-1.5 rounded-full ring-1 ring-divider/100" />
                      </div>
                      <p className="flex-1 flex py-0.5 text-base leading-5 text-gray-500">
                        <span className="font-medium text-divider/100 mr-2">
                          {activity.user?.name}
                        </span>{" "}
                        applied to this program.
                      </p>
                      <div className="flex-none py-0.5 text-sm leading-5 text-divider/60">
                        {days != 0
                          ? `${days} days`
                          : hours != 0
                            ? `${hours} hours`
                            : `${minutes} minutes`}{" "}
                        ago
                      </div>
                    </li>
                  </div>
                );
              },
            )}
          </div>
        )}
      </div>
      <div className={"min-w-96"}>
        <div className="flex flex-col gap-8">
          <div
            className={
              "rounded-xl border border-divider flex flex-col justify-between divide-y divide-divider"
            }
          >
            <div
              className={"flex flex-col items-start p-4 rounded-t-xl"}
              style={{
                backgroundImage: "url(/images/bg-pcard.png)",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h3 className="text-lg font-semibold ">Commission</h3>
              <span className="font-medium">$49 Per Sale</span>
            </div>
            <div className={""}>
              <div
                className={"flex flex-col gap-4 border-b p-4 border-divider"}
              >
                <div className="flex items-center gap-2">
                  <PercentCircleIcon className="text-divider/40" />
                  <span>
                    {program?.commission_amount_formatted
                      ? program?.commission_amount_formatted
                      : "--"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleDollarSignIcon className="text-divider/40" />
                  <span>
                    {program?.commission_in_percentage_formatted
                      ? program?.commission_in_percentage_formatted
                      : "--"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CookieIcon className="text-divider/40" />
                  <span>
                    {program?.duration
                      ? program?.duration.replace("_", " ") + " Cookie Duration"
                      : "--"}
                  </span>
                </div>
              </div>
              <div className="py-2 text-center">
                <Link
                  className="flex font-semibold gap-2 items-center justify-center py-2 text-[#9A86FF]"
                  href={`${program?.link}`}
                >
                  Apply to this program
                  <ArrowRightIcon size={18} />
                </Link>
                <span className="font-medium text-divider/60">
                  You applied to this program already
                </span>
              </div>
            </div>
          </div>
          {/*  */}
          <div
            className={
              "rounded-xl border border-divider flex flex-col justify-between divide-y divide-divider"
            }
          >
            <div
              className={"flex flex-col items-start p-4 rounded-t-xl"}
              style={{
                backgroundImage: "url(/images/bg-pcard.png)",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h3 className="text-lg font-semibold ">Reviews</h3>
              <span className="font-medium">$49 Per Sale</span>
            </div>
            <div className={"p-4 space-y-2"}>
              <div className={"flex flex-col items-start"}>
                <span className={"text-sm text-divider/70"}>Easy to Join</span>
                <div className="flex items-center gap-1 mt-0">
                  {"★★★★☆".split("").map((star, i) => (
                    <span key={i} className="text-purple-300 text-xl">
                      {i <
                      Math.floor(
                        getRateValue(program?.average_ratings, "easy_to_join"),
                      )
                        ? "★"
                        : "☆"}
                    </span>
                  ))}
                  <span className="text-md text-divider/100 ml-1 font-medium">
                    {getRateValue(program?.average_ratings, "easy_to_join")}/5
                  </span>
                </div>
              </div>
              <div className={"flex flex-col items-start"}>
                <span className={"text-sm text-divider/70"}>
                  Relationship with Affiliate
                </span>
                <div className="flex items-center gap-1 mt-0">
                  {"★★★★☆".split("").map((star, i) => (
                    <span key={i} className="text-purple-300 text-xl">
                      {i <
                      Math.floor(
                        getRateValue(program?.average_ratings, "relationship"),
                      )
                        ? "★"
                        : "☆"}
                    </span>
                  ))}
                  <span className="text-md text-divider/100 ml-1 font-medium">
                    {getRateValue(program?.average_ratings, "relationship")}/5
                  </span>
                </div>
              </div>
              <div className={"flex flex-col items-start"}>
                <span className={"text-sm text-divider/70"}>
                  Payment Deadline
                </span>
                <div className="flex items-center gap-1 mt-0">
                  {"★★★★☆".split("").map((star, i) => (
                    <span key={i} className="text-purple-300 text-xl">
                      {i <
                      Math.floor(
                        getRateValue(
                          program?.average_ratings,
                          "payment_deadline",
                        ),
                      )
                        ? "★"
                        : "☆"}
                    </span>
                  ))}
                  <span className="text-md text-divider/100 ml-1 font-medium">
                    {getRateValue(program?.average_ratings, "payment_deadline")}
                    /5
                  </span>
                </div>
              </div>
            </div>
            <div className="py-3 border-t border-divider">
              <Link
                className="flex font-semibold gap-2 items-center justify-center text-[#9A86FF]"
                href={`/affiliates/${program?._id}/add-review`}
              >
                Add your review
                <ArrowRightIcon size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
