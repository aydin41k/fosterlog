import { a as applyUrlDefaults, q as queryParams } from "./index-WFXEz8te.js";
const show$1 = (args, options) => ({
  url: show$1.url(args, options),
  method: "get"
});
show$1.definition = {
  methods: ["get", "head"],
  url: "/public/animals/{slug}"
};
show$1.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { slug: args };
  }
  if (Array.isArray(args)) {
    args = {
      slug: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    slug: args.slug
  };
  return show$1.definition.url.replace("{slug}", parsedArgs.slug.toString()).replace(/\/+$/, "") + queryParams(options);
};
show$1.get = (args, options) => ({
  url: show$1.url(args, options),
  method: "get"
});
show$1.head = (args, options) => ({
  url: show$1.url(args, options),
  method: "head"
});
const showForm$1 = (args, options) => ({
  action: show$1.url(args, options),
  method: "get"
});
showForm$1.get = (args, options) => ({
  action: show$1.url(args, options),
  method: "get"
});
showForm$1.head = (args, options) => ({
  action: show$1.url(args, {
    [(options == null ? void 0 : options.mergeQuery) ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...(options == null ? void 0 : options.query) ?? (options == null ? void 0 : options.mergeQuery) ?? {}
    }
  }),
  method: "get"
});
show$1.form = showForm$1;
const publicMethod = {
  show: Object.assign(show$1, show$1)
};
const index = (options) => ({
  url: index.url(options),
  method: "get"
});
index.definition = {
  methods: ["get", "head"],
  url: "/animals"
};
index.url = (options) => {
  return index.definition.url + queryParams(options);
};
index.get = (options) => ({
  url: index.url(options),
  method: "get"
});
index.head = (options) => ({
  url: index.url(options),
  method: "head"
});
const indexForm = (options) => ({
  action: index.url(options),
  method: "get"
});
indexForm.get = (options) => ({
  action: index.url(options),
  method: "get"
});
indexForm.head = (options) => ({
  action: index.url({
    [(options == null ? void 0 : options.mergeQuery) ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...(options == null ? void 0 : options.query) ?? (options == null ? void 0 : options.mergeQuery) ?? {}
    }
  }),
  method: "get"
});
index.form = indexForm;
const create = (options) => ({
  url: create.url(options),
  method: "get"
});
create.definition = {
  methods: ["get", "head"],
  url: "/animals/create"
};
create.url = (options) => {
  return create.definition.url + queryParams(options);
};
create.get = (options) => ({
  url: create.url(options),
  method: "get"
});
create.head = (options) => ({
  url: create.url(options),
  method: "head"
});
const createForm = (options) => ({
  action: create.url(options),
  method: "get"
});
createForm.get = (options) => ({
  action: create.url(options),
  method: "get"
});
createForm.head = (options) => ({
  action: create.url({
    [(options == null ? void 0 : options.mergeQuery) ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...(options == null ? void 0 : options.query) ?? (options == null ? void 0 : options.mergeQuery) ?? {}
    }
  }),
  method: "get"
});
create.form = createForm;
const edit = (args, options) => ({
  url: edit.url(args, options),
  method: "get"
});
edit.definition = {
  methods: ["get", "head"],
  url: "/animals/{animal}/edit"
};
edit.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { animal: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { animal: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      animal: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    animal: typeof args.animal === "object" ? args.animal.id : args.animal
  };
  return edit.definition.url.replace("{animal}", parsedArgs.animal.toString()).replace(/\/+$/, "") + queryParams(options);
};
edit.get = (args, options) => ({
  url: edit.url(args, options),
  method: "get"
});
edit.head = (args, options) => ({
  url: edit.url(args, options),
  method: "head"
});
const editForm = (args, options) => ({
  action: edit.url(args, options),
  method: "get"
});
editForm.get = (args, options) => ({
  action: edit.url(args, options),
  method: "get"
});
editForm.head = (args, options) => ({
  action: edit.url(args, {
    [(options == null ? void 0 : options.mergeQuery) ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...(options == null ? void 0 : options.query) ?? (options == null ? void 0 : options.mergeQuery) ?? {}
    }
  }),
  method: "get"
});
edit.form = editForm;
const show = (args, options) => ({
  url: show.url(args, options),
  method: "get"
});
show.definition = {
  methods: ["get", "head"],
  url: "/animals/{animal}"
};
show.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { animal: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { animal: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      animal: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    animal: typeof args.animal === "object" ? args.animal.id : args.animal
  };
  return show.definition.url.replace("{animal}", parsedArgs.animal.toString()).replace(/\/+$/, "") + queryParams(options);
};
show.get = (args, options) => ({
  url: show.url(args, options),
  method: "get"
});
show.head = (args, options) => ({
  url: show.url(args, options),
  method: "head"
});
const showForm = (args, options) => ({
  action: show.url(args, options),
  method: "get"
});
showForm.get = (args, options) => ({
  action: show.url(args, options),
  method: "get"
});
showForm.head = (args, options) => ({
  action: show.url(args, {
    [(options == null ? void 0 : options.mergeQuery) ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...(options == null ? void 0 : options.query) ?? (options == null ? void 0 : options.mergeQuery) ?? {}
    }
  }),
  method: "get"
});
show.form = showForm;
const store = (options) => ({
  url: store.url(options),
  method: "post"
});
store.definition = {
  methods: ["post"],
  url: "/animals"
};
store.url = (options) => {
  return store.definition.url + queryParams(options);
};
store.post = (options) => ({
  url: store.url(options),
  method: "post"
});
const storeForm = (options) => ({
  action: store.url(options),
  method: "post"
});
storeForm.post = (options) => ({
  action: store.url(options),
  method: "post"
});
store.form = storeForm;
const update = (args, options) => ({
  url: update.url(args, options),
  method: "put"
});
update.definition = {
  methods: ["put"],
  url: "/animals/{animal}"
};
update.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { animal: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { animal: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      animal: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    animal: typeof args.animal === "object" ? args.animal.id : args.animal
  };
  return update.definition.url.replace("{animal}", parsedArgs.animal.toString()).replace(/\/+$/, "") + queryParams(options);
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
  url: "/animals/{animal}"
};
destroy.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { animal: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { animal: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      animal: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    animal: typeof args.animal === "object" ? args.animal.id : args.animal
  };
  return destroy.definition.url.replace("{animal}", parsedArgs.animal.toString()).replace(/\/+$/, "") + queryParams(options);
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
const photos = (args, options) => ({
  url: photos.url(args, options),
  method: "get"
});
photos.definition = {
  methods: ["get", "head"],
  url: "/animals/{animal}/photos"
};
photos.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { animal: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { animal: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      animal: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    animal: typeof args.animal === "object" ? args.animal.id : args.animal
  };
  return photos.definition.url.replace("{animal}", parsedArgs.animal.toString()).replace(/\/+$/, "") + queryParams(options);
};
photos.get = (args, options) => ({
  url: photos.url(args, options),
  method: "get"
});
photos.head = (args, options) => ({
  url: photos.url(args, options),
  method: "head"
});
const photosForm = (args, options) => ({
  action: photos.url(args, options),
  method: "get"
});
photosForm.get = (args, options) => ({
  action: photos.url(args, options),
  method: "get"
});
photosForm.head = (args, options) => ({
  action: photos.url(args, {
    [(options == null ? void 0 : options.mergeQuery) ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...(options == null ? void 0 : options.query) ?? (options == null ? void 0 : options.mergeQuery) ?? {}
    }
  }),
  method: "get"
});
photos.form = photosForm;
const weights = (args, options) => ({
  url: weights.url(args, options),
  method: "get"
});
weights.definition = {
  methods: ["get", "head"],
  url: "/animals/{animal}/weights"
};
weights.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { animal: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { animal: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      animal: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    animal: typeof args.animal === "object" ? args.animal.id : args.animal
  };
  return weights.definition.url.replace("{animal}", parsedArgs.animal.toString()).replace(/\/+$/, "") + queryParams(options);
};
weights.get = (args, options) => ({
  url: weights.url(args, options),
  method: "get"
});
weights.head = (args, options) => ({
  url: weights.url(args, options),
  method: "head"
});
const weightsForm = (args, options) => ({
  action: weights.url(args, options),
  method: "get"
});
weightsForm.get = (args, options) => ({
  action: weights.url(args, options),
  method: "get"
});
weightsForm.head = (args, options) => ({
  action: weights.url(args, {
    [(options == null ? void 0 : options.mergeQuery) ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...(options == null ? void 0 : options.query) ?? (options == null ? void 0 : options.mergeQuery) ?? {}
    }
  }),
  method: "get"
});
weights.form = weightsForm;
const weightsStore = (args, options) => ({
  url: weightsStore.url(args, options),
  method: "post"
});
weightsStore.definition = {
  methods: ["post"],
  url: "/animals/{animal}/weights"
};
weightsStore.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { animal: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { animal: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      animal: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    animal: typeof args.animal === "object" ? args.animal.id : args.animal
  };
  return weightsStore.definition.url.replace("{animal}", parsedArgs.animal.toString()).replace(/\/+$/, "") + queryParams(options);
};
weightsStore.post = (args, options) => ({
  url: weightsStore.url(args, options),
  method: "post"
});
const weightsStoreForm = (args, options) => ({
  action: weightsStore.url(args, options),
  method: "post"
});
weightsStoreForm.post = (args, options) => ({
  action: weightsStore.url(args, options),
  method: "post"
});
weightsStore.form = weightsStoreForm;
weights.store = weightsStore;
const actions = (args, options) => ({
  url: actions.url(args, options),
  method: "get"
});
actions.definition = {
  methods: ["get", "head"],
  url: "/animals/{animal}/actions"
};
actions.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { animal: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { animal: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      animal: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    animal: typeof args.animal === "object" ? args.animal.id : args.animal
  };
  return actions.definition.url.replace("{animal}", parsedArgs.animal.toString()).replace(/\/+$/, "") + queryParams(options);
};
actions.get = (args, options) => ({
  url: actions.url(args, options),
  method: "get"
});
actions.head = (args, options) => ({
  url: actions.url(args, options),
  method: "head"
});
const actionsForm = (args, options) => ({
  action: actions.url(args, options),
  method: "get"
});
actionsForm.get = (args, options) => ({
  action: actions.url(args, options),
  method: "get"
});
actionsForm.head = (args, options) => ({
  action: actions.url(args, {
    [(options == null ? void 0 : options.mergeQuery) ? "mergeQuery" : "query"]: {
      _method: "HEAD",
      ...(options == null ? void 0 : options.query) ?? (options == null ? void 0 : options.mergeQuery) ?? {}
    }
  }),
  method: "get"
});
actions.form = actionsForm;
const actionsStore = (args, options) => ({
  url: actionsStore.url(args, options),
  method: "post"
});
actionsStore.definition = {
  methods: ["post"],
  url: "/animals/{animal}/actions"
};
actionsStore.url = (args, options) => {
  if (typeof args === "string" || typeof args === "number") {
    args = { animal: args };
  }
  if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
    args = { animal: args.id };
  }
  if (Array.isArray(args)) {
    args = {
      animal: args[0]
    };
  }
  args = applyUrlDefaults(args);
  const parsedArgs = {
    animal: typeof args.animal === "object" ? args.animal.id : args.animal
  };
  return actionsStore.definition.url.replace("{animal}", parsedArgs.animal.toString()).replace(/\/+$/, "") + queryParams(options);
};
actionsStore.post = (args, options) => ({
  url: actionsStore.url(args, options),
  method: "post"
});
const actionsStoreForm = (args, options) => ({
  action: actionsStore.url(args, options),
  method: "post"
});
actionsStoreForm.post = (args, options) => ({
  action: actionsStore.url(args, options),
  method: "post"
});
actionsStore.form = actionsStoreForm;
actions.store = actionsStore;
const animals = {
  public: Object.assign(publicMethod, publicMethod),
  index: Object.assign(index, index),
  create: Object.assign(create, create),
  store: Object.assign(store, store),
  edit: Object.assign(edit, edit),
  show: Object.assign(show, show),
  update: Object.assign(update, update),
  destroy: Object.assign(destroy, destroy),
  photos: Object.assign(photos, photos),
  weights: Object.assign(weights, weights),
  actions: Object.assign(actions, actions)
};
export {
  animals as a
};
