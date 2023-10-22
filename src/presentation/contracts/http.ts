export type HttpRequest<TBody = any, TParams = any> = {
    query?: TParams
    body?: TBody
}

export type HttpResponse<T = any> = {
    statusCode: number
    data: T
}
