"use client";
import { usePathname, useRouter } from "next/navigation";
import { UserCog } from "lucide-react";
import { Button } from "@nextui-org/button";
import { useState } from "react";

const menuItems = [
  { link: "/account/profile", title: "My Profile " },
  { link: "/account/security", title: "Password/Security" },
  { link: "/account/notification", title: "Notification Settings" },
  // {link: '/account/appearance', title: 'Appearance Themes'},
  // { link: "/account/session", title: "Browser Sessions" },
];

const Toolbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menu, setMenu] = useState(pathname);

  return (
    <>
      <div className="w-full flex flex-col gap-4 border-b border-divider py-4 lg:py-2 ">
        <div className="flex items-center gap-4">
          <UserCog />
          <h2 className="text-xl font-semibold">Account Settings</h2>
        </div>
        <div key={menu} className={"flex flex-wrap items-center space-x-1"}>
          {menuItems.map((item, i) => (
            <Button
              key={i}
              color={menu == item.link ? "primary" : "default"}
              radius={"full"}
              size={"md"}
              variant={menu == item.link ? "bordered" : "light"}
              onClick={() => {
                setMenu(item.link);
                router.push(item.link);
              }}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </div>
      {/* <div
        className={"flex md:hidden items-center space-x-4  border-divider py-2"}
      >
        <Button isIconOnly radius={"full"} size={"sm"} variant={"bordered"}>
          <ArrowLeftIcon size={24} />
        </Button>
        <h2 className="text-xl font-semibold">Account Settings</h2>
      </div> */}
    </>
  );
};

export default Toolbar;
function useEffects(arg0: () => void, arg1: string[]) {
  throw new Error("Function not implemented.");
}
