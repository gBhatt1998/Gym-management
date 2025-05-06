import { Injectable } from '@angular/core';
import { environment } from '../components/models/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bmiresponse } from '../components/models/bmiresponse';

@Injectable({
  providedIn: 'root'
})
export class BmiService {

  private apiUrl = 'https://api.apiverve.com/v1/bmicalculator';
  private apiKey = environment.apiKey; 


  constructor(private http: HttpClient) { }

  getBmi(weight: number, height: number, unit: 'metric'): Observable<Bmiresponse> {
    const url = `${this.apiUrl}?weight=${weight}&height=${height}&unit=${unit}`;
    
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey,
      'Accept': 'application/json'
    });

    return this.http.get<Bmiresponse>(url, { headers });
  }
}
