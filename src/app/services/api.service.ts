import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api/'; // Remplacez cette URL par l'URL de votre API

  constructor(private http: HttpClient) { }

  // CREATE
  create(resource: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}create`, resource);
  }

  // READ
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // UPDATE
  update(id: number, resource: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}`, resource);
  }
  updateIndex(resource:any):Observable<any> {
    return this.http.put<any>(`${this.apiUrl}index`, resource);  
  }

  // DELETE
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}`);
  }
}
