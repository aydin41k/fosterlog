import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { B as Badge } from "./badge-B59T10Te.js";
import { B as Button } from "./index-WFXEz8te.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-Cu74DLiT.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CfxhTrqJ.js";
import { A as AppLayout } from "./app-layout-DEDBaMvw.js";
import { a as animals } from "./index-BiQ7LnyC.js";
import { usePage, Head, Link } from "@inertiajs/react";
import { useState, useMemo } from "react";
import { Plus, ChevronRight, Edit } from "lucide-react";
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
    title: "Foster Pets",
    href: animals.index().url
  }
];
function AnimalsIndex() {
  const { animals: animalsList } = usePage().props;
  const [showAll, setShowAll] = useState(false);
  const displayedAnimals = useMemo(() => {
    if (showAll) return animalsList;
    return animalsList.filter(
      (a) => a.status === "in_foster" || a.status === "available"
    );
  }, [animalsList, showAll]);
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsx(Head, { title: "My Pets" }),
    /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 pb-24 md:pb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between gap-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setShowAll((s) => !s),
            className: "hidden md:inline-flex",
            children: showAll ? "Show Foster & Available" : "Show All Pets"
          }
        ),
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "hidden md:inline-flex", children: /* @__PURE__ */ jsxs(Link, { href: animals.create().url, children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Add a Pet"
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "md:hidden", children: displayedAnimals.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "px-1 text-sm font-medium text-muted-foreground", children: showAll ? `All Pets (${animalsList.length})` : `Foster & Available (${displayedAnimals.length})` }),
        /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setShowAll((s) => !s),
            className: "w-full",
            children: showAll ? "Show Foster & Available" : "Show All Pets"
          }
        ) }),
        /* @__PURE__ */ jsx("ul", { className: "mt-2 space-y-3", children: displayedAnimals.map((animal) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          Link,
          {
            href: `/animals/${animal.id}`,
            className: "block active:opacity-80",
            "aria-label": `View details for ${animal.name}`,
            children: /* @__PURE__ */ jsx(Card, { className: "shadow-sm", children: /* @__PURE__ */ jsx(CardContent, { className: "p-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              animal.photos.length ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: animal.photos.filter((photo) => photo.is_primary)[0].url,
                  alt: `${animal.name} photo`,
                  className: "h-12 w-12 flex-none rounded-md object-cover",
                  loading: "lazy"
                }
              ) : /* @__PURE__ */ jsx("div", { className: "h-12 w-12 flex-none rounded-md bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] text-muted-foreground", children: "No photo" }) }),
              /* @__PURE__ */ jsx("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "min-w-0 truncate font-medium", children: animal.name }),
                animal.status === "adopted" && /* @__PURE__ */ jsx(Badge, { variant: "destructive", children: "Adopted" }),
                animal.status === "available" && /* @__PURE__ */ jsx(Badge, { variant: "default", children: "Available" }),
                animal.status === "in_foster" && /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "In Foster" })
              ] }) }),
              /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-5 w-5 text-muted-foreground" })
            ] }) }) })
          }
        ) }, animal.id)) })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: "You haven't added any pets yet." }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: animals.create().url, children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Add Your First Pet"
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsxs(Card, { className: "md:shadow-sm", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: showAll ? `Pets (${animalsList.length})` : `Pets (${displayedAnimals.length} of ${animalsList.length})` }) }),
        /* @__PURE__ */ jsx(CardContent, { children: displayedAnimals.length > 0 ? /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: "Photo" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Name" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Species" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Age" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
            /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: displayedAnimals.map((animal) => /* @__PURE__ */ jsxs(TableRow, { className: animal.status === "adopted" ? "opacity-60" : void 0, children: [
            /* @__PURE__ */ jsx(TableCell, { children: animal.primary_photo_url ? /* @__PURE__ */ jsx(
              "img",
              {
                src: animal.primary_photo_url,
                alt: `${animal.name} photo`,
                className: "h-12 w-12 rounded-lg object-cover"
              }
            ) : /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-lg bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "No photo" }) }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: animal.name }),
            /* @__PURE__ */ jsx(TableCell, { className: "capitalize", children: animal.species || "Unknown" }),
            /* @__PURE__ */ jsx(TableCell, { children: animal.age_years_months || "Unknown" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
              Badge,
              {
                variant: animal.status === "available" ? "default" : animal.status === "in_foster" ? "secondary" : animal.status === "adopted" ? "destructive" : "outline",
                children: animal.status_label
              }
            ) }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: `/animals/${animal.id}`, children: [
              /* @__PURE__ */ jsx(Edit, { className: "mr-2 h-4 w-4" }),
              "View Details"
            ] }) }) })
          ] }, animal.id)) })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: "You haven't added any pets yet." }),
          /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: animals.create().url, children: [
            /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
            "Add Your First Pet"
          ] }) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx(
        Button,
        {
          asChild: true,
          className: "fixed bottom-16 right-4 h-12 w-12 rounded-full shadow-lg",
          "aria-label": "Add a pet",
          children: /* @__PURE__ */ jsx(Link, { href: animals.create().url, children: /* @__PURE__ */ jsx(Plus, { className: "h-5 w-5" }) })
        }
      ) })
    ] })
  ] });
}
export {
  AnimalsIndex as default
};
