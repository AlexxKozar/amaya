import { Injectable } from '@angular/core';
import { HttpConfig } from '@interfaces/http-config.interface';
import { repositoriesConfig } from '../repositories.config';
import { AbstractHttpClient } from '../abstract-http.client';

@Injectable({
    providedIn: 'root',
})
export class CalculatorRepository extends AbstractHttpClient {
    config: HttpConfig = repositoriesConfig.calculator;
}
