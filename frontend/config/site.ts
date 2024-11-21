export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Referalio",
  description: "",
  navItems: [
    {
      label: "Listing",
      href: "/dashboard",
    },
    {
      label: "For you",
      href: "/for-you",
    },
    {
      label: "Niche Ideas",
      href: "/niche=ideas",
    },
    {
      label: "Our Affiliate",
      href: "/out-affiliate",
    },
    {
      label: "Add your program",
      href: "/add-program",
    },
    {
      label: "Pricings",
      href: "/pricing",
    },
  ],
  navMenuItems: [
    {
      label: "Listing",
      href: "/",
    },
    {
      label: "For you",
      href: "/for-you",
    },
    {
      label: "Niche Ideas",
      href: "/niche-ideas",
    },
    {
      label: "Our Affiliate",
      href: "/our-affiliate",
    },
    {
      label: "Add your program",
      href: "/add-program",
    },
    {
      label: "Pricings",
      href: "/pricing",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  userNavItems: [
    {
      label: "Account Settings",
      href: "/account-setting",
    },
  ],
  userNavMenuItems: [
    {
      label: "Account Settings",
      href: "/account-setting",
    },
  ],
  links: {
    // github: "https://github.com/nextui-org/nextui",
    // twitter: "https://twitter.com/getnextui",
    // docs: "https://nextui.org",
    // discord: "https://discord.gg/9b6yyZKmH4",
    // sponsor: "https://patreon.com/jrgarciadev",
  },
};
