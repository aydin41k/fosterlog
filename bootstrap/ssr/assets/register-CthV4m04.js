import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { l as login } from "./app-logo-icon-CFRSUVzj.js";
import { Head, Form } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { I as InputError } from "./input-error-C9Ky8TQy.js";
import { T as TextLink } from "./text-link-bXlB6zU1.js";
import { q as queryParams, B as Button } from "./index-WFXEz8te.js";
import { L as Label, I as Input } from "./label-BOW2KBE8.js";
import { A as AuthLayout } from "./auth-layout-BVw4C9R_.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
const store = (options) => ({
  url: store.url(options),
  method: "post"
});
store.definition = {
  methods: ["post"],
  url: "/register"
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
const register = {
  store: Object.assign(store, store)
};
function Register() {
  return /* @__PURE__ */ jsxs(AuthLayout, { title: "Create an account", description: "Enter your details below to create your account", children: [
    /* @__PURE__ */ jsx(Head, { title: "Register" }),
    /* @__PURE__ */ jsx(
      Form,
      {
        ...register.store.form(),
        resetOnSuccess: ["password", "password_confirmation"],
        disableWhileProcessing: true,
        className: "flex flex-col gap-6",
        children: ({ processing, errors }) => /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "name",
                  type: "text",
                  required: true,
                  autoFocus: true,
                  tabIndex: 1,
                  autoComplete: "name",
                  name: "name",
                  placeholder: "Full name"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email address" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "email",
                  type: "email",
                  required: true,
                  tabIndex: 2,
                  autoComplete: "email",
                  name: "email",
                  placeholder: "email@example.com"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "password",
                  type: "password",
                  required: true,
                  tabIndex: 3,
                  autoComplete: "new-password",
                  name: "password",
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
                  required: true,
                  tabIndex: 4,
                  autoComplete: "new-password",
                  name: "password_confirmation",
                  placeholder: "Confirm password"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation })
            ] }),
            /* @__PURE__ */ jsxs(Button, { type: "submit", className: "mt-2 w-full", tabIndex: 5, children: [
              processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
              "Create account"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center text-sm text-muted-foreground", children: [
            "Already have an account?",
            " ",
            /* @__PURE__ */ jsx(TextLink, { href: login(), tabIndex: 6, children: "Log in" })
          ] })
        ] })
      }
    )
  ] });
}
export {
  Register as default
};
