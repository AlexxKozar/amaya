import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface RequestArgs {
    headers?: HttpHeaders | {[header: string]: string | string[]};
    params?: HttpParams | {[param: string]: string | string[]};
}

export interface ExtendedRequestArgs {
    body?: any;
    headers?: HttpHeaders | {[header: string]: string | string[]};
    params?: HttpParams | {[param: string]: string | string[]};
}
