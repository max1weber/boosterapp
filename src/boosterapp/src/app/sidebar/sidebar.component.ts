import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

 
  
  showSideMenu = true;
  constructor() { }

  ngOnInit(): void {


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
