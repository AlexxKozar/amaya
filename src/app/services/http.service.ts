import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:8000/api';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public sendResultData(result: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/email/result`, result, httpOptions);
  }

  public sendContactData(result) {
    return this.http.post<any>(`${apiUrl}/email/contacts`, result);
  }

}
