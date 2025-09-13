import { jsxs, jsx } from "react/jsx-runtime";
import { I as InputError } from "./input-error-C9Ky8TQy.js";
import { B as Button } from "./index-WFXEz8te.js";
import { L as Label, I as Input } from "./label-BOW2KBE8.js";
import { A as AuthLayout } from "./auth-layout-BVw4C9R_.js";
import { Head, Form } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { c as confirm } from "./index-BhC_80He.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "./app-logo-icon-CFRSUVzj.js";
function ConfirmPassword() {
  return /* @__PURE__ */ jsxs(
    AuthLayout,
    {
      title: "Confirm your password",
      description: "This is a secure area of the application. Please confirm your password before continuing.",
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Confirm password" }),
        /* @__PURE__ */ jsx(Form, { ...confirm.store.form(), resetOnSuccess: ["password"], children: ({ processing, errors }) => /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
            /* @__PURE__ */ jsx(Input, { id: "password", type: "password", name: "password", placeholder: "Password", autoComplete: "current-password", autoFocus: true }),
            /* @__PURE__ */ jsx(InputError, { message: errors.password })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs(Button, { className: "w-full", disabled: processing, children: [
            processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            "Confirm password"
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  ConfirmPassword as default
};
