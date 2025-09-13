import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Form } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { I as InputError } from "./input-error-C9Ky8TQy.js";
import { B as Button } from "./index-WFXEz8te.js";
import { L as Label, I as Input } from "./label-BOW2KBE8.js";
import { A as AuthLayout } from "./auth-layout-BVw4C9R_.js";
import { p as password } from "./index-s6lT6Qzb.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "./app-logo-icon-CFRSUVzj.js";
import "./index-BhC_80He.js";
function ResetPassword({ token, email }) {
  return /* @__PURE__ */ jsxs(AuthLayout, { title: "Reset password", description: "Please enter your new password below", children: [
    /* @__PURE__ */ jsx(Head, { title: "Reset password" }),
    /* @__PURE__ */ jsx(
      Form,
      {
        ...password.store.form(),
        transform: (data) => ({ ...data, token, email }),
        resetOnSuccess: ["password", "password_confirmation"],
        children: ({ processing, errors }) => /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
            /* @__PURE__ */ jsx(Input, { id: "email", type: "email", name: "email", autoComplete: "email", value: email, className: "mt-1 block w-full", readOnly: true }),
            /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "password",
                type: "password",
                name: "password",
                autoComplete: "new-password",
                className: "mt-1 block w-full",
                autoFocus: true,
                placeholder: "Password"
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
                type: "password",
                name: "password_confirmation",
                autoComplete: "new-password",
                className: "mt-1 block w-full",
                placeholder: "Confirm password"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs(Button, { type: "submit", className: "mt-4 w-full", disabled: processing, children: [
            processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            "Reset password"
          ] })
        ] })
      }
    )
  ] });
}
export {
  ResetPassword as default
};
