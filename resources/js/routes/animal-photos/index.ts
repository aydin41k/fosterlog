import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'

/**
* @see routes/web.php:87
* @route '/animal-photos/{animalPhoto}'
*/
export const update = (args: { animalPhoto: number | { id: number } } | [animalPhoto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/animal-photos/{animalPhoto}',
} satisfies RouteDefinition<["put"]>

/**
* @see routes/web.php:87
* @route '/animal-photos/{animalPhoto}'
*/
update.url = (args: { animalPhoto: number | { id: number } } | [animalPhoto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { animalPhoto: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { animalPhoto: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            animalPhoto: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        animalPhoto: typeof args.animalPhoto === 'object'
        ? args.animalPhoto.id
        : args.animalPhoto,
    }

    return update.definition.url
            .replace('{animalPhoto}', parsedArgs.animalPhoto.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/web.php:87
* @route '/animal-photos/{animalPhoto}'
*/
update.put = (args: { animalPhoto: number | { id: number } } | [animalPhoto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see routes/web.php:87
* @route '/animal-photos/{animalPhoto}'
*/
const updateForm = (args: { animalPhoto: number | { id: number } } | [animalPhoto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see routes/web.php:87
* @route '/animal-photos/{animalPhoto}'
*/
updateForm.put = (args: { animalPhoto: number | { id: number } } | [animalPhoto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see routes/web.php:88
* @route '/animal-photos/{animalPhoto}'
*/
export const destroy = (args: { animalPhoto: number | { id: number } } | [animalPhoto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/animal-photos/{animalPhoto}',
} satisfies RouteDefinition<["delete"]>

/**
* @see routes/web.php:88
* @route '/animal-photos/{animalPhoto}'
*/
destroy.url = (args: { animalPhoto: number | { id: number } } | [animalPhoto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { animalPhoto: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { animalPhoto: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            animalPhoto: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        animalPhoto: typeof args.animalPhoto === 'object'
        ? args.animalPhoto.id
        : args.animalPhoto,
    }

    return destroy.definition.url
            .replace('{animalPhoto}', parsedArgs.animalPhoto.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/web.php:88
* @route '/animal-photos/{animalPhoto}'
*/
destroy.delete = (args: { animalPhoto: number | { id: number } } | [animalPhoto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see routes/web.php:88
* @route '/animal-photos/{animalPhoto}'
*/
const destroyForm = (args: { animalPhoto: number | { id: number } } | [animalPhoto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see routes/web.php:88
* @route '/animal-photos/{animalPhoto}'
*/
destroyForm.delete = (args: { animalPhoto: number | { id: number } } | [animalPhoto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const animalPhotos = {
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default animalPhotos
