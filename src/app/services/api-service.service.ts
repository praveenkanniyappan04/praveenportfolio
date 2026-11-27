import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
private apibaseUrls = environment.baseUrl
    constructor(private http: HttpClient) {}
// ============Contact-Form==========
formData(data:any): Observable<any> {
   return this.http.post(`https://6b07c79258419b87a43897fc.mockapi.io/contact/contact-form`, data);
}



}
