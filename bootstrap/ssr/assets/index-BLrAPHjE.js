import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { usePage, Head, Link } from "@inertiajs/react";
import { C as Card, a as CardContent } from "./card-Cu74DLiT.js";
import { B as Badge } from "./badge-B59T10Te.js";
import { P as PublicTopbar } from "./public-topbar-CWwHkCxk.js";
import "./index-WFXEz8te.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./app-logo-DZ4dA331.js";
import "./app-logo-icon-CFRSUVzj.js";
import "./index-BiQ7LnyC.js";
function PublicCatsGallery() {
  const { cats } = usePage().props;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Cats in Foster Care" }),
    /* @__PURE__ */ jsx(PublicTopbar, {}),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto min-h-screen w-full max-w-6xl px-4 py-4 md:px-6 md:py-8", children: [
      /* @__PURE__ */ jsxs("header", { className: "mb-4 flex items-baseline justify-between", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight md:text-2xl", children: "Cats in Foster Care" }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
          cats.length,
          " ",
          cats.length === 1 ? "cat" : "cats"
        ] })
      ] }),
      cats.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No cats to show right now." }) : /* @__PURE__ */ jsx(
        "ul",
        {
          className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4",
          "aria-label": "Cat gallery",
          children: cats.map((cat) => {
            const available = cat.status === "available";
            return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: `/adopt/cats/${cat.slug}`, className: "block focus:outline-none", children: /* @__PURE__ */ jsxs(
              Card,
              {
                className: "overflow-hidden transition-colors " + (available ? "border-primary/50" : ""),
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative aspect-square w-full overflow-hidden bg-muted", children: [
                    cat.primary_photo_url ? /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: cat.primary_photo_url,
                        alt: `${cat.name} photo`,
                        className: "size-full object-cover object-center",
                        loading: "lazy"
                      }
                    ) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center text-xs text-muted-foreground", children: "No photo" }),
                    available && /* @__PURE__ */ jsx("div", { className: "absolute right-2 top-2", children: /* @__PURE__ */ jsx(Badge, { className: "bg-primary/85 text-primary-foreground", variant: "default", children: "Available" }) })
                  ] }),
                  /* @__PURE__ */ jsxs(CardContent, { className: "p-2 md:p-3", children: [
                    /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-medium", children: cat.name }),
                    /* @__PURE__ */ jsxs("p", { className: "mt-0.5 text-xs text-muted-foreground", children: [
                      cat.age_years_months ?? "Age unknown",
                      cat.latest_weight_kg && ` • ${cat.latest_weight_kg} kg`
                    ] })
                  ] })
                ]
              }
            ) }) }, cat.id);
          })
        }
      )
    ] })
  ] });
}
export {
  PublicCatsGallery as default
};
