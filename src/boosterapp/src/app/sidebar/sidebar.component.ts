import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  Subscription } from 'rxjs';

import { BoosterStream } from '../models/booster-stream';
import { CommunicationService } from '../services/communication.service';
import { GoogleAnalyticsService } from '../services/google-analytics.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

 
  streamsSub : Subscription;
  selectedStreamSub : Subscription;
  routeSub : Subscription;
  streams : BoosterStream[] = [];
 selectedStream : BoosterStream =null;
  showSideMenu = true;
  
  constructor( private commSrvice: CommunicationService,private _router: Router, private route: ActivatedRoute, private analytics: GoogleAnalyticsService) { }
  
  
  ngOnDestroy(): void {
    this.streamsSub.unsubscribe();
    this.selectedStreamSub.unsubscribe();
  }

  ngOnInit(): void {
    

    


    this.streamsSub = this.commSrvice.subscribeToStreams().subscribe(result =>{
       
          this.streams = result;
       
    });

    this.selectedStreamSub = this.commSrvice.subscribeToSelectStream().subscribe(selection => {

      if (selection !=null && selection != undefined)
      {
      this.selectedStream = selection;
     
      }

    });

    this.commSrvice.loadData();

    
    

   
  }

  selectStream(stream:BoosterStream)
  {

    console.log("Selected Stream: " + stream.streamName);
    //this.analytics.eventEmitter("sideBar.selectStream", "Stream", "Select Stream" , "Value", stream.order);
   
    this.commSrvice.SetSelectedStream(stream);
    this._router.navigateByUrl('/stream/' + stream.streamName);
    

  }
  getStreamsAsync(){
    
    return this.streams;
  }


  toggleMenu(){
   
   this.showSideMenu = !this.showSideMenu;
  }
 

  getSideMenuWidth()
  {
   if (this.showSideMenu)
    {
      return 250;
    } 
   else
    {
     return 0;
    }

  }

  getMainMargingLeft()
  {

    if (this.showSideMenu)
    {
      return 250;
    } 
   else
    {
     return 0;
    }
  }
}
