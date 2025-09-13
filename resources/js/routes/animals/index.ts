import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import publicMethod from './public'
/**
* @see \AnimalController::index
* @see [unknown]:0
* @route '/animals'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/animals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \AnimalController::index
* @see [unknown]:0
* @route '/animals'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \AnimalController::index
* @see [unknown]:0
* @route '/animals'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \AnimalController::index
* @see [unknown]:0
* @route '/animals'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \AnimalController::index
* @see [unknown]:0
* @route '/animals'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \AnimalController::index
* @see [unknown]:0
* @route '/animals'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \AnimalController::index
* @see [unknown]:0
* @route '/animals'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see routes/web.php:49
* @route '/animals/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/animals/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:49
* @route '/animals/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see routes/web.php:49
* @route '/animals/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see routes/web.php:49
* @route '/animals/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see routes/web.php:49
* @route '/animals/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see routes/web.php:49
* @route '/animals/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see routes/web.php:49
* @route '/animals/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see routes/web.php:53
* @route '/animals/{animal}/edit'
*/
export const edit = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/animals/{animal}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:53
* @route '/animals/{animal}/edit'
*/
edit.url = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { animal: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { animal: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            animal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        animal: typeof args.animal === 'object'
        ? args.animal.id
        : args.animal,
    }

    return edit.definition.url
            .replace('{animal}', parsedArgs.animal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/web.php:53
* @route '/animals/{animal}/edit'
*/
edit.get = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:53
* @route '/animals/{animal}/edit'
*/
edit.head = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see routes/web.php:53
* @route '/animals/{animal}/edit'
*/
const editForm = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:53
* @route '/animals/{animal}/edit'
*/
editForm.get = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:53
* @route '/animals/{animal}/edit'
*/
editForm.head = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see routes/web.php:62
* @route '/animals/{animal}'
*/
export const show = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/animals/{animal}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:62
* @route '/animals/{animal}'
*/
show.url = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { animal: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { animal: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            animal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        animal: typeof args.animal === 'object'
        ? args.animal.id
        : args.animal,
    }

    return show.definition.url
            .replace('{animal}', parsedArgs.animal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/web.php:62
* @route '/animals/{animal}'
*/
show.get = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:62
* @route '/animals/{animal}'
*/
show.head = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see routes/web.php:62
* @route '/animals/{animal}'
*/
const showForm = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:62
* @route '/animals/{animal}'
*/
showForm.get = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:62
* @route '/animals/{animal}'
*/
showForm.head = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see routes/web.php:81
* @route '/animals'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/animals',
} satisfies RouteDefinition<["post"]>

/**
* @see routes/web.php:81
* @route '/animals'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see routes/web.php:81
* @route '/animals'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see routes/web.php:81
* @route '/animals'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see routes/web.php:81
* @route '/animals'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see routes/web.php:82
* @route '/animals/{animal}'
*/
export const update = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/animals/{animal}',
} satisfies RouteDefinition<["put"]>

/**
* @see routes/web.php:82
* @route '/animals/{animal}'
*/
update.url = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { animal: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { animal: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            animal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        animal: typeof args.animal === 'object'
        ? args.animal.id
        : args.animal,
    }

    return update.definition.url
            .replace('{animal}', parsedArgs.animal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/web.php:82
* @route '/animals/{animal}'
*/
update.put = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see routes/web.php:82
* @route '/animals/{animal}'
*/
const updateForm = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see routes/web.php:82
* @route '/animals/{animal}'
*/
updateForm.put = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see routes/web.php:83
* @route '/animals/{animal}'
*/
export const destroy = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/animals/{animal}',
} satisfies RouteDefinition<["delete"]>

/**
* @see routes/web.php:83
* @route '/animals/{animal}'
*/
destroy.url = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { animal: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { animal: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            animal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        animal: typeof args.animal === 'object'
        ? args.animal.id
        : args.animal,
    }

    return destroy.definition.url
            .replace('{animal}', parsedArgs.animal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/web.php:83
* @route '/animals/{animal}'
*/
destroy.delete = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see routes/web.php:83
* @route '/animals/{animal}'
*/
const destroyForm = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see routes/web.php:83
* @route '/animals/{animal}'
*/
destroyForm.delete = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see routes/web.php:99
* @route '/animals/{animal}/photos'
*/
export const photos = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: photos.url(args, options),
    method: 'get',
})

photos.definition = {
    methods: ["get","head"],
    url: '/animals/{animal}/photos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:99
* @route '/animals/{animal}/photos'
*/
photos.url = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { animal: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { animal: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            animal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        animal: typeof args.animal === 'object'
        ? args.animal.id
        : args.animal,
    }

    return photos.definition.url
            .replace('{animal}', parsedArgs.animal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/web.php:99
* @route '/animals/{animal}/photos'
*/
photos.get = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: photos.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:99
* @route '/animals/{animal}/photos'
*/
photos.head = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: photos.url(args, options),
    method: 'head',
})

/**
* @see routes/web.php:99
* @route '/animals/{animal}/photos'
*/
const photosForm = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: photos.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:99
* @route '/animals/{animal}/photos'
*/
photosForm.get = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: photos.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:99
* @route '/animals/{animal}/photos'
*/
photosForm.head = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: photos.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

photos.form = photosForm

/**
* @see routes/web.php:100
* @route '/animals/{animal}/weights'
*/
export const weights = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: weights.url(args, options),
    method: 'get',
})

weights.definition = {
    methods: ["get","head"],
    url: '/animals/{animal}/weights',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:100
* @route '/animals/{animal}/weights'
*/
weights.url = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { animal: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { animal: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            animal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        animal: typeof args.animal === 'object'
        ? args.animal.id
        : args.animal,
    }

    return weights.definition.url
            .replace('{animal}', parsedArgs.animal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/web.php:100
* @route '/animals/{animal}/weights'
*/
weights.get = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: weights.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:100
* @route '/animals/{animal}/weights'
*/
weights.head = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: weights.url(args, options),
    method: 'head',
})

/**
* @see routes/web.php:100
* @route '/animals/{animal}/weights'
*/
const weightsForm = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: weights.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:100
* @route '/animals/{animal}/weights'
*/
weightsForm.get = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: weights.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:100
* @route '/animals/{animal}/weights'
*/
weightsForm.head = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: weights.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

weights.form = weightsForm

/**
* @see routes/web.php:91
* @route '/animals/{animal}/weights'
*/
const weightsStore = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: weightsStore.url(args, options),
    method: 'post',
})

weightsStore.definition = {
    methods: ["post"],
    url: '/animals/{animal}/weights',
} satisfies RouteDefinition<["post"]>

/**
* @see routes/web.php:91
* @route '/animals/{animal}/weights'
*/
weightsStore.url = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { animal: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { animal: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            animal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        animal: typeof args.animal === 'object'
        ? args.animal.id
        : args.animal,
    }

    return weightsStore.definition.url
            .replace('{animal}', parsedArgs.animal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/web.php:91
* @route '/animals/{animal}/weights'
*/
weightsStore.post = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: weightsStore.url(args, options),
    method: 'post',
})

/**
* @see routes/web.php:91
* @route '/animals/{animal}/weights'
*/
const weightsStoreForm = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: weightsStore.url(args, options),
    method: 'post',
})

/**
* @see routes/web.php:91
* @route '/animals/{animal}/weights'
*/
weightsStoreForm.post = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: weightsStore.url(args, options),
    method: 'post',
})

weightsStore.form = weightsStoreForm

weights.store = weightsStore

/**
* @see routes/web.php:101
* @route '/animals/{animal}/actions'
*/
export const actions = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: actions.url(args, options),
    method: 'get',
})

actions.definition = {
    methods: ["get","head"],
    url: '/animals/{animal}/actions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:101
* @route '/animals/{animal}/actions'
*/
actions.url = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { animal: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { animal: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            animal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        animal: typeof args.animal === 'object'
        ? args.animal.id
        : args.animal,
    }

    return actions.definition.url
            .replace('{animal}', parsedArgs.animal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/web.php:101
* @route '/animals/{animal}/actions'
*/
actions.get = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: actions.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:101
* @route '/animals/{animal}/actions'
*/
actions.head = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: actions.url(args, options),
    method: 'head',
})

/**
* @see routes/web.php:101
* @route '/animals/{animal}/actions'
*/
const actionsForm = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: actions.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:101
* @route '/animals/{animal}/actions'
*/
actionsForm.get = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: actions.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:101
* @route '/animals/{animal}/actions'
*/
actionsForm.head = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: actions.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

actions.form = actionsForm

/**
* @see routes/web.php:95
* @route '/animals/{animal}/actions'
*/
const actionsStore = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: actionsStore.url(args, options),
    method: 'post',
})

actionsStore.definition = {
    methods: ["post"],
    url: '/animals/{animal}/actions',
} satisfies RouteDefinition<["post"]>

/**
* @see routes/web.php:95
* @route '/animals/{animal}/actions'
*/
actionsStore.url = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { animal: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { animal: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            animal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        animal: typeof args.animal === 'object'
        ? args.animal.id
        : args.animal,
    }

    return actionsStore.definition.url
            .replace('{animal}', parsedArgs.animal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/web.php:95
* @route '/animals/{animal}/actions'
*/
actionsStore.post = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: actionsStore.url(args, options),
    method: 'post',
})

/**
* @see routes/web.php:95
* @route '/animals/{animal}/actions'
*/
const actionsStoreForm = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: actionsStore.url(args, options),
    method: 'post',
})

/**
* @see routes/web.php:95
* @route '/animals/{animal}/actions'
*/
actionsStoreForm.post = (args: { animal: number | { id: number } } | [animal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: actionsStore.url(args, options),
    method: 'post',
})

actionsStore.form = actionsStoreForm

actions.store = actionsStore

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
    actions: Object.assign(actions, actions),
}

export default animals