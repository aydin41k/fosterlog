import { jsxs, jsx } from "react/jsx-runtime";
import { B as Button } from "./index-WFXEz8te.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Cu74DLiT.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CfxhTrqJ.js";
import { A as AppLayout } from "./app-layout-DEDBaMvw.js";
import { a as animals } from "./index-BiQ7LnyC.js";
import { usePage, Head, Link } from "@inertiajs/react";
import { ArrowLeft, Scale, Calendar } from "lucide-react";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "./use-toast-Cbnq_qHJ.js";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-avatar";
import "./app-logo-icon-CFRSUVzj.js";
import "./app-logo-DZ4dA331.js";
const breadcrumbs = [
  {
    title: "Pets",
    href: animals.index().url
  },
  {
    title: "Animal Details",
    href: ""
  },
  {
    title: "Weights",
    href: ""
  }
];
function AnimalsWeights() {
  const { animal, weights } = usePage().props;
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsx(Head, { title: `${animal.name} - Weights` }),
    /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: animals.show(animal.id).url, children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
          "Back to Pet"
        ] }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold", children: [
            animal.name,
            " - Weights"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Track weight measurements over time." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Scale, { className: "h-5 w-5" }),
          "Weight History (",
          weights.length,
          " records)"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: weights.length > 0 ? /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: "Date" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Weight" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Notes" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Recorded" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: weights.map((weight) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
              new Date(weight.measured_at).toLocaleDateString()
            ] }) }),
            /* @__PURE__ */ jsxs(TableCell, { className: "font-medium", children: [
              weight.weight_kg,
              " kg"
            ] }),
            /* @__PURE__ */ jsx(TableCell, { children: weight.notes || "-" }),
            /* @__PURE__ */ jsx(TableCell, { children: new Date(weight.created_at).toLocaleDateString() })
          ] }, weight.id)) })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ jsx(Scale, { className: "h-12 w-12 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium mb-2", children: "No weight records yet" }),
          /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mb-4", children: [
            "Start tracking ",
            animal.name,
            "'s weight by adding the first measurement."
          ] }),
          /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: animals.show(animal.id).url, children: "Add First Weight Record" }) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  AnimalsWeights as default
};
