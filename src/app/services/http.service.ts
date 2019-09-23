import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOMAIN_NAME } from '@constants/domain-name.constant';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = DOMAIN_NAME + '/api';

  constructor(private http: HttpClient) { }

  public sendResultData(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/email/result`, body, httpOptions);
  }

  public sendContactData(body) {
    return this.http.post<any>(`${this.apiUrl}/email/contacts`, body);
  }

}
