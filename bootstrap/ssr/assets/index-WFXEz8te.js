import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline: "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
});
Button.displayName = "Button";
let urlDefaults = {};
const queryParams = (options) => {
  if (!options || !options.query && !options.mergeQuery) {
    return "";
  }
  const query = options.query ?? options.mergeQuery;
  const includeExisting = options.mergeQuery !== void 0;
  const getValue = (value) => {
    if (value === true) {
      return "1";
    }
    if (value === false) {
      return "0";
    }
    return value.toString();
  };
  const params = new URLSearchParams(
    includeExisting && typeof window !== "undefined" ? window.location.search : ""
  );
  for (const key in query) {
    if (query[key] === void 0 || query[key] === null) {
      params.delete(key);
      continue;
    }
    if (Array.isArray(query[key])) {
      if (params.has(`${key}[]`)) {
        params.delete(`${key}[]`);
      }
      query[key].forEach((value) => {
        params.append(`${key}[]`, value.toString());
      });
    } else if (typeof query[key] === "object") {
      params.forEach((_, paramKey) => {
        if (paramKey.startsWith(`${key}[`)) {
          params.delete(paramKey);
        }
      });
      for (const subKey in query[key]) {
        if (typeof query[key][subKey] === "undefined") {
          continue;
        }
        if (["string", "number", "boolean"].includes(
          typeof query[key][subKey]
        )) {
          params.set(
            `${key}[${subKey}]`,
            getValue(query[key][subKey])
          );
        }
      }
    } else {
      params.set(key, getValue(query[key]));
    }
  }
  const str = params.toString();
  return str.length > 0 ? `?${str}` : "";
};
const applyUrlDefaults = (existing) => {
  const existingParams = { ...existing ?? {} };
  for (const key in urlDefaults) {
    if (existingParams[key] === void 0 && urlDefaults[key] !== void 0) {
      existingParams[key] = urlDefaults[key];
    }
  }
  return existingParams;
};
export {
  Button as B,
  applyUrlDefaults as a,
  cn as c,
  queryParams as q
};
