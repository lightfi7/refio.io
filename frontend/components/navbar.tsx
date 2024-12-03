"use client";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useTheme } from "next-themes";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { data: session } = useSession();

  const UserAvatar = () => {
    return (
      <>
        {session?.user != null && (
          <Dropdown
            backdrop="blur"
            classNames={{
              base: "before:bg-default-200", // change arrow background
              content:
                "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
            }}
            placement="left-end"
            type="menu"
          >
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="default"
                name={session?.user?.name}
                size="md"
                src={
                  session?.user?.image
                    ? `https://refio.io/avatars/${session?.user?.image}`
                    : ""
                }
              />
            </DropdownTrigger>
            <DropdownMenu className="min-w-60" variant="solid">
              <DropdownItem key="profile" isDisabled className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{session?.user?.email}</p>
              </DropdownItem>
              <DropdownItem
                key="settings"
                onClick={() => {
                  router.push("/account/profile");
                }}
              >
                My Settings
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={async () => {
                  await signOut();
                }}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </>
    );
  };

  return (
    <NextUINavbar
      className="border-b-[1px] border-divider bg-transparent"
      maxWidth="2xl"
      position="sticky"
    >
      <NavbarContent className="md:hidden basis-1 pl-2" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit pr-4">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            {theme == "light" ? (
              <Image
                alt="logo"
                className=" min-w-40"
                height={90}
                src={"/images/logo.png"}
                width={120}
              />
            ) : (
              <Image
                alt="logo"
                className=" min-w-40"
                height={90}
                src={"/images/logo-dark.png"}
                width={120}
              />
            )}
          </NextLink>
        </NavbarBrand>
        <ul className="hidden md:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/*<NavbarContent*/}
      {/*    className="hidden sm:flex basis-1/5 sm:basis-full"*/}
      {/*    justify="end"*/}
      {/*>*/}
      {/*  <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>*/}
      {/*</NavbarContent>*/}

      <NavbarContent as="div" justify="end">
        <NavbarItem className="gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {session?.user == null && (
          <NavbarItem key={"sign-in"}>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium border-1 py-1.5 px-3 border-divider rounded-3xl",
              )}
              color="foreground"
              href={"/sign-in"}
            >
              Sign in
            </NextLink>
          </NavbarItem>
        )}
        {UserAvatar()}
      </NavbarContent>

      <NavbarMenu>
        {/*{searchInput}*/}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {session?.user == null && (
            <Link href={"/sign-in"} size="lg">
              Sign in
            </Link>
          )}
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link href={item.href} size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
