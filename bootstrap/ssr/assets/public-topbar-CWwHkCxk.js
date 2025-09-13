import { jsx, jsxs } from "react/jsx-runtime";
import { A as AppLogo } from "./app-logo-DZ4dA331.js";
import { B as Button } from "./index-WFXEz8te.js";
import { a as animals } from "./index-BiQ7LnyC.js";
import { l as login } from "./app-logo-icon-CFRSUVzj.js";
import { usePage, Link } from "@inertiajs/react";
function PublicTopbar() {
  const { auth } = usePage().props;
  const isLoggedIn = !!(auth == null ? void 0 : auth.user);
  return /* @__PURE__ */ jsx("header", { className: "mx-auto w-full max-w-6xl px-4 py-4 md:px-6 md:py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsx(Link, { href: "/", className: "flex items-center", children: /* @__PURE__ */ jsx(AppLogo, {}) }),
    /* @__PURE__ */ jsx("nav", { className: "flex items-center gap-2", children: isLoggedIn ? /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: animals.index().url, children: "My Account" }) }) : /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: login(), children: "Log in" }) }) })
  ] }) });
}
export {
  PublicTopbar as P
};
