import { jsxs, jsx } from "react/jsx-runtime";
import { B as Badge } from "./badge-B59T10Te.js";
import { B as Button } from "./index-WFXEz8te.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Cu74DLiT.js";
import { A as AppLayout } from "./app-layout-DEDBaMvw.js";
import { usePage, Head, Link } from "@inertiajs/react";
import { ArrowLeft, Heart, Calendar, User } from "lucide-react";
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
    href: residentPetsRoutes.index().url
  },
  {
    title: "Pet Details",
    href: ""
  }
];
function ResidentPetsShow() {
  const { residentPet } = usePage().props;
  const calculateAge = (dob) => {
    if (!dob) return "Unknown";
    const birthDate = new Date(dob);
    const today = /* @__PURE__ */ new Date();
    const ageInMs = today.getTime() - birthDate.getTime();
    const ageInDays = Math.floor(ageInMs / (1e3 * 60 * 60 * 24));
    if (ageInDays < 30) {
      return `${ageInDays} days old`;
    }
    const ageInMonths = Math.floor(ageInDays / 30.44);
    if (ageInMonths < 12) {
      return `${ageInMonths} months old`;
    }
    const ageInYears = Math.floor(ageInMonths / 12);
    const remainingMonths = ageInMonths % 12;
    if (remainingMonths === 0) {
      return `${ageInYears} years old`;
    }
    return `${ageInYears} years, ${remainingMonths} months old`;
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsx(Head, { title: `${residentPet.name} - Details` }),
    /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: residentPetsRoutes.index().url, children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
          "Back to Pets"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: residentPetsRoutes.edit(residentPet.id).url, children: "Edit" }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "h-16 w-16 rounded-lg bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsx(Heart, { className: "h-8 w-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: residentPet.name }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 mt-1", children: /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "capitalize", children: residentPet.species }) }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1", children: calculateAge(residentPet.dob) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Date of Birth" }),
            /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: residentPet.dob ? new Date(residentPet.dob).toLocaleDateString() : "Unknown" }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Species" }),
            /* @__PURE__ */ jsx(Heart, { className: "h-4 w-4 text-muted-foreground" })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold capitalize", children: residentPet.species }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Owner" }),
            /* @__PURE__ */ jsx(User, { className: "h-4 w-4 text-muted-foreground" })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold", children: residentPet.user.name }) })
        ] })
      ] }),
      residentPet.notes && /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Notes" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: residentPet.notes }) })
      ] })
    ] })
  ] });
}
export {
  ResidentPetsShow as default
};
