var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, jsxs } from "react/jsx-runtime";
import { B as Badge } from "./badge-B59T10Te.js";
import { c as cn, B as Button } from "./index-WFXEz8te.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Cu74DLiT.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogTitle, d as DialogDescription, e as DialogFooter, f as DialogClose } from "./dialog-DRfj1Fxx.js";
import * as React from "react";
import { Component, useState } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { A as AppLayout } from "./app-layout-DEDBaMvw.js";
import { a as animals } from "./index-BiQ7LnyC.js";
import { usePage, Head, Link, Form } from "@inertiajs/react";
import { ArrowLeft, Edit, Trash2, Heart, Image, Scale, Activity } from "lucide-react";
import ActionsTab from "./actions-tab-simple-Bea7VO5h.js";
import PhotosTab from "./photos-tab-myY1zto2.js";
import WeightsTab from "./weights-tab-DcgYE-Zz.js";
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
import "./label-BOW2KBE8.js";
import "@radix-ui/react-label";
import "./select-C-bVdQlQ.js";
import "@radix-ui/react-select";
import "./textarea-BQYaG86Z.js";
import "./csrf-fSQysBlS.js";
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
class ErrorBoundary extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "state", { hasError: false });
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("AnimalsShow error boundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? /* @__PURE__ */ jsx("div", { className: "p-4 text-sm text-destructive", children: "Something went wrong rendering this section." });
    }
    return this.props.children;
  }
}
const breadcrumbs = [
  {
    title: "Pets",
    href: animals.index().url
  },
  {
    title: "Animal Details",
    href: ""
  }
];
function AnimalsShow() {
  const { animal } = usePage().props;
  const [activeTab, setActiveTab] = useState("photos");
  const editUrl = (animal == null ? void 0 : animal.id) ? animals.edit.url(animal.id) : animals.index().url;
  const pageTitle = (animal == null ? void 0 : animal.name) ? `${animal.name} - Details` : "Animal Details";
  return /* @__PURE__ */ jsx(AppLayout, { breadcrumbs, children: /* @__PURE__ */ jsxs(ErrorBoundary, { children: [
    /* @__PURE__ */ jsx(Head, { title: pageTitle }),
    /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-1 flex-col gap-4 overflow-x-hidden rounded-none p-0 md:rounded-xl md:p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center justify-between", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: animals.index().url, children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
          "Back to Pets"
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: editUrl, children: [
            /* @__PURE__ */ jsx(Edit, { className: "mr-2 h-4 w-4" }),
            "Edit"
          ] }) }),
          /* @__PURE__ */ jsxs(Dialog, { children: [
            /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "destructive", size: "sm", children: [
              /* @__PURE__ */ jsx(Trash2, { className: "mr-2 h-4 w-4" }),
              "Delete"
            ] }) }),
            /* @__PURE__ */ jsxs(DialogContent, { children: [
              /* @__PURE__ */ jsx(DialogTitle, { children: "Delete Animal" }),
              /* @__PURE__ */ jsxs(DialogDescription, { children: [
                "Are you sure you want to delete ",
                animal.name,
                "? This action cannot be undone and will permanently remove all associated data including photos, weights, and actions."
              ] }),
              /* @__PURE__ */ jsxs(DialogFooter, { className: "gap-2", children: [
                /* @__PURE__ */ jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Cancel" }) }),
                (animal == null ? void 0 : animal.id) && /* @__PURE__ */ jsx(Form, { ...animals.destroy.form(animal.id), className: "inline", children: () => /* @__PURE__ */ jsx(Button, { variant: "destructive", type: "submit", children: "Delete Animal" }) })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:hidden relative", children: [
        animal.primary_photo_url ? /* @__PURE__ */ jsx(
          "img",
          {
            src: animal.primary_photo_url,
            alt: `${animal.name} photo`,
            className: "h-56 w-full object-cover"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "h-56 w-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsx(Heart, { className: "h-10 w-10 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-x-0 top-0 flex items-center justify-between p-3", children: [
          /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "icon", asChild: true, className: "rounded-full bg-background/80 backdrop-blur", children: /* @__PURE__ */ jsx(Link, { href: animals.index().url, "aria-label": "Back", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-5 w-5" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "icon", asChild: true, className: "rounded-full bg-background/80 backdrop-blur", children: /* @__PURE__ */ jsx(Link, { href: editUrl, "aria-label": "Edit", children: /* @__PURE__ */ jsx(Edit, { className: "h-5 w-5" }) }) }),
            /* @__PURE__ */ jsxs(Dialog, { children: [
              /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "icon", className: "rounded-full bg-background/80 backdrop-blur", "aria-label": "More", children: /* @__PURE__ */ jsx(Trash2, { className: "h-5 w-5" }) }) }),
              /* @__PURE__ */ jsxs(DialogContent, { children: [
                /* @__PURE__ */ jsx(DialogTitle, { children: "Delete Animal" }),
                /* @__PURE__ */ jsxs(DialogDescription, { children: [
                  "Are you sure you want to delete ",
                  animal.name,
                  "? This action cannot be undone and will permanently remove all associated data including photos, weights, and actions."
                ] }),
                /* @__PURE__ */ jsxs(DialogFooter, { className: "gap-2", children: [
                  /* @__PURE__ */ jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Cancel" }) }),
                  (animal == null ? void 0 : animal.id) && /* @__PURE__ */ jsx(Form, { ...animals.destroy.form(animal.id), className: "inline", children: () => /* @__PURE__ */ jsx(Button, { variant: "destructive", type: "submit", children: "Delete Animal" }) })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold drop-shadow-sm", children: animal.name }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "capitalize text-foreground", children: animal.species }),
            /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "capitalize text-foreground", children: animal.sex }),
            /* @__PURE__ */ jsx(
              Badge,
              {
                variant: animal.status === "available" ? "default" : animal.status === "in_foster" ? "secondary" : "outline",
                className: "text-foreground",
                children: animal.status_label
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm opacity-90", children: animal.age_years_months })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-4", children: [
        animal.primary_photo_url ? /* @__PURE__ */ jsx(
          "img",
          {
            src: animal.primary_photo_url,
            alt: `${animal.name} photo`,
            className: "h-16 w-16 rounded-lg object-cover"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "h-16 w-16 rounded-lg bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsx(Heart, { className: "h-8 w-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: animal.name }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
            /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "capitalize", children: animal.species }),
            /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: animal.sex }),
            /* @__PURE__ */ jsx(
              Badge,
              {
                variant: animal.status === "available" ? "default" : animal.status === "in_foster" ? "secondary" : "outline",
                children: animal.status_label
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1", children: animal.age_years_months })
        ] })
      ] }),
      animal.medical_conditions && /* @__PURE__ */ jsxs(Card, { className: "mx-4 md:mx-0", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Medical Conditions" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: animal.medical_conditions }) })
      ] }),
      animal.description && /* @__PURE__ */ jsxs(Card, { className: "mx-4 md:mx-0", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Description" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: animal.description }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "md:mx-0", children: /* @__PURE__ */ jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b", children: /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "photos", className: "flex items-center justify-center gap-2 py-3", children: [
            /* @__PURE__ */ jsx(Image, { className: "h-4 w-4" }),
            "Photos"
          ] }),
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "weights", className: "flex items-center justify-center gap-2 py-3", children: [
            /* @__PURE__ */ jsx(Scale, { className: "h-4 w-4" }),
            "Weigh-in"
          ] }),
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "actions", className: "flex items-center justify-center gap-2 py-3", children: [
            /* @__PURE__ */ jsx(Activity, { className: "h-4 w-4" }),
            "Actions"
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "photos", className: "p-4 md:p-6", children: /* @__PURE__ */ jsx(PhotosTab, { animal }) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "weights", className: "p-4 md:p-6", children: /* @__PURE__ */ jsx(WeightsTab, { animal }) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "actions", className: "p-4 md:p-6", children: /* @__PURE__ */ jsx(ActionsTab, { animal }) })
      ] }) })
    ] })
  ] }) });
}
export {
  AnimalsShow as default
};
