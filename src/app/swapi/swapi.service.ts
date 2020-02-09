import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private http: HttpClient) { }

  getData<T>(path: string, isFullUrl: boolean) {
    const url = isFullUrl ? path : `https://swapi.co/api${path}`;
    return this.http.get<T>(url);
  }
}
