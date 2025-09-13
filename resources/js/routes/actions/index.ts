import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'

/**
* @see routes/web.php:96
* @route '/actions/{action}'
*/
export const destroy = (args: { action: number | { id: number } } | [action: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/actions/{action}',
} satisfies RouteDefinition<["delete"]>

/**
* @see routes/web.php:96
* @route '/actions/{action}'
*/
destroy.url = (args: { action: number | { id: number } } | [action: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { action: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { action: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            action: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        action: typeof args.action === 'object'
        ? args.action.id
        : args.action,
    }

    return destroy.definition.url
            .replace('{action}', parsedArgs.action.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/web.php:96
* @route '/actions/{action}'
*/
destroy.delete = (args: { action: number | { id: number } } | [action: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see routes/web.php:96
* @route '/actions/{action}'
*/
const destroyForm = (args: { action: number | { id: number } } | [action: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see routes/web.php:96
* @route '/actions/{action}'
*/
destroyForm.delete = (args: { action: number | { id: number } } | [action: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const actions = {
    destroy: Object.assign(destroy, destroy),
}

export default actions
