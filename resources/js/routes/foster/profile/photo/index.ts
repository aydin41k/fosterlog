import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProfileController::upload
* @see app/Http/Controllers/ProfileController.php:33
* @route '/user/profile/photo'
*/
export const upload = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

upload.definition = {
    methods: ["post"],
    url: '/user/profile/photo',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProfileController::upload
* @see app/Http/Controllers/ProfileController.php:33
* @route '/user/profile/photo'
*/
upload.url = (options?: RouteQueryOptions) => {
    return upload.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProfileController::upload
* @see app/Http/Controllers/ProfileController.php:33
* @route '/user/profile/photo'
*/
upload.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProfileController::upload
* @see app/Http/Controllers/ProfileController.php:33
* @route '/user/profile/photo'
*/
const uploadForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: upload.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProfileController::upload
* @see app/Http/Controllers/ProfileController.php:33
* @route '/user/profile/photo'
*/
uploadForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: upload.url(options),
    method: 'post',
})

upload.form = uploadForm

const photo = {
    upload: Object.assign(upload, upload),
}

export default photo