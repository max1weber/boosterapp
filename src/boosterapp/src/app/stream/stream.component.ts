import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { BoosterStream } from '../models/booster-stream';
import { CommunicationService } from '../services/communication.service';



@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit, OnDestroy {


  streamsSub : Subscription;
  selectedStreamSub : Subscription;
  streams : BoosterStream[] = [];
 selectedStream : BoosterStream =null;
 private routeSub: any;
 streamName : string='';


  constructor(private commSrvice: CommunicationService,private _router: Router, private route: ActivatedRoute) {
     
    
   // console.log(this.route.snapshot.params);
   // console.log(this.route.snapshot.data);

   }


  ngOnDestroy(): void {
    this.routeSub.unsubcribe();
    this.streamsSub.unsubscribe();
    this.selectedStreamSub.unsubscribe();
  }

 
  

  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe(params=>{
      this.streamName = params["streamName"];

    });

    this.streamsSub = this.commSrvice.subscribeToStreams().subscribe(result =>{
       
      this.streams = result;
   
    });

    this.selectedStreamSub = this.commSrvice.subscribeToSelectStream().subscribe(selection => {

      if (selection !=null && selection != undefined)
      {
      this.selectedStream = selection;
      console.log("New Selected Stream " + selection.streamName);
      }

    });

    this.commSrvice.loadData();


   

                            
  }

  GetBoosterData(){

    return this.streams.sort(p=>p.order);
  }

  ChangeSelection(stream: BoosterStream)
  {
    this.commSrvice.SetSelectedStream(stream);

  }

}
