import { HttpResponse, HttpRequest } from "./http";

export interface Controller {
    handle: (Request: HttpRequest) => Promise<HttpResponse>
}