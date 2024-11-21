"use client";
import {
  ArrowDownAzIcon,
  BadgePercent,
  LayoutGrid,
  ListIcon,
  SearchIcon,
  Share2Icon,
} from "lucide-react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Select, SelectItem } from "@nextui-org/select";
import { ChangeEvent, useContext, useState } from "react";

import { SearchContext } from "@/app/providers";

const sortList = [
  { key: "latest_update", name: "Latest update" },
  { key: "name_asc", name: "Name ↿" },
  { key: "name_desc", name: "Name ⇂" },
  { key: "ca_asc", name: "Commission $ ↿" },
  { key: "ca_desc", name: "Commission $ ⇂" },
  { key: "cp_asc", name: "Commission % ↿" },
  { key: "cp_desc", name: "Commission % ⇂" },
];

const Toolbar = () => {
  const { params, setSearchParams } = useContext(SearchContext);
  const [searchText, setSearchText] = useState<string>("");

  const onChangeSearchText = (value: string) => {
    setSearchText(value);
    setSearchParams({
      text: value,
    });
  };

  const onChangeViewMode = (value: string) => {
    setSearchParams({
      viewMode: value,
    });
  };

  const onChangeSortType = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      sortType: e.target.value,
    });
  };

  return (
    <div className="w-full flex flex-col gap-4 border-b border-divider py-4 lg:py-1">
      <div className="flex items-center space-x-2">
        <Share2Icon />
        <h2 className="text-xl font-semibold">Affiliate Program List</h2>
      </div>
      <div className="flex flex-wrap lg:flex-row items-center gap-2.5 lg:divide-x-2 lg:divide-divider">
        <div className="flex lg:flex-1 items-center overflow-x-auto lg:overflow-x-hidden md:min-w-full lg:min-w-0 justify-between py-2 gap-4 lg:divide-x-2 lg:divide-divider">
          <Button
            className="flex items-center"
            color={params?.group == "promoted" ? "primary" : "default"}
            radius="full"
            startContent={<BadgePercent color="#ff4751" />}
            variant={params?.group == "promoted" ? "bordered" : "light"}
            onClick={() => {
              setSearchParams({
                isPromoted: true,
                group: "promoted",
              });
            }}
          >
            <h4>Promoted</h4>
          </Button>
          <div className="flex flex-1 items-center justify-between space-x-2 px-2 md:px-4">
            <div className="flex items-center">
              {[
                { name: "All", key: "all" },
                { name: "Favorites", key: "favorites" },
                { name: "Already applied", key: "applied" },
                { name: "Last added", key: "last_added" },
              ].map((item, index) => (
                <Button
                  key={index}
                  color={item.key === params?.group ? "primary" : "default"}
                  radius="full"
                  size="md"
                  variant={item.key === params?.group ? "bordered" : "light"}
                  onClick={() =>
                    setSearchParams({
                      group: item.key,
                    })
                  }
                >
                  {item.name}
                </Button>
              ))}
            </div>
            <div className="hidden md:inline-block">
              <Input
                isClearable
                className="max-w-xs"
                placeholder="Search list"
                startContent={<SearchIcon />}
                value={searchText}
                onValueChange={onChangeSearchText}
              />
            </div>
          </div>
        </div>
        <div className="md:px-4">
          <Tabs
            aria-label="Options"
            onSelectionChange={(key) =>
              onChangeViewMode(key === "Grid" ? "grid" : "list")
            }
          >
            {["Grid", "List"].map((view) => (
              <Tab
                key={view}
                title={
                  <div className="flex items-center space-x-2">
                    <span>{view}</span>
                    {view === "Grid" ? (
                      <LayoutGrid size={16} />
                    ) : (
                      <ListIcon size={16} />
                    )}
                  </div>
                }
              />
            ))}
          </Tabs>
        </div>
        <div className="md:px-2 flex items-center space-x-4">
          <div className="flex items-center md:space-x-1.5">
            <ArrowDownAzIcon size={24} strokeWidth={1} />
            <span className="hidden md:inline whitespace-nowrap text-divider/60">
              Sort by:
            </span>
          </div>
          <Select className="min-w-44" onChange={onChangeSortType}>
            {sortList.map((s) => (
              <SelectItem key={s.key}>{s.name}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
