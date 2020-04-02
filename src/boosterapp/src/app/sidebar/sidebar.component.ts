import { Component, OnInit } from '@angular/core';
import {  Subscription } from 'rxjs';

import { BoosterStream } from '../models/booster-stream';
import { CommunicationService } from '../services/communication.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

 
  streamsSub : Subscription;
  selectedStreamSub : Subscription;
  streams : BoosterStream[] = [];
 selectedStream : BoosterStream =null;
  showSideMenu = true;
  constructor( private commSrvice: CommunicationService) { }

  ngOnInit(): void {
    
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

  selectStream(stream:BoosterStream)
  {

    console.log("Selected Stream: " + stream.streamName);
    this.commSrvice.SetSelectedStream(stream);

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
