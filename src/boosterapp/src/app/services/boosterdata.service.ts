import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment'

import { BoosterData } from '../models/booster-data';

@Injectable({
  providedIn: 'root'
})
export class BoosterdataService {
  constructor(private http: HttpClient) { }


  public getBoosterData(): Observable<BoosterData> {
    var boosterdatafile = environment.boosterdatafile;
    console.log("Stream Source: " + boosterdatafile);
    return this.http.get<BoosterData>("./assets/" + boosterdatafile);
  }

  
}
