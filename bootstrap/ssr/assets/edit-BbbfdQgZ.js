import { jsxs, jsx } from "react/jsx-runtime";
import { B as Button } from "./index-WFXEz8te.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Cu74DLiT.js";
import { L as Label, I as Input } from "./label-BOW2KBE8.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C-bVdQlQ.js";
import { T as Textarea } from "./textarea-BQYaG86Z.js";
import { A as AppLayout } from "./app-layout-DEDBaMvw.js";
import { a as animals } from "./index-BiQ7LnyC.js";
import { usePage, useForm, Head, Link, router } from "@inertiajs/react";
import { ArrowLeft, Save } from "lucide-react";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
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
    title: "Edit Animal",
    href: ""
  }
];
function AnimalsEdit() {
  const { animal } = usePage().props;
  const form = useForm({
    name: animal.name || "",
    species: animal.species || "",
    dob: animal.dob || "",
    sex: animal.sex || "",
    medical_conditions: animal.medical_conditions || "",
    description: animal.description || "",
    status: animal.status || "in_foster"
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    form.put(animals.update(animal.id).url, {
      onSuccess: () => {
        router.visit(animals.index().url);
      }
    });
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit ${animal.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: animals.index().url, children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
          "Back to Pets"
        ] }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold", children: [
            "Edit ",
            animal.name
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Update animal information." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Animal Information" }) }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "name",
                  value: form.data.name,
                  onChange: (e) => form.setData("name", e.target.value),
                  placeholder: "Enter animal name",
                  required: true
                }
              ),
              form.errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "species", children: "Species" }),
              /* @__PURE__ */ jsxs(
                Select,
                {
                  value: form.data.species,
                  onValueChange: (value) => form.setData("species", value),
                  children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select species" }) }),
                    /* @__PURE__ */ jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsx(SelectItem, { value: "cat", children: "Cat" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "dog", children: "Dog" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "other", children: "Other" })
                    ] })
                  ]
                }
              ),
              form.errors.species && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.species })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "dob", children: "Date of Birth" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "dob",
                  type: "date",
                  value: form.data.dob,
                  onChange: (e) => form.setData("dob", e.target.value)
                }
              ),
              form.errors.dob && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.dob })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "sex", children: "Sex" }),
              /* @__PURE__ */ jsxs(
                Select,
                {
                  value: form.data.sex,
                  onValueChange: (value) => form.setData("sex", value),
                  children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select sex" }) }),
                    /* @__PURE__ */ jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsx(SelectItem, { value: "male", children: "Male" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "female", children: "Female" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "unknown", children: "Unknown" })
                    ] })
                  ]
                }
              ),
              form.errors.sex && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.sex })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "status", children: "Status" }),
              /* @__PURE__ */ jsxs(
                Select,
                {
                  value: form.data.status,
                  onValueChange: (value) => form.setData("status", value),
                  children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select status" }) }),
                    /* @__PURE__ */ jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsx(SelectItem, { value: "in_foster", children: "In Foster Care" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "available", children: "Available for Adoption" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "adopted", children: "Adopted" })
                    ] })
                  ]
                }
              ),
              form.errors.status && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.status })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "medical_conditions", children: "Medical Conditions" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "medical_conditions",
                value: form.data.medical_conditions,
                onChange: (e) => form.setData("medical_conditions", e.target.value),
                placeholder: "List any medical conditions or special needs",
                rows: 3
              }
            ),
            form.errors.medical_conditions && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.medical_conditions })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "description", children: "Description" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "description",
                value: form.data.description,
                onChange: (e) => form.setData("description", e.target.value),
                placeholder: "Additional information about the animal",
                rows: 4
              }
            ),
            form.errors.description && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pt-4", children: [
            /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: form.processing, children: [
              /* @__PURE__ */ jsx(Save, { className: "mr-2 h-4 w-4" }),
              form.processing ? "Saving..." : "Update Animal"
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => router.visit(animals.index().url),
                disabled: form.processing,
                children: "Cancel"
              }
            )
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  AnimalsEdit as default
};
