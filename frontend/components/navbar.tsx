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

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const UserAvatar = () => {
    return (
      <>
        {session?.user != null && (
          <Dropdown offset={10} placement="left-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="default"
                name={session?.user?.name}
                size="md"
                src={
                  session?.user?.image
                    ? `https://refio.io/images/${session?.user?.image}`
                    : ""
                }
              />
            </DropdownTrigger>
            <DropdownMenu variant="solid">
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
      className="border-b-[1px] border-divider"
      maxWidth="2xl"
      position="sticky"
    >
      <NavbarContent className="md:hidden basis-1 pl-4" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-2xl">Referalio</p>
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
        {UserAvatar()}
      </NavbarContent>

      <NavbarMenu>
        {/*{searchInput}*/}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
