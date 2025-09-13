import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'

/**
* @see routes/web.php:92
* @route '/animal-weights/{animalWeight}'
*/
export const destroy = (args: { animalWeight: number | { id: number } } | [animalWeight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/animal-weights/{animalWeight}',
} satisfies RouteDefinition<["delete"]>

/**
* @see routes/web.php:92
* @route '/animal-weights/{animalWeight}'
*/
destroy.url = (args: { animalWeight: number | { id: number } } | [animalWeight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { animalWeight: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { animalWeight: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            animalWeight: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        animalWeight: typeof args.animalWeight === 'object'
        ? args.animalWeight.id
        : args.animalWeight,
    }

    return destroy.definition.url
            .replace('{animalWeight}', parsedArgs.animalWeight.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/web.php:92
* @route '/animal-weights/{animalWeight}'
*/
destroy.delete = (args: { animalWeight: number | { id: number } } | [animalWeight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see routes/web.php:92
* @route '/animal-weights/{animalWeight}'
*/
const destroyForm = (args: { animalWeight: number | { id: number } } | [animalWeight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see routes/web.php:92
* @route '/animal-weights/{animalWeight}'
*/
destroyForm.delete = (args: { animalWeight: number | { id: number } } | [animalWeight: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const animalWeights = {
    destroy: Object.assign(destroy, destroy),
}

export default animalWeights
