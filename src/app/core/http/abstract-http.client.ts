import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOMAIN_NAME } from '@constants/domain-name.constant';
import { Observable } from 'rxjs';

import { RequestArgs, ExtendedRequestArgs } from '@interfaces/request-args.interface';
import { HttpConfig } from '@interfaces/http-config.interface';

@Injectable({
  providedIn: 'root',
})
export class AbstractHttpClient {

    public config: HttpConfig;
    private domainName: string;

    constructor(private httpClient: HttpClient) {
        this.domainName = DOMAIN_NAME;
    }

    getAll<U>(requestArgs?: RequestArgs): Observable<U> {
        return this.sendRequest<U>('get', this.config.url, requestArgs);
    }

    get<U>(id: number | string, requestArgs?: RequestArgs): Observable<U> {
        return this.sendRequest<U>('get', `${this.config.url}/${id}`, requestArgs);
    }

    post<T, U>(body: T | null, requestArgs?: RequestArgs): Observable<U> {
        return this.sendRequest<U>('post', this.config.url, { ...requestArgs, body });
    }

    patch<T, U>(id: number | string, body: T | null, requestArgs?: RequestArgs): Observable<U> {
        return this.sendRequest<U>('patch', `${this.config.url}/${id}`, { ...requestArgs, body });
    }

    put<T, U>(id: number | string, body: T | null, requestArgs?: RequestArgs): Observable<U> {
        return this.sendRequest<U>('put', `${this.config.url}/${id}`, { ...requestArgs, body });
    }

    delete<U>(id: number | string, requestArgs?: RequestArgs): Observable<any> {
        return this.sendRequest<U>('delete', `${this.config.url}/${id}`, requestArgs);
    }

    sendRequest<U>(method: string, url: string, requestArgs?: ExtendedRequestArgs): Observable<U> {
        return this.httpClient.request<U>(
            method,
            `${this.domainName}/${url}`,
            this.config.requestArgs ? {...requestArgs, ...this.config.requestArgs} : requestArgs
        );
    }
}
