import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { A as AppLogoIcon } from "./app-logo-icon-CFRSUVzj.js";
function AppLogo() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground", children: /* @__PURE__ */ jsx(AppLogoIcon, { className: "fill-current text-white dark:text-black" }) }),
    /* @__PURE__ */ jsx("div", { className: "ml-1 grid flex-1 text-left text-sm", children: /* @__PURE__ */ jsx("span", { className: "mb-0.5 truncate leading-tight font-semibold", children: "FosterLog" }) })
  ] });
}
export {
  AppLogo as A
};
