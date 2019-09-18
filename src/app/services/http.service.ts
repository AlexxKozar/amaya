import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiUrl = '/api';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public sendResultData(result) {
    return this.http.post<any>(`${apiUrl}/email/result`, result);
  }

  public sendContactData(result) {
    return this.http.post<any>(`${apiUrl}/email/contacts`, result);
  }

}
