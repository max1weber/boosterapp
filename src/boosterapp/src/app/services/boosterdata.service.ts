import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BoosterData } from '../models/booster-data';

@Injectable({
  providedIn: 'root'
})
export class BoosterdataService {
  constructor(private http: HttpClient) { }


  public getBoosterData(): Observable<BoosterData> {
    return this.http.get<BoosterData>("./assets/BoosterStreamsCopy.json");
  }

  
}
