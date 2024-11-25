"use client";
import { Button } from "@nextui-org/button";
import { SlidersHorizontalIcon } from "lucide-react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Checkbox } from "@nextui-org/checkbox";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { Slider } from "@nextui-org/slider";
import { useCallback, useContext, useEffect, useState } from "react";
import { SharedSelection } from "@nextui-org/system";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { debounce } from "lodash";

import { SearchContext, SearchContextProps } from "@/app/providers";
import { usePokemonList } from "@/components/dashboard/usePokemonList";

const Filterbar = () => {
  const { params, setSearchParams } =
    useContext<SearchContextProps>(SearchContext);

  const [nicheList, setNicheList] = useState<
    { id: number; slug: string; name: string }[]
  >([]);
  const [platformList, setPlatformList] = useState<
    { id: number; name: string; url: string }[]
  >([]);
  const [locationList, setLocationList] = useState<
    { id: number; country_code: string }[]
  >([]);
  const [productTypeList, setProductTypeList] = useState([
    { value: "all", title: "All" },
    { value: "physical_product", title: "Physical product" },
    { value: "physical_service", title: "Physical service" },
    { value: "digital_product", title: "Digital product" },
    { value: "digital_service", title: "Digital service" },
  ]);
  const [typeList, setTypeList] = useState([
    { value: "all", title: "All" },
    { value: "one_time", title: "One time" },
    { value: "recurring", title: "Recurring" },
  ]);

  const [selectedNiches, setSelectedNiches] = useState<SharedSelection>(
    new Set([]),
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState<SharedSelection>(
    new Set([]),
  );
  const [selectedLocations, setSelectedLocations] = useState<SharedSelection>(
    new Set([]),
  );
  const [minCommissionPercent, setMinCommissionPercent] = useState<
    number | null
  >(null);
  const [maxCommissionPercent, setMaxCommissionPercent] = useState<
    number | null
  >(null);
  const [minCommissionAmount, setMinCommissionAmount] = useState<number | null>(
    null,
  );
  const [maxCommissionAmount, setMaxCommissionAmount] = useState<number | null>(
    null,
  );
  const [easy2Join, setEasy2Join] = useState<number | number[]>(0);
  const [relationShip, setRelationShip] = useState<number | number[]>(0);
  const [paymentDeadline, setPaymentDeadline] = useState<number | number[]>(0);
  const [type, setType] = useState("");
  const [productType, setProductType] = useState("");
  const [hideApplied, setHideApplied] = useState(true);
  const [directedProgram, setDirectedProgram] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const { items, hasMore, isLoading, onLoadMore } = usePokemonList(nicheList);
  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false,
    onLoadMore,
  });

  const fetchSearchParams = useCallback(async () => {
    const response = await fetch("/api/main/get-search-params", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (response.ok) {
      const { tags = [], platforms = [], langs = [] } = await response.json();

      setNicheList(tags);
      setPlatformList(platforms);
      setLocationList(langs);
    }
  }, []);

  useEffect(() => {
    fetchSearchParams();
  }, [fetchSearchParams]);

  const debouncedSetParams = debounce(() => {
    setSearchParams({
      niches: Array.from(selectedNiches as Set<any>) || [],
      platforms: Array.from(selectedPlatforms as Set<any>) || [],
      locations: Array.from(selectedLocations as Set<any>) || [],
      minCommissionPercent,
      maxCommissionPercent,
      minCommissionAmount,
      maxCommissionAmount,
      easy2Join,
      relationShip,
      paymentDeadline,
      type,
      productType,
      hideApplied,
      directedProgram,
    });
  }, 500);

  useEffect(() => {
    debouncedSetParams();

    return () => {
      debouncedSetParams.cancel();
    };
  }, [
    Array.from(selectedNiches as Set<any>).length,
    Array.from(selectedPlatforms as Set<any>).length,
    Array.from(selectedLocations as Set<any>).length,
    minCommissionPercent,
    maxCommissionPercent,
    minCommissionAmount,
    maxCommissionAmount,
    easy2Join,
    relationShip,
    paymentDeadline,
    type,
    productType,
    hideApplied,
    directedProgram,
  ]);

  const onClearFitler = () => {
    setSelectedNiches(new Set([]));
    setSelectedPlatforms(new Set([]));
    setSelectedLocations(new Set([]));
    setMinCommissionPercent(null);
    setMaxCommissionPercent(null);
    setMinCommissionAmount(null);
    setMaxCommissionAmount(null);
    setEasy2Join(0);
    setRelationShip(0);
    setPaymentDeadline(0);
    setType("");
    setProductType("");
    setHideApplied(true);
    setDirectedProgram(false);
    setSearchParams({
      text: "",
      niches: [],
      platforms: [],
      locations: [],
      hideInter: false,
      minCommissionPercent: null,
      maxCommissionPercent: null,
      minCommissionAmount: null,
      maxCommissionAmount: null,
      easy2Join: 0,
      relationShip: 0,
      paymentDeadline: 0,
      type: "",
      productType: "",
      hideApplied: true,
      directedProgram: false,
      isPromoted: false,
      viewMode: "grid",
      sortType: "asc",
    });
  };

  return (
    <div className="hidden md:flex flex-col min-w-76 max-w-80 xl:max-w-96 min-h-screen">
      <div className="flex justify-between items-center p-2">
        <Button
          disabled
          radius={"lg"}
          startContent={<SlidersHorizontalIcon />}
          variant="light"
        >
          Filters
        </Button>
        <Button
          color="danger"
          radius={"lg"}
          variant="light"
          onClick={onClearFitler}
        >
          {" "}
          Clear filter
        </Button>
      </div>
      <div>
        <Accordion
          itemClasses={{
            title: "font-normal text-medium",
          }}
          selectionMode="multiple"
          showDivider={false}
        >
          <AccordionItem key="1" aria-label="Niches" title="Niches">
            {
              <div className={"p-4"}>
                <Select
                  isLoading={isLoading}
                  placeholder="Select a niche"
                  scrollRef={scrollerRef}
                  selectedKeys={selectedNiches}
                  selectionMode="multiple"
                  variant="bordered"
                  onOpenChange={setIsOpen}
                  onSelectionChange={(keys) => setSelectedNiches(keys)}
                >
                  {items.map((item, i) => (
                    <SelectItem key={i}>{item.name}</SelectItem>
                  ))}
                </Select>
              </div>
            }
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Affiliate Platform"
            title="Affiliate Platform"
          >
            {
              <div className={"p-4"}>
                <Select
                  placeholder="Select a platform"
                  selectedKeys={selectedPlatforms}
                  selectionMode="multiple"
                  variant="bordered"
                  onSelectionChange={(keys) => setSelectedPlatforms(keys)}
                >
                  {platformList.map((item) => (
                    <SelectItem key={item.id}>{item.name}</SelectItem>
                  ))}
                </Select>
              </div>
            }
          </AccordionItem>
          <AccordionItem key="3" aria-label="Location" title="Location">
            {
              <div className={"p-4"}>
                <Select
                  placeholder="Select a location"
                  selectedKeys={selectedLocations}
                  selectionMode="multiple"
                  variant="bordered"
                  onSelectionChange={(keys) => setSelectedLocations(keys)}
                >
                  {locationList.map((item) => (
                    <SelectItem key={item.id}>{item.country_code}</SelectItem>
                  ))}
                </Select>
              </div>
            }
          </AccordionItem>
          <AccordionItem key="4" aria-label="Commision" title="Commision">
            {
              <div className="space-y-2 p-4">
                <div>
                  <label
                    className="block text-sm font-medium text-divider/70"
                    htmlFor="#"
                  >
                    Commission (%):
                  </label>
                  <div className={"flex flex-col items-center gap-2"}>
                    <Input
                      startContent={<span>Min:</span>}
                      type={"number"}
                      value={`${minCommissionPercent}`}
                      variant={"bordered"}
                      onValueChange={(v) => setMinCommissionPercent(Number(v))}
                    />
                    <Input
                      startContent={<span>Max:</span>}
                      type="number"
                      value={`${maxCommissionPercent}`}
                      variant={"bordered"}
                      onValueChange={(v) => setMaxCommissionPercent(Number(v))}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium  text-divider/70"
                    htmlFor="#"
                  >
                    Commission amount:
                  </label>
                  <div className={"flex flex-col items-center gap-2"}>
                    <Input
                      startContent={<span>Min:</span>}
                      type={"number"}
                      value={`${minCommissionAmount}`}
                      variant={"bordered"}
                      onValueChange={(v) => setMinCommissionAmount(Number(v))}
                    />
                    <Input
                      startContent={<span>Max:</span>}
                      type={"number"}
                      value={`${maxCommissionAmount}`}
                      variant={"bordered"}
                      onValueChange={(v) => setMaxCommissionAmount(Number(v))}
                    />
                  </div>
                </div>
              </div>
            }
          </AccordionItem>
          <AccordionItem key="5" aria-label="Reviews" title="Reviews">
            {
              <div className="p-4">
                <Slider
                  className="max-w-md"
                  defaultValue={0.4}
                  label="Easy to Join"
                  maxValue={5}
                  minValue={0}
                  step={0.01}
                  value={easy2Join}
                  onChange={(value) => {
                    setEasy2Join(value);
                  }}
                />
                <Slider
                  className="max-w-md"
                  defaultValue={0.4}
                  label="Relationship with affiliates"
                  maxValue={5}
                  minValue={0}
                  step={0.01}
                  value={relationShip}
                  onChange={(value) => {
                    setRelationShip(value);
                  }}
                />
                <Slider
                  className="max-w-md"
                  defaultValue={0.4}
                  label="Payment deadline"
                  maxValue={5}
                  minValue={0}
                  step={0.01}
                  value={paymentDeadline}
                  onChange={(value) => {
                    setPaymentDeadline(value);
                  }}
                />
              </div>
            }
          </AccordionItem>
          <AccordionItem key="6" aria-label="Type" title="Type">
            {
              <div className={"p-4"}>
                <RadioGroup value={type} onValueChange={(v) => setType(v)}>
                  {typeList.map((item, i) => (
                    <Radio key={i} value={item.value}>
                      {item.title}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
            }
          </AccordionItem>
          <AccordionItem key="7" aria-label="Product Type" title="Product Type">
            {
              <div className={"p-4"}>
                <RadioGroup
                  value={productType}
                  onValueChange={(v) => setProductType(v)}
                >
                  {productTypeList.map((item, i) => (
                    <Radio key={i} value={item.value}>
                      {item.title}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
            }
          </AccordionItem>
        </Accordion>
      </div>
      <div className={"flex items-center border-t-1 py-6 border-divider"}>
        <div className={"flex flex-col space-y-1"}>
          <Checkbox
            checked={hideApplied}
            onValueChange={(v) => setHideApplied(v)}
          >
            Hide already applied
          </Checkbox>
          <span className={"text-divider/60 text-start"}>
            Hide affiliate program that you have already apply.
          </span>
        </div>
      </div>
      <div className={"flex items-center border-t-1 py-6 border-divider"}>
        <div className={"flex flex-col space-y-1"}>
          <Checkbox
            checked={directedProgram}
            onValueChange={(v) => setDirectedProgram(v)}
          >
            Show only directed program
          </Checkbox>
          <span className={"text-divider/60 text-start"}>
            Hide affiliate program that comes from affiliate platforms and only
            shows direct programs.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Filterbar;
