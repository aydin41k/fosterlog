import { jsxs, jsx } from "react/jsx-runtime";
import { B as Badge } from "./badge-B59T10Te.js";
import { B as Button } from "./index-WFXEz8te.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Cu74DLiT.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CfxhTrqJ.js";
import { A as AppLayout } from "./app-layout-DEDBaMvw.js";
import { usePage, Head, Link } from "@inertiajs/react";
import { Plus, Heart } from "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "react";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "./use-toast-Cbnq_qHJ.js";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-avatar";
import "./app-logo-icon-CFRSUVzj.js";
import "./index-BiQ7LnyC.js";
import "./app-logo-DZ4dA331.js";
const residentPetsRoutes = {
  index: () => ({ url: "/resident-pets" }),
  create: () => ({ url: "/resident-pets/create" }),
  show: (id) => ({ url: `/resident-pets/${id}` }),
  edit: (id) => ({ url: `/resident-pets/${id}/edit` })
};
const breadcrumbs = [
  {
    title: "Resident Pets",
    href: ""
  }
];
function ResidentPetsIndex() {
  const { residentPets } = usePage().props;
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsx(Head, { title: "My Resident Pets" }),
    /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "My Resident Pets" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Manage your household pets and their information." })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: residentPetsRoutes.create().url, children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Add Pet"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Heart, { className: "h-5 w-5" }),
          "Resident Pets (",
          residentPets.length,
          ")"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: residentPets.length > 0 ? /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: "Name" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Species" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Age" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Notes" }),
            /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: residentPets.map((pet) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: pet.name }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "capitalize", children: pet.species }) }),
            /* @__PURE__ */ jsx(TableCell, { children: pet.dob ? new Date(pet.dob).toLocaleDateString() : "Unknown" }),
            /* @__PURE__ */ jsx(TableCell, { children: pet.notes || "-" }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: residentPetsRoutes.show(pet.id).url, children: "View Details" }) }) })
          ] }, pet.id)) })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ jsx(Heart, { className: "h-12 w-12 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium mb-2", children: "No resident pets yet" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: "Add your household pets to keep track of their information." }),
          /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: residentPetsRoutes.create().url, children: [
            /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
            "Add Your First Pet"
          ] }) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  ResidentPetsIndex as default
};
