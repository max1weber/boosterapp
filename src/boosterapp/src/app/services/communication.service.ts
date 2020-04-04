import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';



import { BoosterStream } from '../models/booster-stream';
import { BoosterData } from '../models/booster-data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApplicationInsightService } from './application-insight.service';



@Injectable({
  providedIn: 'root'
})
export class CommunicationService implements OnInit, OnDestroy {

  
  basicStream: BoosterStream = new BoosterStream ("zYk8RzTarIbSgApD00ASATX1fMfAs8sJq2efvNBNNO1Y", "East",   true,  "22c03022-c31b-f098-3f93-4b72de758c6c",  "https://stream.mux.com/EaUOoslt02Djmf2qecizYuH4WPZG02CxagSltaDPDER4g.m3u8", 0);
 

  private _baseStreams = new BehaviorSubject<BoosterStream[]>([]);
  private dataStore : {streams : BoosterStream[]} =  {streams:[] }; //// store data in memory
  
  private _selectedStream = new BehaviorSubject<BoosterStream>(this.basicStream);


  constructor( private httpClient : HttpClient, private appInsights: ApplicationInsightService) {
   
    

   }

  ngOnDestroy(): void {  }


  ngOnInit(): void {
    
    this.loadData();
  }

  

  subscribeToSelectStream()
  {  
    return this._selectedStream.asObservable();       
  }
  
  subscribeToStreams()
  {  
    return this._baseStreams.asObservable();       
  }
  
  
  
  public SetSelectedStream(streamItem: BoosterStream)
  {
    let  prop: {[key: string]: string} = {"newStream": streamItem.streamName };
    this.appInsights.logEvent("StreamSelected", prop );
    if (this.dataStore.streams.length >0)
    {
      this.dataStore.streams.forEach((stream,index) =>{
        if (stream.id == streamItem.id)
        {
          stream.IsSelected == true;
          this._selectedStream.next(streamItem);
          
        }
        else{
         
          stream.IsSelected == false;
        }
       
      });
      this._baseStreams.next(Object.assign({}, this.dataStore).streams);
    }
  }

  public SetSelectedStreamByName(streamName: string)
  {
   
   
    if (this.dataStore.streams.length >0)
    {
      let msg = "SetSelectedStreamByRouteName: " + streamName
      console.log(msg);
      this.appInsights.logEvent(msg);
      let nextstream =this.dataStore.streams.find(p=>p.streamName==streamName);
      this.SetSelectedStream(nextstream);
        
    }
  }

  public loadData() {
    var boosterdatafile = environment.boosterdatafile;
    let numberofitems = this.dataStore.streams.length;
   
    if (numberofitems ==0)
    {
      this.httpClient.get<BoosterData>("./assets/" + boosterdatafile).subscribe(result => {
        if (result !=null && result != undefined)
        {
          this.appInsights.logEvent("SourcesFetched");
          this.dataStore.streams = result.streams;
          this._baseStreams.next(Object.assign({}, this.dataStore).streams);
          let _selectedStreamItem = this.dataStore.streams.find(p=>p.IsSelected == true);
            this._selectedStream.next(_selectedStreamItem);

        }},
        error => console.log('Couldnot load Streams from ' + environment.boosterdatafile)
      );
    }
  }

}
