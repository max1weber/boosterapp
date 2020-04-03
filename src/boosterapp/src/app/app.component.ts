import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApplicationInsightService } from './services/application-insight.service';

//declare gives Angular app access to ga function
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'boosterapp';

  constructor(public router: Router, private appinsights : ApplicationInsightService){

    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){

        
        // gtag('config', 'UA-96184893-1', {'page_path': event.urlAfterRedirects});
       // this.appinsights.logPageView(event.url, event.urlAfterRedirects);
      }
    })
  }
  
}
