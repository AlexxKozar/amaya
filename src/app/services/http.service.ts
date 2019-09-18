import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const apiUrl = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public sendResultData(result) {
    return this.http.post<any>(`${apiUrl}/api/email/result`, result);
  }

  public sendContactData(result) {
    return this.http.post<any>(`${apiUrl}/api/email/contacts`, result);
  }

}
