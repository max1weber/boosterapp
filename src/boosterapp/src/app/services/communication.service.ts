import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';



import { BoosterStream } from '../models/booster-stream';
import { BoosterData } from '../models/booster-data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CommunicationService implements OnInit, OnDestroy {

  


  private _baseStreams = new BehaviorSubject<BoosterStream[]>([]);
  private dataStore : {streams : BoosterStream[]} =  {streams:[] }; //// store data in memory
  
  private _selectedStream = new BehaviorSubject<BoosterStream>(null);


  constructor( private httpClient : HttpClient) {
   
    

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
   
    if (this.dataStore.streams.length >0)
    {
      this.dataStore.streams.forEach((stream,index) =>{
        if (stream.id == streamItem.id)
        {
          stream.IsSelected == true;
          this._selectedStream.next(streamItem);
          console.log("Selected : " + streamItem.streamName );
        }
        else{
          console.log("Unselected : " + stream.streamName );
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
      console.log("SetSelectedStreamByName");
      let nextstream =this.dataStore.streams.find(p=>p.streamName==streamName);
      this.SetSelectedStream(nextstream);
        
    }
  }

  public loadData() {
    var boosterdatafile = environment.boosterdatafile;
    let numberofitems = this.dataStore.streams.length;
    console.log("MemoryItems :" +numberofitems.toString());
    if (numberofitems ==0)
    {
      console.log("Stream Source Fetching: " + boosterdatafile);
      this.httpClient.get<BoosterData>("./assets/" + boosterdatafile).subscribe(result => {
        if (result !=null && result != undefined)
        {
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
