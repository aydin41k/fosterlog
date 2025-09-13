import { jsxs, jsx } from "react/jsx-runtime";
import { B as Button } from "./index-WFXEz8te.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Cu74DLiT.js";
import { L as Label, I as Input } from "./label-BOW2KBE8.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C-bVdQlQ.js";
import { T as Textarea } from "./textarea-BQYaG86Z.js";
import { A as AppLayout } from "./app-layout-DEDBaMvw.js";
import { a as animals } from "./index-BiQ7LnyC.js";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { ArrowLeft, Camera, Save } from "lucide-react";
import { useState, useEffect } from "react";
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
    title: "Foster Pets",
    href: animals.index().url
  },
  {
    title: "Add a Foster Pet",
    href: animals.create().url
  }
];
function AnimalsCreate() {
  var _a;
  const form = useForm({
    name: "",
    species: "cat",
    dob: "",
    sex: "unknown",
    medical_conditions: "",
    description: "",
    status: "in_foster",
    photo: null,
    caption: ""
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  useEffect(() => {
    if (form.data.photo) {
      const url = URL.createObjectURL(form.data.photo);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
    return void 0;
  }, [form.data.photo]);
  const handleSubmit = (e) => {
    e.preventDefault();
    form.post(animals.store.form().action, {
      onSuccess: () => {
        router.visit(animals.index().url);
      }
    });
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsx(Head, { title: "Add a Foster Pet" }),
    /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 pb-28", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:hidden sticky top-0 z-40 -mx-4 -mt-4 flex items-center gap-3 border-b bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, className: "rounded-full", children: /* @__PURE__ */ jsx(Link, { href: animals.index().url, "aria-label": "Back", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-5 w-5" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("h1", { className: "truncate text-base font-semibold", children: "Add New Foster Pet" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Create a pet and add a photo" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: animals.index().url, children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
          "Back to Pets"
        ] }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Add New Animal" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Add a new animal to your foster care." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("form", { id: "animal-create-form", onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Animal Information" }) }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "photo", className: "text-sm", children: "Primary Photo (optional)" }),
            /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-xl border", children: [
              previewUrl ? /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    const el = document.getElementById("photo-input");
                    el == null ? void 0 : el.click();
                  },
                  className: "group block w-full",
                  "aria-label": "Change photo",
                  children: [
                    /* @__PURE__ */ jsx("img", { src: previewUrl, alt: "Selected preview", className: "h-56 w-full object-cover" }),
                    /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/50 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-white/90", children: "Tap to change" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-white/80", children: (_a = form.data.photo) == null ? void 0 : _a.name })
                    ] })
                  ]
                }
              ) : /* @__PURE__ */ jsxs("label", { htmlFor: "photo-input", className: "flex h-40 w-full cursor-pointer flex-col items-center justify-center gap-2 bg-muted/40 p-4 text-center", children: [
                /* @__PURE__ */ jsx(Camera, { className: "h-6 w-6 text-muted-foreground" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Add a photo" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "JPG, PNG or GIF up to 5MB" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "photo-input",
                  className: "sr-only",
                  type: "file",
                  accept: "image/*",
                  onChange: (e) => {
                    var _a2;
                    const file = ((_a2 = e.target.files) == null ? void 0 : _a2[0]) ?? null;
                    form.setData("photo", file);
                  }
                }
              )
            ] }),
            form.errors.photo && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: String(form.errors.photo) }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "caption", children: "Photo Caption (optional)" }),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  id: "caption",
                  value: form.data.caption,
                  onChange: (e) => form.setData("caption", e.target.value),
                  placeholder: "Add a caption for the photo",
                  rows: 3
                }
              ),
              form.errors.caption && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.caption })
            ] })
          ] }),
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
            /* @__PURE__ */ jsx(Label, { htmlFor: "description", children: "Notes" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "description",
                value: form.data.description,
                onChange: (e) => form.setData("description", e.target.value),
                placeholder: "Additional information about the pet",
                rows: 4
              }
            ),
            form.errors.description && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hidden md:flex gap-4 pt-4", children: [
            /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: form.processing, className: "h-10 px-6", children: [
              /* @__PURE__ */ jsx(Save, { className: "mr-2 h-4 w-4" }),
              form.processing ? "Saving..." : "Save"
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => router.visit(animals.index().url),
                disabled: form.processing,
                className: "h-10 px-6",
                children: "Cancel"
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "md:hidden fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: [
        /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-screen-sm px-4 py-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "h-12 flex-1",
              onClick: () => router.visit(animals.index().url),
              disabled: form.processing,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "submit",
              form: "animal-create-form",
              className: "h-12 flex-1",
              disabled: form.processing,
              children: [
                /* @__PURE__ */ jsx(Save, { className: "mr-2 h-5 w-5" }),
                form.processing ? "Saving…" : "Save"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-[env(safe-area-inset-bottom)]" })
      ] })
    ] })
  ] });
}
export {
  AnimalsCreate as default
};
