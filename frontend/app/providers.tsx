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
  setSearchParams: () => { },
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


export interface ToastProviderProps {
  children: React.ReactNode;
}

export interface ToastContextProps {
  message: string | null | undefined;
  type: 'error' | 'info' | 'success' | 'warning',
  success: Function;
  error: Function;
  warning: Function;
  info: Function;
  dismiss: Function;
}


export const ToastContext = createContext<ToastContextProps>({
  message: "",
  type: 'success',
  success: () => { },
  error: () => { },
  warning: () => { },
  info: () => { },
  dismiss: () => { },
})


export function ToastProvider({ children }: ToastProviderProps) {
  const router = useRouter();
  const [message, setMessage] = React.useState<string | null | undefined>();
  const [type, setType] = React.useState<'error' | 'info' | 'success' | 'warning'>('success');

  const setToast = (message: string, type: 'error' | 'info' | 'success' | 'warning') => {
    setMessage(message);
    setType(type);
  };

  const success = (message: string) => {
    setToast(message, "success");
  };

  const error = (message: string) => {
    setToast(message, "error");
  };

  const warning = (message: string) => {
    setToast(message, "warning");
  };

  const info = (message: string) => {
    setToast(message, "info");
  };

  const dismiss = () => {
    setMessage(null);
    setType('success');
  };

  return (
    <ToastContext.Provider value={{ message, type, success, error, warning, info, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}