import { jsxs, jsx } from "react/jsx-runtime";
import { B as Badge } from "./badge-B59T10Te.js";
import { B as Button } from "./index-WFXEz8te.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-Cu74DLiT.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C-bVdQlQ.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CfxhTrqJ.js";
import { A as AppLayout } from "./app-layout-DEDBaMvw.js";
import { a as animals } from "./index-BiQ7LnyC.js";
import { usePage, Head, Link, router } from "@inertiajs/react";
import { ArrowLeft, Activity, User, Calendar } from "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "react";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-select";
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
    title: "Actions",
    href: ""
  }
];
function AnimalsActions() {
  const { animal, actions, filter_type } = usePage().props;
  const handleFilterChange = (value) => {
    const url = new URL(window.location.href);
    if (value === "all") {
      url.searchParams.delete("type");
    } else {
      url.searchParams.set("type", value);
    }
    router.visit(url.toString());
  };
  const getActionTypeLabel = (type) => {
    switch (type) {
      case "food":
        return "Food";
      case "medication":
        return "Medication";
      case "exercise":
        return "Exercise";
      case "medical":
        return "Medical";
      case "veterinary":
        return "Veterinary";
      case "other":
        return "Other";
      default:
        return type;
    }
  };
  const getActionTypeColor = (type) => {
    switch (type) {
      case "food":
        return "default";
      case "medication":
        return "destructive";
      case "exercise":
        return "secondary";
      case "medical":
        return "outline";
      case "veterinary":
        return "outline";
      case "other":
        return "secondary";
      default:
        return "outline";
    }
  };
  const renderActionDetails = (action) => {
    switch (action.type) {
      case "food":
        return /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Amount:" }),
            " ",
            action.details.amount_g,
            "g"
          ] }),
          action.details.brand && /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Brand:" }),
            " ",
            action.details.brand
          ] }),
          action.details.notes && /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Notes:" }),
            " ",
            action.details.notes
          ] })
        ] });
      case "medication":
        return /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Name:" }),
            " ",
            action.details.name
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Dose:" }),
            " ",
            action.details.dose
          ] }),
          action.details.notes && /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Notes:" }),
            " ",
            action.details.notes
          ] })
        ] });
      default:
        return /* @__PURE__ */ jsx("div", { className: "text-sm", children: Object.entries(action.details).map(([key, value]) => /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsxs("strong", { children: [
            key,
            ":"
          ] }),
          " ",
          String(value)
        ] }, key)) });
    }
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsx(Head, { title: `${animal.name} - Actions` }),
    /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: animals.show(animal.id).url, children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
          "Back to Pet"
        ] }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold", children: [
            animal.name,
            " - Actions"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Care activity history and tracking." })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "type-filter", className: "text-sm font-medium", children: "Filter by type:" }),
        /* @__PURE__ */ jsxs(Select, { value: filter_type, onValueChange: handleFilterChange, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-48", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select type" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Actions" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "food", children: "Food" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "medication", children: "Medication" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "exercise", children: "Exercise" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "medical", children: "Medical" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "veterinary", children: "Veterinary" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "other", children: "Other" })
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Activity, { className: "h-5 w-5" }),
          "Actions (",
          actions.length,
          ")"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: actions.length > 0 ? /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: "Type" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Details" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Performed By" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Date" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: actions.map((action) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: getActionTypeColor(action.type), children: getActionTypeLabel(action.type) }) }),
            /* @__PURE__ */ jsx(TableCell, { children: renderActionDetails(action) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(User, { className: "h-4 w-4 text-muted-foreground" }),
              action.performed_by.name
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
              new Date(action.performed_at).toLocaleString()
            ] }) })
          ] }, action.id)) })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ jsx(Activity, { className: "h-12 w-12 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium mb-2", children: "No actions found" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: filter_type === "all" ? `Start recording care activities for ${animal.name}.` : `No ${filter_type} actions found for ${animal.name}.` }),
          filter_type !== "all" && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              onClick: () => handleFilterChange("all"),
              className: "mr-2",
              children: "Show All Actions"
            }
          ),
          /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: animals.show(animal.id).url, children: "Add Actions" }) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  AnimalsActions as default
};
