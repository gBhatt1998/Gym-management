import { Injectable } from '@angular/core';
import { environment } from '../components/models/environment';
import { HttpClient } from '@angular/common/http';
import { trainerDetail } from '../components/models/trainerdetail';

@Injectable({
  providedIn: 'root'
})
export class TrainerdetailsService {
    trainerUrl=environment.trainerUrl;
  constructor(private http:HttpClient) { }

   getTrainerDetails() {
      return this.http.get<trainerDetail[]>(`${this.trainerUrl}`)
    }
}
