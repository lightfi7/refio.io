"use client";

import * as React from "react";
import { createContext } from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}

// Search

export interface SearchParamsProps {
  text: string;
  niches: string[];
  platforms: string[];
  locations: string[];
  hideInter: boolean;
  minCommissionPercent: number | null;
  maxCommissionPercent: number | null;
  minCommissionAmount: number | null;
  maxCommissionAmount: number | null;
  easy2Join: number;
  relationShip: number;
  paymentDeadline: number;
  type: string;
  productType: string;
  hideApplied: boolean;
  directedProgram: boolean;
  isPromoted: boolean;
  group: string;
  viewMode: string | "grid" | "list";
  sortType: string | "asc" | "desc";
}

export interface SearchContextProps {
  params: SearchParamsProps;
  setSearchParams: Function;
}

export const SearchContext = createContext<SearchContextProps>({
  params: {
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
    hideApplied: false,
    group: "all",
    directedProgram: false,
    isPromoted: false,
    viewMode: "grid",
    sortType: "asc",
  },
  setSearchParams: () => {},
});

interface SearchProviderProps {
  children: React.ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = (props) => {
  const [params, setParams] = React.useState<SearchParamsProps>({
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
    group: "all",
    viewMode: "grid",
    sortType: "asc",
  });

  const setSearchParams = (data: Partial<SearchParamsProps>) => {
    let newParam = { ...params, ...data };

    setParams(newParam);
  };

  return (
    <SearchContext.Provider value={{ params, setSearchParams }}>
      {props.children}
    </SearchContext.Provider>
  );
};
