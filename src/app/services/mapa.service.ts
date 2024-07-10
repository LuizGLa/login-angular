import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  private apiUrl = environment.backendUrl;


  constructor(private http: HttpClient) { }


  getOcorrencias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/ocorrencias');
  }

  getDashboard(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/dashboard/counts');
  }
}
