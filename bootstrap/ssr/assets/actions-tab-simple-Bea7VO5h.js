import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { B as Badge } from "./badge-B59T10Te.js";
import { a as applyUrlDefaults, q as queryParams, B as Button } from "./index-WFXEz8te.js";
import { C as Card, a as CardContent } from "./card-Cu74DLiT.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, g as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-DRfj1Fxx.js";
import { L as Label, I as Input } from "./label-BOW2KBE8.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C-bVdQlQ.js";
import { T as Textarea } from "./textarea-BQYaG86Z.js";
import { u as useToast } from "./use-toast-Cbnq_qHJ.js";
import { a as animals } from "./index-BiQ7LnyC.js";
import { useState, useCallback, useEffect } from "react";
import { Filter, Plus, Trash2, Activity, Pill, UtensilsCrossed } from "lucide-react";
import { g as getXsrfToken } from "./csrf-fSQysBlS.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
const destroy = (args, options) => ({
  url: destroy.url(args, options),
  method: "delete"
});
destroy.definition = {
  methods: ["delete"],
  url: "/actions/{action}"
};
destroy.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { action: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { action: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      action: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    action: typeof args.action === "object" ? args.action.id : args.action
  };
  return destroy.definition.url.replace("{action}", parsedArgs.action.toString()).replace(/\/+$/, "") + queryParams(options);
};
destroy.delete = (args, options) => ({
  url: destroy.url(args, options),
  method: "delete"
});
const destroyForm = (args, options) => ({
  action: destroy.url(args, {
    [(options == null ? void 0 : options.mergeQuery) ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...(options == null ? void 0 : options.query) ?? (options == null ? void 0 : options.mergeQuery) ?? {}
    }
  }),
  method: "post"
});
destroyForm.delete = (args, options) => ({
  action: destroy.url(args, {
    [(options == null ? void 0 : options.mergeQuery) ? "mergeQuery" : "query"]: {
      _method: "DELETE",
      ...(options == null ? void 0 : options.query) ?? (options == null ? void 0 : options.mergeQuery) ?? {}
    }
  }),
  method: "post"
});
destroy.form = destroyForm;
const actions = {
  destroy: Object.assign(destroy, destroy)
};
function ActionsTab({ animal }) {
  const { toast } = useToast();
  const [actions$1, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [actionType, setActionType] = useState("food");
  const [formData, setFormData] = useState({
    performed_at: (/* @__PURE__ */ new Date()).toISOString(),
    amount_g: "",
    brand: "",
    food_notes: "",
    medication_name: "",
    dose: "",
    medication_notes: ""
  });
  const fetchActions = useCallback(async () => {
    try {
      const url = typeFilter === "all" ? animals.actions.url(animal.id) : animals.actions.url(animal.id, { query: { type: typeFilter } });
      const response = await fetch(url, {
        headers: { "Accept": "application/json" },
        credentials: "same-origin"
      });
      if (response.ok) {
        const data = await response.json();
        setActions(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch actions:", error);
    } finally {
      setLoading(false);
    }
  }, [animal.id, typeFilter]);
  useEffect(() => {
    fetchActions();
  }, [fetchActions]);
  const handleAddAction = async (e) => {
    e.preventDefault();
    const details = {};
    if (actionType === "food") {
      details.amount_g = parseFloat(formData.amount_g);
      if (formData.brand) details.brand = formData.brand;
      if (formData.food_notes) details.notes = formData.food_notes;
    } else if (actionType === "medication") {
      details.name = formData.medication_name;
      details.dose = formData.dose;
      if (formData.medication_notes) details.notes = formData.medication_notes;
    }
    try {
      const response = await fetch(animals.actions.store.url(animal.id), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-XSRF-TOKEN": getXsrfToken(),
          "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify({
          type: actionType,
          details,
          performed_at: formData.performed_at
        }),
        credentials: "same-origin"
      });
      if (response.ok) {
        const newAction = await response.json();
        setActions((prev) => [newAction.data, ...prev]);
        setAddDialogOpen(false);
        setFormData({
          performed_at: (/* @__PURE__ */ new Date()).toISOString(),
          amount_g: "",
          brand: "",
          food_notes: "",
          medication_name: "",
          dose: "",
          medication_notes: ""
        });
        toast({
          title: "Success",
          description: `${actionType === "food" ? "Food" : "Medication"} action recorded successfully`
        });
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.message || "Failed to record action",
          variant: "destructive"
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to record action",
        variant: "destructive"
      });
    }
  };
  const handleDeleteAction = async (actionId) => {
    try {
      const response = await fetch(actions.destroy.url(actionId), {
        method: "DELETE",
        headers: {
          "X-XSRF-TOKEN": getXsrfToken(),
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
        credentials: "same-origin"
      });
      if (response.ok) {
        setActions((prev) => prev.filter((action) => action.id !== actionId));
        toast({
          title: "Success",
          description: "Action deleted successfully"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete action",
          variant: "destructive"
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete action",
        variant: "destructive"
      });
    }
  };
  const getActionIcon = (type) => {
    switch (type) {
      case "food":
        return /* @__PURE__ */ jsx(UtensilsCrossed, { className: "h-4 w-4" });
      case "medication":
        return /* @__PURE__ */ jsx(Pill, { className: "h-4 w-4" });
      default:
        return /* @__PURE__ */ jsx(Activity, { className: "h-4 w-4" });
    }
  };
  const getActionDetails = (action) => {
    if (action.type === "food") {
      return /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
          action.details.amount_g,
          "g"
        ] }),
        action.details.brand && /* @__PURE__ */ jsxs("span", { children: [
          " of ",
          action.details.brand
        ] }),
        action.details.notes && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1", children: action.details.notes })
      ] });
    } else if (action.type === "medication") {
      return /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: action.details.name }),
        /* @__PURE__ */ jsxs("span", { children: [
          " - ",
          action.details.dose
        ] }),
        action.details.notes && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1", children: action.details.notes })
      ] });
    }
    return null;
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Actions" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Track care activities for ",
          animal.name
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxs(Select, { value: typeFilter, onValueChange: setTypeFilter, children: [
          /* @__PURE__ */ jsxs(SelectTrigger, { className: "w-32", children: [
            /* @__PURE__ */ jsx(Filter, { className: "mr-2 h-4 w-4" }),
            /* @__PURE__ */ jsx(SelectValue, {})
          ] }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Types" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "food", children: "Food" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "medication", children: "Medication" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Dialog, { open: addDialogOpen, onOpenChange: setAddDialogOpen, children: [
          /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { children: [
            /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
            "Add Action"
          ] }) }),
          /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md", children: [
            /* @__PURE__ */ jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsx(DialogTitle, { children: "Record New Action" }),
              /* @__PURE__ */ jsxs(DialogDescription, { children: [
                "Add a new care activity for ",
                animal.name
              ] })
            ] }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleAddAction, children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "type", children: "Action Type" }),
                  /* @__PURE__ */ jsxs(
                    Select,
                    {
                      value: actionType,
                      onValueChange: (value) => {
                        setActionType(value);
                      },
                      children: [
                        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                        /* @__PURE__ */ jsxs(SelectContent, { children: [
                          /* @__PURE__ */ jsx(SelectItem, { value: "food", children: "Food" }),
                          /* @__PURE__ */ jsx(SelectItem, { value: "medication", children: "Medication" })
                        ] })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "performed_at", children: "Date & Time" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "performed_at",
                      type: "datetime-local",
                      value: formData.performed_at,
                      onChange: (e) => setFormData((prev) => ({ ...prev, performed_at: e.target.value })),
                      required: true
                    }
                  )
                ] }),
                actionType === "food" && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "amount_g", children: "Amount (grams)" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "amount_g",
                        type: "number",
                        min: "0.1",
                        step: "0.1",
                        value: formData.amount_g,
                        onChange: (e) => setFormData((prev) => ({ ...prev, amount_g: e.target.value })),
                        placeholder: "e.g. 250",
                        required: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "brand", children: "Brand (optional)" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "brand",
                        value: formData.brand,
                        onChange: (e) => setFormData((prev) => ({ ...prev, brand: e.target.value })),
                        placeholder: "e.g. Royal Canin"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "food_notes", children: "Notes (optional)" }),
                    /* @__PURE__ */ jsx(
                      Textarea,
                      {
                        id: "food_notes",
                        value: formData.food_notes,
                        onChange: (e) => setFormData((prev) => ({ ...prev, food_notes: e.target.value })),
                        placeholder: "Additional notes",
                        rows: 2
                      }
                    )
                  ] })
                ] }),
                actionType === "medication" && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "medication_name", children: "Medication Name" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "medication_name",
                        value: formData.medication_name,
                        onChange: (e) => setFormData((prev) => ({ ...prev, medication_name: e.target.value })),
                        placeholder: "e.g. Frontline",
                        required: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "dose", children: "Dose" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "dose",
                        value: formData.dose,
                        onChange: (e) => setFormData((prev) => ({ ...prev, dose: e.target.value })),
                        placeholder: "e.g. 1 tablet",
                        required: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "medication_notes", children: "Notes (optional)" }),
                    /* @__PURE__ */ jsx(
                      Textarea,
                      {
                        id: "medication_notes",
                        value: formData.medication_notes,
                        onChange: (e) => setFormData((prev) => ({ ...prev, medication_notes: e.target.value })),
                        placeholder: "Administration notes",
                        rows: 2
                      }
                    )
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx(DialogFooter, { className: "mt-6", children: /* @__PURE__ */ jsx(Button, { type: "submit", children: "Record Action" }) })
            ] })
          ] })
        ] })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "animate-pulse space-y-2", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-muted rounded w-1/4" }),
      /* @__PURE__ */ jsx("div", { className: "h-6 bg-muted rounded w-3/4" })
    ] }) }) }, i)) }) : actions$1.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: actions$1.map((action) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg", children: getActionIcon(action.type) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "capitalize", children: action.type }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: new Date(action.performed_at).toLocaleString() })
          ] }),
          getActionDetails(action),
          action.performed_by && /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
            "By ",
            action.performed_by.name
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => handleDeleteAction(action.id),
          className: "text-destructive hover:text-destructive",
          children: [
            /* @__PURE__ */ jsx(Trash2, { className: "mr-1 h-3 w-3" }),
            "Delete"
          ]
        }
      )
    ] }) }) }, action.id)) }) : /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsx(Activity, { className: "mx-auto h-12 w-12 text-muted-foreground mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2", children: "No actions recorded" }),
      /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mb-4", children: [
        "Start tracking care activities for ",
        animal.name
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => setAddDialogOpen(true), children: [
        /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
        "Record First Action"
      ] })
    ] }) })
  ] });
}
export {
  ActionsTab as default
};
