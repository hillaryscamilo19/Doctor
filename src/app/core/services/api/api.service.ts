import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../assets/enviroment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api = environment.apiUrl
  constructor(private http: HttpClient) {}

  /**
   * Método genérico para realizar peticiones GET
   */
  get<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<T>(`${this.api}/${endpoint}`, { params: httpParams });
  }

  /**
   * Método genérico para realizar peticiones POST
   */
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.api}/${endpoint}`, body);
  }

  /**
   * Método genérico para realizar peticiones PATCH
   */
  patch<T>(endpoint: string, body: any): Observable<T> {
    return this.http.patch<T>(`${this.api}/${endpoint}`, body);
  }

  /**
   * Método genérico para realizar peticiones DELETE
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.api}/${endpoint}`);
  }
}
