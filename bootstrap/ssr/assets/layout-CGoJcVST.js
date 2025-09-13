import { jsxs, jsx } from "react/jsx-runtime";
import { B as Button, c as cn } from "./index-WFXEz8te.js";
import { S as Separator } from "./separator-C80L14Hi.js";
import { b as appearance } from "./app-logo-icon-CFRSUVzj.js";
import { e as edit$1 } from "./index-s6lT6Qzb.js";
import { e as edit } from "./app-layout-DEDBaMvw.js";
import { Link } from "@inertiajs/react";
function HeadingSmall({ title, description }) {
  return /* @__PURE__ */ jsxs("header", { children: [
    /* @__PURE__ */ jsx("h3", { className: "mb-0.5 text-base font-medium", children: title }),
    description && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: description })
  ] });
}
function Heading({ title, description }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-8 space-y-0.5", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold tracking-tight", children: title }),
    description && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: description })
  ] });
}
const sidebarNavItems = [
  {
    title: "Profile",
    href: edit(),
    icon: null
  },
  {
    title: "Password",
    href: edit$1(),
    icon: null
  },
  {
    title: "Appearance",
    href: appearance(),
    icon: null
  }
];
function SettingsLayout({ children }) {
  if (typeof window === "undefined") {
    return null;
  }
  const currentPath = window.location.pathname;
  return /* @__PURE__ */ jsxs("div", { className: "px-4 py-6", children: [
    /* @__PURE__ */ jsx(Heading, { title: "Settings", description: "Manage your profile and account settings" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:space-x-12", children: [
      /* @__PURE__ */ jsx("aside", { className: "w-full max-w-xl lg:w-48", children: /* @__PURE__ */ jsx("nav", { className: "flex flex-col space-y-1 space-x-0", children: sidebarNavItems.map((item, index) => /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          variant: "ghost",
          asChild: true,
          className: cn("w-full justify-start", {
            "bg-muted": currentPath === (typeof item.href === "string" ? item.href : item.href.url)
          }),
          children: /* @__PURE__ */ jsxs(Link, { href: item.href, prefetch: true, children: [
            item.icon && /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4" }),
            item.title
          ] })
        },
        `${typeof item.href === "string" ? item.href : item.href.url}-${index}`
      )) }) }),
      /* @__PURE__ */ jsx(Separator, { className: "my-6 lg:hidden" }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 md:max-w-2xl", children: /* @__PURE__ */ jsx("section", { className: "max-w-xl space-y-12", children }) })
    ] })
  ] });
}
export {
  HeadingSmall as H,
  SettingsLayout as S
};
