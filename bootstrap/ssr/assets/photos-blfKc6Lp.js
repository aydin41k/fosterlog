import { jsxs, jsx } from "react/jsx-runtime";
import { B as Badge } from "./badge-B59T10Te.js";
import { B as Button } from "./index-WFXEz8te.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Cu74DLiT.js";
import { A as AppLayout } from "./app-layout-DEDBaMvw.js";
import { a as animals } from "./index-BiQ7LnyC.js";
import { usePage, Head, Link } from "@inertiajs/react";
import { ArrowLeft, Image, User, Calendar } from "lucide-react";
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
    title: "Photos",
    href: ""
  }
];
function AnimalsPhotos() {
  const { animal, photos } = usePage().props;
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsx(Head, { title: `${animal.name} - Photos` }),
    /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: animals.show(animal.id).url, children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
          "Back to Pet"
        ] }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold", children: [
            animal.name,
            " - Photos"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Photo gallery and management." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Image, { className: "h-5 w-5" }),
          "Photos (",
          photos.length,
          ")"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: photos.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: photos.map((photo) => /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "aspect-square relative", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: `/storage/${photo.path}`,
                alt: photo.caption || `${animal.name} photo`,
                className: "w-full h-full object-cover"
              }
            ),
            photo.is_primary && /* @__PURE__ */ jsx(
              Badge,
              {
                variant: "default",
                className: "absolute top-2 right-2",
                children: "Primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
            photo.caption && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-2", children: photo.caption }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(User, { className: "h-3 w-3" }),
                photo.uploaded_by.name
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3" }),
                new Date(photo.created_at).toLocaleDateString()
              ] })
            ] })
          ] })
        ] }, photo.id)) }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ jsx(Image, { className: "h-12 w-12 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium mb-2", children: "No photos yet" }),
          /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mb-4", children: [
            "Start building a photo gallery for ",
            animal.name,
            "."
          ] }),
          /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: animals.show(animal.id).url, children: "Add Photos" }) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  AnimalsPhotos as default
};
