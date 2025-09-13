import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as AppLogo } from "./app-logo-DZ4dA331.js";
import { B as Button } from "./index-WFXEz8te.js";
import { useId } from "react";
import { a as animals } from "./index-BiQ7LnyC.js";
import { l as login, r as register } from "./app-logo-icon-CFRSUVzj.js";
import { usePage, Head, Link } from "@inertiajs/react";
import { PawPrint, Camera, Scale, Pill, ShieldCheck, Activity } from "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function PlaceholderPattern({ className }) {
  const patternId = useId();
  return /* @__PURE__ */ jsxs("svg", { className, fill: "none", children: [
    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("pattern", { id: patternId, x: "0", y: "0", width: "10", height: "10", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsx("path", { d: "M-3 13 15-5M-5 5l18-18M-1 21 17 3" }) }) }),
    /* @__PURE__ */ jsx("rect", { stroke: "none", fill: `url(#${patternId})`, width: "100%", height: "100%" })
  ] });
}
function Welcome() {
  const { auth, quote } = usePage().props;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "FosterLog", children: /* @__PURE__ */ jsx(
      "meta",
      {
        name: "description",
        content: "FosterLog helps foster carers organize everything for each pet — photos, weights, food, medications, and more."
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen bg-background text-foreground", children: [
      /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0 -z-10 overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-muted/40 to-background" }),
        /* @__PURE__ */ jsx(PlaceholderPattern, { className: "absolute -top-24 left-1/2 h-[900px] w-[900px] -translate-x-1/2 stroke-muted/40 [mask-image:radial-gradient(closest-side,white,transparent)]" })
      ] }),
      /* @__PURE__ */ jsxs("header", { className: "mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5", children: [
        /* @__PURE__ */ jsx(Link, { href: "/", className: "flex items-center", children: /* @__PURE__ */ jsx(AppLogo, {}) }),
        /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsx(Link, { href: "/adopt/cats", children: "Browse Cats" }) }) }),
          (auth == null ? void 0 : auth.user) ? /* @__PURE__ */ jsx(Button, { asChild: true, variant: "secondary", children: /* @__PURE__ */ jsx(Link, { href: animals.index().url, children: "My Account" }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", children: /* @__PURE__ */ jsx(Link, { href: login(), children: "Log in" }) }),
            /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: register(), children: "Get Started" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("main", { className: "mx-auto w-full max-w-6xl px-6 pb-16 pt-8 md:pb-24 md:pt-14", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid items-center gap-10 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("section", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 justify-center md:hidden", children: (auth == null ? void 0 : auth.user) ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", variant: "secondary", children: /* @__PURE__ */ jsx(Link, { href: "/adopt/cats", children: "Browse Cats" }) }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", children: /* @__PURE__ */ jsx(Link, { href: register(), children: "Create an account" }) }),
              /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", variant: "outline", children: /* @__PURE__ */ jsx(Link, { href: login(), children: "Log in" }) })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h1", { className: "text-balance text-4xl font-semibold tracking-tight md:text-5xl", children: "Manage every foster pet with care" }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-prose text-lg text-muted-foreground", children: "FosterLog keeps photos, weights, feeding, and medications beautifully organized — so you can focus on giving great care." })
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "mt-6 grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-0.5 rounded-md bg-primary/10 p-2 text-primary", children: /* @__PURE__ */ jsx(PawPrint, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-medium leading-none", children: "Foster-ready" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Built around real foster workflows." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-0.5 rounded-md bg-primary/10 p-2 text-primary", children: /* @__PURE__ */ jsx(Camera, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-medium leading-none", children: "Photo management" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Upload, set primary, and share updates." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-0.5 rounded-md bg-primary/10 p-2 text-primary", children: /* @__PURE__ */ jsx(Scale, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-medium leading-none", children: "Weight tracking" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Visual trends and quick logging." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-0.5 rounded-md bg-primary/10 p-2 text-primary", children: /* @__PURE__ */ jsx(Pill, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-medium leading-none", children: "Care actions" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Track food and medications reliably." })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "relative order-first overflow-hidden rounded-xl border bg-card shadow-sm md:order-none", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "/fosterlog_logo.jpg",
                alt: "FosterLog screenshot",
                className: "h-full w-full object-cover opacity-95",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mt-14 grid gap-6 rounded-xl border bg-card p-6 shadow-sm md:grid-cols-[1fr_auto_1fr] md:items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4" }),
            "Privacy-first. Your foster data stays with you."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden h-8 w-px bg-border md:block" }),
          /* @__PURE__ */ jsxs("blockquote", { className: "text-balance text-sm text-muted-foreground md:text-center", children: [
            "“",
            (quote == null ? void 0 : quote.message) ?? "The right tool makes caring easier.",
            "” — ",
            (quote == null ? void 0 : quote.author) ?? "FosterLog"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mt-12 grid gap-6 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsx(
            FeatureCard,
            {
              icon: /* @__PURE__ */ jsx(Activity, { className: "h-5 w-5" }),
              title: "Everything in one place",
              description: "Animals, photos, weights, and actions come together in a clean, unified UI."
            }
          ),
          /* @__PURE__ */ jsx(
            FeatureCard,
            {
              icon: /* @__PURE__ */ jsx(ShieldCheck, { className: "h-5 w-5" }),
              title: "Policy-aware access",
              description: "Only you can manage your foster pets. Secure by default with web auth."
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("footer", { className: "mx-auto w-full max-w-6xl px-6 py-10 text-center text-xs text-muted-foreground", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " FosterLog. Made for foster carers.",
        " ",
        /* @__PURE__ */ jsx(Link, { href: login(), className: "underline-offset-2 hover:underline", children: "Log in" })
      ] })
    ] })
  ] });
}
function FeatureCard({ icon, title, description }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-3 rounded-lg border bg-card p-4 shadow-sm", children: [
    /* @__PURE__ */ jsx("div", { className: "mt-0.5 rounded-md bg-primary/10 p-2 text-primary", children: icon }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "font-medium leading-none", children: title }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: description })
    ] })
  ] });
}
export {
  Welcome as default
};
