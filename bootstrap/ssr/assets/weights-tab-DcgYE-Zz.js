import { jsxs, jsx } from "react/jsx-runtime";
import { a as applyUrlDefaults, q as queryParams, B as Button } from "./index-WFXEz8te.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Cu74DLiT.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, g as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-DRfj1Fxx.js";
import { L as Label, I as Input } from "./label-BOW2KBE8.js";
import { T as Textarea } from "./textarea-BQYaG86Z.js";
import { u as useToast } from "./use-toast-Cbnq_qHJ.js";
import { useForm } from "@inertiajs/react";
import { a as animals } from "./index-BiQ7LnyC.js";
import { useState, useCallback, useEffect } from "react";
import { Plus, TrendingUp, Scale, Trash2 } from "lucide-react";
import { g as getXsrfToken } from "./csrf-fSQysBlS.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
const destroy = (args, options) => ({
  url: destroy.url(args, options),
  method: "delete"
});
destroy.definition = {
  methods: ["delete"],
  url: "/animal-weights/{animalWeight}"
};
destroy.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { animalWeight: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { animalWeight: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      animalWeight: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    animalWeight: typeof args.animalWeight === "object" ? args.animalWeight.id : args.animalWeight
  };
  return destroy.definition.url.replace("{animalWeight}", parsedArgs.animalWeight.toString()).replace(/\/+$/, "") + queryParams(options);
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
const animalWeights = {
  destroy: Object.assign(destroy, destroy)
};
function WeightsTab({ animal }) {
  const { toast } = useToast();
  const [weights, setWeights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const addForm = useForm({
    weight_kg: "",
    measured_at: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    notes: ""
  });
  const fetchWeights = useCallback(async () => {
    try {
      const response = await fetch(animals.weights.url(animal.id), {
        headers: { "Accept": "application/json" },
        credentials: "same-origin"
      });
      if (response.ok) {
        const data = await response.json();
        setWeights(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch weights:", error);
    } finally {
      setLoading(false);
    }
  }, [animal.id]);
  useEffect(() => {
    fetchWeights();
  }, [fetchWeights]);
  const handleAddWeight = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(animals.weights.store.url(animal.id), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": getXsrfToken()
        },
        body: JSON.stringify({
          weight_kg: addForm.data.weight_kg,
          measured_at: addForm.data.measured_at,
          notes: addForm.data.notes
        }),
        credentials: "same-origin"
      });
      if (response.ok) {
        const newWeight = await response.json();
        setWeights((prev) => [newWeight.data, ...prev]);
        setAddDialogOpen(false);
        addForm.reset();
        toast({
          title: "Success",
          description: "Weight record added successfully"
        });
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.message || "Failed to add weight record",
          variant: "destructive"
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to add weight record",
        variant: "destructive"
      });
    }
  };
  const handleDeleteWeight = async (weightId) => {
    try {
      const response = await fetch(animalWeights.destroy.url(weightId), {
        method: "DELETE",
        headers: {
          "X-XSRF-TOKEN": getXsrfToken(),
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
        credentials: "same-origin"
      });
      if (response.ok) {
        setWeights((prev) => prev.filter((weight) => weight.id !== weightId));
        toast({
          title: "Success",
          description: "Weight record deleted successfully"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete weight record",
          variant: "destructive"
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete weight record",
        variant: "destructive"
      });
    }
  };
  const chartData = weights.slice(0, 10).reverse().map((weight, index) => ({
    date: new Date(weight.measured_at).toLocaleDateString(),
    weight: parseFloat(weight.weight_kg),
    index
  }));
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Weight Records" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Track ",
          animal.name,
          "'s weight over time"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Dialog, { open: addDialogOpen, onOpenChange: setAddDialogOpen, children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Add Weight"
        ] }) }),
        /* @__PURE__ */ jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsx(DialogTitle, { children: "Add Weight Record" }),
            /* @__PURE__ */ jsxs(DialogDescription, { children: [
              "Record a new weight measurement for ",
              animal.name
            ] })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleAddWeight, children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "weight_kg", children: "Weight (kg)" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "weight_kg",
                    type: "number",
                    step: "0.01",
                    min: "0.01",
                    max: "200",
                    value: addForm.data.weight_kg,
                    onChange: (e) => addForm.setData("weight_kg", e.target.value),
                    placeholder: "Enter weight in kg",
                    required: true
                  }
                ),
                addForm.errors.weight_kg && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive mt-1", children: addForm.errors.weight_kg })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "measured_at", children: "Date Measured" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "measured_at",
                    type: "date",
                    value: addForm.data.measured_at,
                    onChange: (e) => addForm.setData("measured_at", e.target.value),
                    required: true
                  }
                ),
                addForm.errors.measured_at && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive mt-1", children: addForm.errors.measured_at })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "notes", children: "Notes (optional)" }),
                /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    id: "notes",
                    value: addForm.data.notes,
                    onChange: (e) => addForm.setData("notes", e.target.value),
                    placeholder: "Any additional notes",
                    rows: 3
                  }
                ),
                addForm.errors.notes && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive mt-1", children: addForm.errors.notes })
              ] })
            ] }),
            /* @__PURE__ */ jsx(DialogFooter, { className: "mt-6", children: /* @__PURE__ */ jsx(Button, { type: "submit", disabled: addForm.processing, children: addForm.processing ? "Adding..." : "Add Weight" }) })
          ] })
        ] })
      ] })
    ] }),
    chartData.length > 1 && /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(TrendingUp, { className: "h-5 w-5" }),
        "Weight Trend (Last 10 Records)"
      ] }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "h-48 flex items-end gap-2", children: chartData.map((point, index) => {
        const maxWeight = Math.max(...chartData.map((p) => p.weight));
        const minWeight = Math.min(...chartData.map((p) => p.weight));
        const range = maxWeight - minWeight || 1;
        const height = (point.weight - minWeight) / range * 100;
        return /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center gap-1", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "w-full bg-primary rounded-t transition-all duration-300 hover:bg-primary/80",
              style: { height: `${Math.max(height, 5)}%` },
              title: `${point.weight}kg on ${point.date}`
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground rotate-45 origin-center", children: point.date })
        ] }, index);
      }) }) })
    ] }),
    loading ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "animate-pulse space-y-2", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-muted rounded w-1/4" }),
      /* @__PURE__ */ jsx("div", { className: "h-6 bg-muted rounded w-1/6" })
    ] }) }) }, i)) }) : weights.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: weights.map((weight) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg", children: /* @__PURE__ */ jsx(Scale, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold", children: [
              weight.weight_kg,
              " kg"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: new Date(weight.measured_at).toLocaleDateString() })
          ] }),
          weight.recorded_by && /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Recorded by ",
            weight.recorded_by.name
          ] }),
          weight.notes && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: weight.notes })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => handleDeleteWeight(weight.id),
          className: "text-destructive hover:text-destructive",
          children: [
            /* @__PURE__ */ jsx(Trash2, { className: "mr-1 h-3 w-3" }),
            "Delete"
          ]
        }
      )
    ] }) }) }, weight.id)) }) : /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsx(Scale, { className: "mx-auto h-12 w-12 text-muted-foreground mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2", children: "No weight records" }),
      /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mb-4", children: [
        "Start tracking ",
        animal.name,
        "'s weight by adding the first record"
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => setAddDialogOpen(true), children: [
        /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
        "Add First Weight Record"
      ] })
    ] }) })
  ] });
}
export {
  WeightsTab as default
};
