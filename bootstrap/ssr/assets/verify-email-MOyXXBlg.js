import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { a as logout } from "./app-logo-icon-CFRSUVzj.js";
import { v as verification } from "./index-bvR9SBQI.js";
import { Head, Form } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { T as TextLink } from "./text-link-bXlB6zU1.js";
import { B as Button } from "./index-WFXEz8te.js";
import { A as AuthLayout } from "./auth-layout-BVw4C9R_.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function VerifyEmail({ status }) {
  return /* @__PURE__ */ jsxs(AuthLayout, { title: "Verify email", description: "Please verify your email address by clicking on the link we just emailed to you.", children: [
    /* @__PURE__ */ jsx(Head, { title: "Email verification" }),
    status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mb-4 text-center text-sm font-medium text-green-600", children: "A new verification link has been sent to the email address you provided during registration." }),
    /* @__PURE__ */ jsx(Form, { ...verification.send.form(), className: "space-y-6 text-center", children: ({ processing }) => /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Button, { disabled: processing, variant: "secondary", children: [
        processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        "Resend verification email"
      ] }),
      /* @__PURE__ */ jsx(TextLink, { href: logout(), className: "mx-auto block text-sm", children: "Log out" })
    ] }) })
  ] });
}
export {
  VerifyEmail as default
};
