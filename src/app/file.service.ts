import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiResponse, Nfe} from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private serverUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  upload(file: File): Observable<ApiResponse> {
    const data = new FormData();
    data.append('file', file);
    return this.http.post<ApiResponse>(`${this.serverUrl}/upload`, data);
  }

  getAll(): Observable<Nfe[]> {
    return this.http.get<Nfe[]>(`${this.serverUrl}/files`);
  }
}
