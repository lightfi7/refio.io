"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { Pagination } from "@nextui-org/pagination";

import PCard from "@/components/dashboard/pcard";
import Banner from "@/components/dashboard/banner";
import Toolbar from "@/components/dashboard/toolbar";
import Filterbar from "@/components/dashboard/filterbar";
import { SearchContext, SearchContextProps } from "@/app/providers";
import { getRateValue } from "@/utils/common";
import { Program } from "@/types/define";

export default function DashboardPage() {
  const { params } = useContext<SearchContextProps>(SearchContext);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [promoted, setPromoted] = useState<Program>();
  const [_pageIndex, setPageIndex] = useState(0);
  const [_pages, setPages] = useState(1);
  const [_, setTotalCount] = useState(0);

  const fetchData = useCallback(async () => {
    // Fetching data
    console.log("Fetching data");
    try {
      const response = await fetch("/api/main/get-programs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ params: { page: _pageIndex, ...params } }),
      });

      if (response.ok) {
        const {
          programs = [],
          pageIndex = 1,
          pages = 1,
          total = 50,
        } = await response.json();

        setPromoted(
          programs.find((program: Program) => program.promoted === 1),
        );
        setPrograms(programs);
        setPages(pages);
        setPageIndex(pageIndex);
        setTotalCount(total);
      }
    } catch (err) {
      console.error(err);
    }
  }, [
    _pageIndex,
    params.group,
    params.niches.length,
    params.text,
    params.platforms.length,
    params.locations.length,
    params.minCommissionPercent,
    params.maxCommissionPercent,
    params.minCommissionAmount,
    params.maxCommissionAmount,
    params.easy2Join,
    params.relationShip,
    params.paymentDeadline,
    params.type,
    params.productType,
    params.hideApplied,
    params.directedProgram,
    params.sortType,
  ]);

  useEffect(() => {
    // fetch("/api/get-client-info", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then((response) => response.json())
    //   .catch(err => console.log(err));
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col">
      <Toolbar />
      <div className="flex">
        <Filterbar />
        <div className={"flex flex-1 flex-col space-y-4 px-2 md:px-4 py-4"}>
          {promoted != null && <Banner program={promoted} />}
          {programs.length != 0 && (
            <Pagination
              isCompact
              showControls
              showShadow
              className="mx-auto"
              color="default"
              page={_pageIndex}
              size="sm"
              total={_pages}
              onChange={(page) => setPageIndex(page)}
            />
          )}
          <div
            className={`grid grid-cols-1 ${params.viewMode == "grid" ? "lg:grid-cols-2 xl:grid-cols-3" : ""} gap-4`}
          >
            {programs.map((program, i) => (
              <PCard
                key={i}
                commission={`${program.commission_amount_formatted === null ? "--" : program.commission_amount_formatted}`}
                commissionPercent={`${program.commission_in_percentage_formatted === null ? "--" : program.commission_in_percentage_formatted}`}
                commissionType={`${program.commission_type === null ? "--" : program.commission_type}`}
                cookieDuration={`${program.duration === null ? "--" : program.duration}`}
                isGrid={params.viewMode == "grid"}
                name={(program.promoted == 1 ? "🔥" : "") + program.name}
                platform={program.platform?.name}
                rating={getRateValue(program?.average_ratings)}
                tags={program.tags}
                uuid={program.uuid}
              />
            ))}
          </div>
          {programs.length != 0 && (
            <Pagination
              isCompact
              showControls
              showShadow
              className="mx-auto"
              color="default"
              page={_pageIndex}
              size="sm"
              total={_pages}
              onChange={(page) => setPageIndex(page)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
