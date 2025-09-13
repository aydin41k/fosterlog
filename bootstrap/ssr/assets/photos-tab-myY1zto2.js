import { jsxs, jsx } from "react/jsx-runtime";
import { a as applyUrlDefaults, q as queryParams, B as Button } from "./index-WFXEz8te.js";
import { C as Card, a as CardContent } from "./card-Cu74DLiT.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, g as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-DRfj1Fxx.js";
import { L as Label, I as Input } from "./label-BOW2KBE8.js";
import { T as Textarea } from "./textarea-BQYaG86Z.js";
import { u as useToast } from "./use-toast-Cbnq_qHJ.js";
import { usePage, useForm } from "@inertiajs/react";
import { a as animals } from "./index-BiQ7LnyC.js";
import { useState } from "react";
import { Upload, Star, Trash2, Camera } from "lucide-react";
import { g as getXsrfToken } from "./csrf-fSQysBlS.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
const update = (args, options) => ({
  url: update.url(args, options),
  method: "put"
});
update.definition = {
  methods: ["put"],
  url: "/animal-photos/{animalPhoto}"
};
update.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { animalPhoto: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { animalPhoto: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      animalPhoto: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    animalPhoto: typeof args.animalPhoto === "object" ? args.animalPhoto.id : args.animalPhoto
  };
  return update.definition.url.replace("{animalPhoto}", parsedArgs.animalPhoto.toString()).replace(/\/+$/, "") + queryParams(options);
};
update.put = (args, options) => ({
  url: update.url(args, options),
  method: "put"
});
const updateForm = (args, options) => ({
  action: update.url(args, {
    [(options == null ? void 0 : options.mergeQuery) ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...(options == null ? void 0 : options.query) ?? (options == null ? void 0 : options.mergeQuery) ?? {}
    }
  }),
  method: "post"
});
updateForm.put = (args, options) => ({
  action: update.url(args, {
    [(options == null ? void 0 : options.mergeQuery) ? "mergeQuery" : "query"]: {
      _method: "PUT",
      ...(options == null ? void 0 : options.query) ?? (options == null ? void 0 : options.mergeQuery) ?? {}
    }
  }),
  method: "post"
});
update.form = updateForm;
const destroy = (args, options) => ({
  url: destroy.url(args, options),
  method: "delete"
});
destroy.definition = {
  methods: ["delete"],
  url: "/animal-photos/{animalPhoto}"
};
destroy.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { animalPhoto: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { animalPhoto: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      animalPhoto: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    animalPhoto: typeof args.animalPhoto === "object" ? args.animalPhoto.id : args.animalPhoto
  };
  return destroy.definition.url.replace("{animalPhoto}", parsedArgs.animalPhoto.toString()).replace(/\/+$/, "") + queryParams(options);
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
const animalPhotos = {
  update: Object.assign(update, update),
  destroy: Object.assign(destroy, destroy)
};
function PhotosTab({ animal }) {
  const DEBUG = false;
  const { toast } = useToast();
  const { props } = usePage();
  const [photos, setPhotos] = useState(props.photos || []);
  const [uploading, setUploading] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const uploadForm = useForm({
    photo: null,
    caption: ""
  });
  const handlePhotoUpload = async (e) => {
    if (e && "preventDefault" in e) e.preventDefault();
    if (!uploadForm.data.photo) {
      toast({
        title: "Error",
        description: "Please select a photo to upload",
        variant: "destructive"
      });
      return;
    }
    if (!animal || typeof animal.id !== "number") {
      toast({ title: "Error", description: "Animal context not ready", variant: "destructive" });
      return;
    }
    setUploading(true);
    try {
      const token = getXsrfToken();
      const url = animals.photos.url(animal.id);
      if (DEBUG) ;
      const formData = new FormData();
      formData.append("photo", uploadForm.data.photo);
      formData.append("caption", uploadForm.data.caption);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "X-XSRF-TOKEN": token,
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
        body: formData,
        credentials: "same-origin"
      });
      if (DEBUG) ;
      if (response.ok) {
        const newPhoto = await response.json();
        setPhotos((prev) => [...prev, newPhoto.data]);
        setUploadDialogOpen(false);
        uploadForm.reset();
        toast({
          title: "Success",
          description: "Photo uploaded successfully"
        });
      } else {
        let error = {};
        try {
          error = await response.json();
        } catch {
          console.error("[PhotosTab] Failed to parse error JSON");
        }
        toast({
          title: "Error",
          description: error.message || "Failed to upload photo",
          variant: "destructive"
        });
        if (DEBUG) ;
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to upload photo",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };
  const handleSetPrimary = async (photoId) => {
    var _a;
    try {
      const url = animalPhotos.update.url(photoId);
      if (DEBUG) ;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-CSRF-TOKEN": ((_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.content) || ""
        },
        body: JSON.stringify({ is_primary: true }),
        credentials: "same-origin"
      });
      if (response.ok) {
        setPhotos((prev) => prev.map(
          (photo) => photo.id === photoId ? { ...photo, is_primary: true } : { ...photo, is_primary: false }
        ));
        toast({
          title: "Success",
          description: "Primary photo updated"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to set primary photo",
          variant: "destructive"
        });
        if (DEBUG) ;
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to set primary photo",
        variant: "destructive"
      });
    }
  };
  const handleDeletePhoto = async (photoId) => {
    var _a;
    try {
      const url = animalPhotos.destroy.url(photoId);
      if (DEBUG) ;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-TOKEN": ((_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.content) || "",
          "Accept": "application/json"
        },
        credentials: "same-origin"
      });
      if (response.ok) {
        setPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
        toast({
          title: "Success",
          description: "Photo deleted successfully"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete photo",
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete photo",
        variant: "destructive"
      });
    }
  };
  animal && typeof animal.id === "number" ? animals.photos.url(animal.id) : "N/A";
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Photos" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Manage photos for ",
          animal.name
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        Dialog,
        {
          open: uploadDialogOpen,
          onOpenChange: (open) => {
            setUploadDialogOpen(open);
          },
          children: [
            /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { children: [
              /* @__PURE__ */ jsx(Upload, { className: "mr-2 h-4 w-4" }),
              "Upload Photo"
            ] }) }),
            /* @__PURE__ */ jsxs(DialogContent, { children: [
              /* @__PURE__ */ jsxs(DialogHeader, { children: [
                /* @__PURE__ */ jsx(DialogTitle, { children: "Upload Photo" }),
                /* @__PURE__ */ jsxs(DialogDescription, { children: [
                  "Add a new photo for ",
                  animal.name
                ] })
              ] }),
              /* @__PURE__ */ jsxs("form", { children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "photo", children: "Photo" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "photo",
                        type: "file",
                        accept: "image/*",
                        onChange: (e) => {
                          var _a;
                          const file = ((_a = e.target.files) == null ? void 0 : _a[0]) || null;
                          uploadForm.setData("photo", file);
                        },
                        required: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "caption", children: "Caption (optional)" }),
                    /* @__PURE__ */ jsx(
                      Textarea,
                      {
                        id: "caption",
                        value: uploadForm.data.caption,
                        onChange: (e) => uploadForm.setData("caption", e.target.value),
                        placeholder: "Add a caption for this photo",
                        rows: 3
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx(DialogFooter, { className: "mt-6", children: /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "button",
                    onClick: (e) => {
                      void handlePhotoUpload(e);
                    },
                    disabled: uploading,
                    children: uploading ? "Uploading..." : "Upload"
                  }
                ) })
              ] })
            ] })
          ]
        }
      )
    ] }),
    photos.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: photos.map((photo) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: photo.url,
            alt: photo.caption || "Animal photo",
            className: "w-full h-48 object-cover rounded-lg"
          }
        ),
        photo.is_primary && /* @__PURE__ */ jsxs("div", { className: "absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 fill-current" }),
          "Primary"
        ] })
      ] }),
      photo.caption && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: photo.caption }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        !photo.is_primary && /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => handleSetPrimary(photo.id),
            children: [
              /* @__PURE__ */ jsx(Star, { className: "mr-1 h-3 w-3" }),
              "Set Primary"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => handleDeletePhoto(photo.id),
            className: "text-destructive hover:text-destructive",
            children: [
              /* @__PURE__ */ jsx(Trash2, { className: "mr-1 h-3 w-3" }),
              "Delete"
            ]
          }
        )
      ] })
    ] }) }) }, photo.id)) }) : /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsx(Camera, { className: "mx-auto h-12 w-12 text-muted-foreground mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2", children: "No photos yet" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: "Upload some photos to get started" }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => {
        setUploadDialogOpen(true);
      }, children: [
        /* @__PURE__ */ jsx(Upload, { className: "mr-2 h-4 w-4" }),
        "Upload First Photo"
      ] })
    ] }) }),
    DEBUG
  ] });
}
export {
  PhotosTab as default
};
