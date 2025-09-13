import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { I as InputError } from "./input-error-C9Ky8TQy.js";
import { A as AppLayout } from "./app-layout-DEDBaMvw.js";
import { S as SettingsLayout, H as HeadingSmall } from "./layout-CGoJcVST.js";
import { Transition } from "@headlessui/react";
import { Head, Form } from "@inertiajs/react";
import { useRef } from "react";
import { e as edit, p as password } from "./index-s6lT6Qzb.js";
import { B as Button } from "./index-WFXEz8te.js";
import { L as Label, I as Input } from "./label-BOW2KBE8.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "lucide-react";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "./use-toast-Cbnq_qHJ.js";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-avatar";
import "./app-logo-icon-CFRSUVzj.js";
import "./index-BiQ7LnyC.js";
import "./app-logo-DZ4dA331.js";
import "./separator-C80L14Hi.js";
import "@radix-ui/react-separator";
import "./index-BhC_80He.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
const breadcrumbs = [
  {
    title: "Password settings",
    href: edit().url
  }
];
function Password() {
  const passwordInput = useRef(null);
  const currentPasswordInput = useRef(null);
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsx(Head, { title: "Password settings" }),
    /* @__PURE__ */ jsx(SettingsLayout, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(HeadingSmall, { title: "Update password", description: "Ensure your account is using a long, random password to stay secure" }),
      /* @__PURE__ */ jsx(
        Form,
        {
          ...password.update.form(),
          options: {
            preserveScroll: true
          },
          resetOnError: ["password", "password_confirmation", "current_password"],
          resetOnSuccess: true,
          onError: (errors) => {
            var _a, _b;
            if (errors.password) {
              (_a = passwordInput.current) == null ? void 0 : _a.focus();
            }
            if (errors.current_password) {
              (_b = currentPasswordInput.current) == null ? void 0 : _b.focus();
            }
          },
          className: "space-y-6",
          children: ({ errors, processing, recentlySuccessful }) => /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "current_password", children: "Current password" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "current_password",
                  ref: currentPasswordInput,
                  name: "current_password",
                  type: "password",
                  className: "mt-1 block w-full",
                  autoComplete: "current-password",
                  placeholder: "Current password"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.current_password })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "New password" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "password",
                  ref: passwordInput,
                  name: "password",
                  type: "password",
                  className: "mt-1 block w-full",
                  autoComplete: "new-password",
                  placeholder: "New password"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.password })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "password_confirmation", children: "Confirm password" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "password_confirmation",
                  name: "password_confirmation",
                  type: "password",
                  className: "mt-1 block w-full",
                  autoComplete: "new-password",
                  placeholder: "Confirm password"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx(Button, { disabled: processing, children: "Save password" }),
              /* @__PURE__ */ jsx(
                Transition,
                {
                  show: recentlySuccessful,
                  enter: "transition ease-in-out",
                  enterFrom: "opacity-0",
                  leave: "transition ease-in-out",
                  leaveTo: "opacity-0",
                  children: /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-600", children: "Saved" })
                }
              )
            ] })
          ] })
        }
      )
    ] }) })
  ] });
}
export {
  Password as default
};
