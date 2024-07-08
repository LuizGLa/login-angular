import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  private apiUrl = environment.backendUrl;


  constructor(private http: HttpClient) { }


  getOcorrencias(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.get<any[]>(this.apiUrl + '/ocorrencias', { headers });
  }
}
