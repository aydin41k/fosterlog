import { jsx } from "react/jsx-runtime";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const appName = "FosterLog";
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, /* @__PURE__ */ Object.assign({ "./pages/animals/actions.tsx": () => import("./assets/actions-JPiUbTRz.js"), "./pages/animals/components/actions-tab-simple.tsx": () => import("./assets/actions-tab-simple-Bea7VO5h.js"), "./pages/animals/components/photos-tab.tsx": () => import("./assets/photos-tab-myY1zto2.js"), "./pages/animals/components/weights-tab.tsx": () => import("./assets/weights-tab-DcgYE-Zz.js"), "./pages/animals/create.tsx": () => import("./assets/create-RjNIPZ-U.js"), "./pages/animals/edit.tsx": () => import("./assets/edit-BbbfdQgZ.js"), "./pages/animals/index.tsx": () => import("./assets/index-DX0bK7w4.js"), "./pages/animals/photos.tsx": () => import("./assets/photos-blfKc6Lp.js"), "./pages/animals/show.tsx": () => import("./assets/show-B9tTdwDP.js"), "./pages/animals/weights.tsx": () => import("./assets/weights-1pdb2gj6.js"), "./pages/auth/confirm-password.tsx": () => import("./assets/confirm-password-k6-4lXem.js"), "./pages/auth/forgot-password.tsx": () => import("./assets/forgot-password-D_y8baIa.js"), "./pages/auth/login.tsx": () => import("./assets/login-BpuqiddL.js"), "./pages/auth/register.tsx": () => import("./assets/register-CthV4m04.js"), "./pages/auth/reset-password.tsx": () => import("./assets/reset-password-D7Q3tWM-.js"), "./pages/auth/verify-email.tsx": () => import("./assets/verify-email-MOyXXBlg.js"), "./pages/public/cats/index.tsx": () => import("./assets/index-BLrAPHjE.js"), "./pages/public/cats/show.tsx": () => import("./assets/show-MRhMH62y.js"), "./pages/resident-pets/index.tsx": () => import("./assets/index-BCl5dUtR.js"), "./pages/resident-pets/show.tsx": () => import("./assets/show-so1bs-wf.js"), "./pages/settings/appearance.tsx": () => import("./assets/appearance-UZ6IHSho.js"), "./pages/settings/password.tsx": () => import("./assets/password-B8AQvtpK.js"), "./pages/settings/profile.tsx": () => import("./assets/profile-CpNZxPXW.js"), "./pages/welcome.tsx": () => import("./assets/welcome-BXdde2HK.js") })),
    setup: ({ App, props }) => {
      return /* @__PURE__ */ jsx(App, { ...props });
    }
  })
);
