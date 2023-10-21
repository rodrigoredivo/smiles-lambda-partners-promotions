export interface HttpRequest<TBody, TParams> {
    query?: TParams
    body?: TBody
}

export interface HttpResponse<TBody> {
    statusCode: number
    body: TBody
}
