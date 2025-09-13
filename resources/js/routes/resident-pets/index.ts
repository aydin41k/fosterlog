import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ResidentPetController::index
* @see app/Http/Controllers/ResidentPetController.php:20
* @route '/api/resident-pets'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/resident-pets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ResidentPetController::index
* @see app/Http/Controllers/ResidentPetController.php:20
* @route '/api/resident-pets'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ResidentPetController::index
* @see app/Http/Controllers/ResidentPetController.php:20
* @route '/api/resident-pets'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ResidentPetController::index
* @see app/Http/Controllers/ResidentPetController.php:20
* @route '/api/resident-pets'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ResidentPetController::index
* @see app/Http/Controllers/ResidentPetController.php:20
* @route '/api/resident-pets'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ResidentPetController::index
* @see app/Http/Controllers/ResidentPetController.php:20
* @route '/api/resident-pets'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ResidentPetController::index
* @see app/Http/Controllers/ResidentPetController.php:20
* @route '/api/resident-pets'
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
* @see \App\Http\Controllers\ResidentPetController::store
* @see app/Http/Controllers/ResidentPetController.php:34
* @route '/api/resident-pets'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/resident-pets',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ResidentPetController::store
* @see app/Http/Controllers/ResidentPetController.php:34
* @route '/api/resident-pets'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ResidentPetController::store
* @see app/Http/Controllers/ResidentPetController.php:34
* @route '/api/resident-pets'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ResidentPetController::store
* @see app/Http/Controllers/ResidentPetController.php:34
* @route '/api/resident-pets'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ResidentPetController::store
* @see app/Http/Controllers/ResidentPetController.php:34
* @route '/api/resident-pets'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\ResidentPetController::show
* @see app/Http/Controllers/ResidentPetController.php:58
* @route '/api/resident-pets/{resident_pet}'
*/
export const show = (args: { resident_pet: string | number } | [resident_pet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/resident-pets/{resident_pet}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ResidentPetController::show
* @see app/Http/Controllers/ResidentPetController.php:58
* @route '/api/resident-pets/{resident_pet}'
*/
show.url = (args: { resident_pet: string | number } | [resident_pet: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resident_pet: args }
    }

    if (Array.isArray(args)) {
        args = {
            resident_pet: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        resident_pet: args.resident_pet,
    }

    return show.definition.url
            .replace('{resident_pet}', parsedArgs.resident_pet.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ResidentPetController::show
* @see app/Http/Controllers/ResidentPetController.php:58
* @route '/api/resident-pets/{resident_pet}'
*/
show.get = (args: { resident_pet: string | number } | [resident_pet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ResidentPetController::show
* @see app/Http/Controllers/ResidentPetController.php:58
* @route '/api/resident-pets/{resident_pet}'
*/
show.head = (args: { resident_pet: string | number } | [resident_pet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ResidentPetController::show
* @see app/Http/Controllers/ResidentPetController.php:58
* @route '/api/resident-pets/{resident_pet}'
*/
const showForm = (args: { resident_pet: string | number } | [resident_pet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ResidentPetController::show
* @see app/Http/Controllers/ResidentPetController.php:58
* @route '/api/resident-pets/{resident_pet}'
*/
showForm.get = (args: { resident_pet: string | number } | [resident_pet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ResidentPetController::show
* @see app/Http/Controllers/ResidentPetController.php:58
* @route '/api/resident-pets/{resident_pet}'
*/
showForm.head = (args: { resident_pet: string | number } | [resident_pet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ResidentPetController::update
* @see app/Http/Controllers/ResidentPetController.php:70
* @route '/api/resident-pets/{resident_pet}'
*/
export const update = (args: { resident_pet: string | number } | [resident_pet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/resident-pets/{resident_pet}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ResidentPetController::update
* @see app/Http/Controllers/ResidentPetController.php:70
* @route '/api/resident-pets/{resident_pet}'
*/
update.url = (args: { resident_pet: string | number } | [resident_pet: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resident_pet: args }
    }

    if (Array.isArray(args)) {
        args = {
            resident_pet: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        resident_pet: args.resident_pet,
    }

    return update.definition.url
            .replace('{resident_pet}', parsedArgs.resident_pet.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ResidentPetController::update
* @see app/Http/Controllers/ResidentPetController.php:70
* @route '/api/resident-pets/{resident_pet}'
*/
update.put = (args: { resident_pet: string | number } | [resident_pet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ResidentPetController::update
* @see app/Http/Controllers/ResidentPetController.php:70
* @route '/api/resident-pets/{resident_pet}'
*/
update.patch = (args: { resident_pet: string | number } | [resident_pet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ResidentPetController::update
* @see app/Http/Controllers/ResidentPetController.php:70
* @route '/api/resident-pets/{resident_pet}'
*/
const updateForm = (args: { resident_pet: string | number } | [resident_pet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ResidentPetController::update
* @see app/Http/Controllers/ResidentPetController.php:70
* @route '/api/resident-pets/{resident_pet}'
*/
updateForm.put = (args: { resident_pet: string | number } | [resident_pet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ResidentPetController::update
* @see app/Http/Controllers/ResidentPetController.php:70
* @route '/api/resident-pets/{resident_pet}'
*/
updateForm.patch = (args: { resident_pet: string | number } | [resident_pet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\ResidentPetController::destroy
* @see app/Http/Controllers/ResidentPetController.php:91
* @route '/api/resident-pets/{resident_pet}'
*/
export const destroy = (args: { resident_pet: string | number } | [resident_pet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/resident-pets/{resident_pet}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ResidentPetController::destroy
* @see app/Http/Controllers/ResidentPetController.php:91
* @route '/api/resident-pets/{resident_pet}'
*/
destroy.url = (args: { resident_pet: string | number } | [resident_pet: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resident_pet: args }
    }

    if (Array.isArray(args)) {
        args = {
            resident_pet: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        resident_pet: args.resident_pet,
    }

    return destroy.definition.url
            .replace('{resident_pet}', parsedArgs.resident_pet.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ResidentPetController::destroy
* @see app/Http/Controllers/ResidentPetController.php:91
* @route '/api/resident-pets/{resident_pet}'
*/
destroy.delete = (args: { resident_pet: string | number } | [resident_pet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ResidentPetController::destroy
* @see app/Http/Controllers/ResidentPetController.php:91
* @route '/api/resident-pets/{resident_pet}'
*/
const destroyForm = (args: { resident_pet: string | number } | [resident_pet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ResidentPetController::destroy
* @see app/Http/Controllers/ResidentPetController.php:91
* @route '/api/resident-pets/{resident_pet}'
*/
destroyForm.delete = (args: { resident_pet: string | number } | [resident_pet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const residentPets = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default residentPets