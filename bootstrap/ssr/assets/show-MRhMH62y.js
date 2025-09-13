import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { usePage, Head, Link } from "@inertiajs/react";
import { B as Badge } from "./badge-B59T10Te.js";
import { C as Card, a as CardContent } from "./card-Cu74DLiT.js";
import { S as Separator } from "./separator-C80L14Hi.js";
import { P as PublicTopbar } from "./public-topbar-CWwHkCxk.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./index-WFXEz8te.js";
import "react";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-separator";
import "./app-logo-DZ4dA331.js";
import "./app-logo-icon-CFRSUVzj.js";
import "./index-BiQ7LnyC.js";
function PublicCatDetails() {
  var _a, _b, _c, _d, _e;
  const { animal, weights, actions } = usePage().props;
  const available = animal.status === "available";
  const primaryUrl = ((_b = (_a = animal.photos) == null ? void 0 : _a.find((p) => p.is_primary)) == null ? void 0 : _b.url) || animal.primary_photo_url || ((_d = (_c = animal.photos) == null ? void 0 : _c[0]) == null ? void 0 : _d.url);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: `${animal.name} — Foster Cat` }),
    /* @__PURE__ */ jsx(PublicTopbar, {}),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto min-h-screen w-full max-w-5xl px-4 py-4 md:px-6 md:py-6", children: [
      /* @__PURE__ */ jsx("nav", { className: "mb-3 text-sm", children: /* @__PURE__ */ jsx(Link, { href: "/adopt/cats", className: "text-muted-foreground hover:underline", children: "← Back to cats" }) }),
      /* @__PURE__ */ jsxs("header", { className: "mb-4 flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight md:text-2xl", children: animal.name }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
            animal.age_years_months ?? "Age unknown",
            animal.sex ? ` • ${capitalize(animal.sex)}` : ""
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { children: available && /* @__PURE__ */ jsx(Badge, { className: "h-6", variant: "default", children: "Available for Adoption" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs(Card, { className: available ? "border-primary/50" : void 0, children: [
          /* @__PURE__ */ jsx("div", { className: "relative aspect-square w-full overflow-hidden rounded-t-xl bg-muted", children: primaryUrl ? /* @__PURE__ */ jsx("img", { src: primaryUrl, alt: `${animal.name} photo`, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center text-sm text-muted-foreground", children: "No photo" }) }),
          animal.photos && animal.photos.length > 1 && /* @__PURE__ */ jsx(CardContent, { className: "p-2", children: /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-6 gap-2", children: animal.photos.map((p) => /* @__PURE__ */ jsx("li", { className: "overflow-hidden rounded-md border", children: /* @__PURE__ */ jsx("img", { src: p.url, alt: p.caption ?? "", className: "h-14 w-full object-cover" }) }, p.id)) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
            /* @__PURE__ */ jsxs("ul", { className: "grid grid-cols-2 gap-3 text-sm", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Status" }),
                /* @__PURE__ */ jsx("div", { className: "mt-0.5", children: animal.status_label })
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Age" }),
                /* @__PURE__ */ jsx("div", { className: "mt-0.5", children: animal.age_years_months ?? "Unknown" })
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Weight" }),
                /* @__PURE__ */ jsx("div", { className: "mt-0.5", children: formatWeight(animal.latest_weight_kg) })
              ] }),
              animal.sex && /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Sex" }),
                /* @__PURE__ */ jsx("div", { className: "mt-0.5", children: capitalize(animal.sex) })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Separator, { className: "my-3" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "About" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed", children: ((_e = animal.description) == null ? void 0 : _e.trim()) || "This foster cat is settling in. More details soon." })
          ] }) }),
          /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-2 text-sm font-medium", children: "Weight History" }),
            weights.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No weights recorded yet." }) : /* @__PURE__ */ jsx("ul", { className: "max-h-56 space-y-2 overflow-auto pr-1", children: weights.map((w) => /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: new Date(w.measured_at).toLocaleDateString() }),
              /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
                formatWeight(w.weight_kg),
                " kg"
              ] })
            ] }, w.id)) })
          ] }) }),
          /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-2 text-sm font-medium", children: "Care History" }),
            actions.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No care actions recorded yet." }) : /* @__PURE__ */ jsx("ul", { className: "max-h-56 space-y-2 overflow-auto pr-1", children: actions.filter((a) => a.type !== "food").map((a) => /* @__PURE__ */ jsxs("li", { className: "text-sm", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "capitalize text-muted-foreground", children: a.type }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: new Date(a.performed_at).toLocaleDateString() })
              ] }),
              renderActionSummary(a)
            ] }, a.id)) })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
function formatWeight(w) {
  if (typeof w === "number") return `${w.toFixed(1)} kg`;
  if (typeof w === "string") return w;
  return "Unknown";
}
function renderActionSummary(a) {
  const d = a.details || {};
  switch (a.type) {
    case "food": {
      const amount = typeof d.amount_g === "number" ? `${d.amount_g} g` : "Food";
      return /* @__PURE__ */ jsx("p", { className: "text-sm", children: amount });
    }
    case "medication": {
      const name = d.name || "Medication";
      const dose = d.dose ? ` — ${d.dose}` : "";
      return /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
        name,
        dose
      ] });
    }
    case "exercise":
    case "medical":
    case "veterinary":
    case "other":
    default:
      return /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Recorded" });
  }
}
export {
  PublicCatDetails as default
};
