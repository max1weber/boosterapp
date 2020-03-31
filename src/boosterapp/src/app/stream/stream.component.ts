import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {VideoComponent} from '../video/video/video.component';
import { BoosterStream } from '../models/booster-stream';
import { BoosterdataService } from '../services/boosterdata.service';


@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit, OnDestroy {

  constructor(private streamService: BoosterdataService,private _router: Router, private route: ActivatedRoute) {
     

   // console.log(this.route.snapshot.params);
   // console.log(this.route.snapshot.data);

   }


  ngOnDestroy(): void {
    this.routeSub.unsubcribe();
  }

  streamName :string;
  selectedStream :BoosterStream;
  boosterdata:BoosterStream[];
  private routeSub: any;

  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe(params=>{
      this.streamName = params["streamName"];

    });
    this.streamService.getBoosterData()
                          .subscribe(
                            data => {
                                this.boosterdata = data.streams; 
                                console.log("From Route: " + this.streamName);
                                this.selectedStream = this.boosterdata.find( p=> p.streamName == this.streamName);
                                this.selectedStream.IsSelected =true;
                                console.log(this.selectedStream);
                            });
  }

  GetBoosterData(){

    return this.boosterdata.sort(p=>p.order);
  }

  ChangeSelection(stream: BoosterStream)
  {
    let index =   this.boosterdata.findIndex(p=> p.id == this.selectedStream.id);

     console.log("Current Index: " + index);
    this.boosterdata[index].IsSelected = false;

    console.log("selected stream " + stream.streamName);

    let index2 =   this.boosterdata.findIndex(p=> p.id == stream.id);
           
    this.boosterdata[index2].IsSelected = true;

    console.log("New Index: " + index2);

    console.log(this.boosterdata);

    this.selectedStream = this.boosterdata.find(p=>p.IsSelected == true); 

    this._router.navigateByUrl("/stream/" + this.selectedStream.streamName);

  }

}
