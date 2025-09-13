import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { I as InputError } from "./input-error-C9Ky8TQy.js";
import { T as TextLink } from "./text-link-bXlB6zU1.js";
import { c as cn, q as queryParams, B as Button } from "./index-WFXEz8te.js";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, Mail, Lock, EyeOff, Eye, LoaderCircle } from "lucide-react";
import { L as Label, I as Input } from "./label-BOW2KBE8.js";
import { A as AuthLayout } from "./auth-layout-BVw4C9R_.js";
import { r as register } from "./app-logo-icon-CFRSUVzj.js";
import { r as request } from "./index-s6lT6Qzb.js";
import { Head, Form } from "@inertiajs/react";
import { useState } from "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "./index-BhC_80He.js";
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CheckboxPrimitive.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        CheckboxPrimitive.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5" })
        }
      )
    }
  );
}
const store = (options) => ({
  url: store.url(options),
  method: "post"
});
store.definition = {
  methods: ["post"],
  url: "/login"
};
store.url = (options) => {
  return store.definition.url + queryParams(options);
};
store.post = (options) => ({
  url: store.url(options),
  method: "post"
});
const storeForm = (options) => ({
  action: store.url(options),
  method: "post"
});
storeForm.post = (options) => ({
  action: store.url(options),
  method: "post"
});
store.form = storeForm;
const login = {
  store: Object.assign(store, store)
};
function Login({ status, canResetPassword }) {
  const [showPassword, setShowPassword] = useState(false);
  return /* @__PURE__ */ jsxs(AuthLayout, { title: "Welcome back", description: "Sign in to continue", children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    /* @__PURE__ */ jsxs("div", { className: "w-full space-y-8", children: [
      status && /* @__PURE__ */ jsx("div", { className: "rounded-xl bg-green-50 border border-green-200 p-4 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-green-800", children: status }) }),
      /* @__PURE__ */ jsx(Form, { ...login.store.form(), resetOnSuccess: ["password"], className: "space-y-6", children: ({ processing, errors }) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", className: "text-base font-semibold text-foreground", children: "Email address" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5 text-muted-foreground" }) }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "email",
                type: "email",
                name: "email",
                required: true,
                autoFocus: true,
                tabIndex: 1,
                autoComplete: "email",
                placeholder: "your@email.com",
                className: "pl-12 h-14 text-base border-2 rounded-xl focus:border-primary/50 transition-colors",
                inputMode: "email"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(InputError, { message: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "password", className: "text-base font-semibold text-foreground", children: "Password" }),
            canResetPassword && /* @__PURE__ */ jsx(
              TextLink,
              {
                href: request(),
                className: "text-sm font-medium text-primary hover:text-primary/80 transition-colors",
                tabIndex: 5,
                children: "Forgot?"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(Lock, { className: "h-5 w-5 text-muted-foreground" }) }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "password",
                type: showPassword ? "text" : "password",
                name: "password",
                required: true,
                tabIndex: 2,
                autoComplete: "current-password",
                placeholder: "Enter your password",
                className: "pl-12 pr-12 h-14 text-base border-2 rounded-xl focus:border-primary/50 transition-colors"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "absolute inset-y-0 right-0 pr-4 flex items-center touch-manipulation",
                onClick: () => setShowPassword(!showPassword),
                tabIndex: -1,
                "aria-label": showPassword ? "Hide password" : "Show password",
                children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" }) : /* @__PURE__ */ jsx(Eye, { className: "h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(InputError, { message: errors.password })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 pt-1", children: [
          /* @__PURE__ */ jsx(
            Checkbox,
            {
              id: "remember",
              name: "remember",
              tabIndex: 3,
              className: "h-6 w-6 border-2"
            }
          ),
          /* @__PURE__ */ jsx(
            Label,
            {
              htmlFor: "remember",
              className: "text-base text-muted-foreground cursor-pointer select-none",
              children: "Remember me"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            className: "w-full h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]",
            tabIndex: 4,
            disabled: processing,
            children: processing ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(LoaderCircle, { className: "h-5 w-5 animate-spin mr-3" }),
              "Signing in..."
            ] }) : "Sign in"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "text-center pt-2", children: /* @__PURE__ */ jsxs("p", { className: "text-base text-muted-foreground", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsx(
          TextLink,
          {
            href: register(),
            tabIndex: 5,
            className: "font-semibold text-primary hover:text-primary/80 transition-colors",
            children: "Sign up"
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  Login as default
};
