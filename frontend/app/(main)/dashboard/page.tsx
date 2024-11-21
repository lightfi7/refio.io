"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { Pagination } from "@nextui-org/pagination";

import PCard from "@/components/dashboard/pcard";
import Banner from "@/components/dashboard/banner";
import Toolbar from "@/components/dashboard/toolbar";
import Filterbar from "@/components/dashboard/filterbar";
import { SearchContext, SearchContextProps } from "@/app/providers";
import { getRateValue } from "@/utils/common";

export default function DashboardPage() {
  const { params } = useContext<SearchContextProps>(SearchContext);
  const [isLoading, setIsLoading] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [_pageIndex, setPageIndex] = useState(0);
  const [_pages, setPages] = useState(100);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = useCallback(async () => {
    // Fetching data
    console.log("Fetching data");
    setIsLoading(true);
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

        setPrograms(programs);
        setPages(pages);
        setPageIndex(pageIndex);
        setTotalCount(total);
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
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
    // Checking Premium
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col">
      <Toolbar />
      <div className="flex">
        <Filterbar />
        <div className={"flex flex-1 flex-col space-y-4 px-2 md:px-4 py-4"}>
          <Banner />
          <Pagination
            isCompact
            showControls
            showShadow
            color="default"
            page={_pageIndex}
            total={_pages}
            onChange={(page) => setPageIndex(page)}
          />
          <div
            className={`grid grid-cols-1 ${params.viewMode == "grid" ? "lg:grid-cols-2 xl:grid-cols-3" : ""} gap-4`}
          >
            {programs.map(
              (
                program: {
                  _id: string;
                  uuid: string;
                  name: string;
                  promoted: number;
                  platform: any;
                  commission_type: any;
                  average_ratings: any;
                  commission_amount_formatted: string;
                  commission_in_percentage_formatted: string;
                  duration: any;
                  tags: [];
                },
                i,
              ) => (
                <PCard
                  key={i}
                  commission={`${program.commission_amount_formatted === null ? "--" : program.commission_amount_formatted}`}
                  commissionPercent={`${program.commission_in_percentage_formatted === null ? "--" : program.commission_in_percentage_formatted}`}
                  commissionType={`${program.commission_type === null ? "--" : program.commission_type.machine_name}`}
                  cookieDuration={`${program.duration === null ? "--" : program.duration}`}
                  isGrid={params.viewMode == "grid"}
                  name={(program.promoted == 1 ? "🔥" : "") + program.name}
                  platform={program.platform?.name}
                  rating={getRateValue(program.average_ratings)}
                  tags={program.tags}
                  uuid={program.uuid}
                />
              ),
            )}
          </div>
          <Pagination
            isCompact
            showControls
            showShadow
            color="default"
            page={_pageIndex}
            total={_pages}
            variant={"flat"}
            onChange={(page) => setPageIndex(page)}
          />
        </div>
      </div>
    </div>
  );
}
