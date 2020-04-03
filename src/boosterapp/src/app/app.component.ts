import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApplicationInsightService } from './services/application-insight.service';
import { GoogleAnalyticsService } from './services/google-analytics.service';

//declare gives Angular app access to ga function
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'boosterapp';

  constructor(public router: Router, private appinsights : ApplicationInsightService, private analytics: GoogleAnalyticsService){

    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){

        
        // gtag('config', 'UA-96184893-1', {'page_path': event.urlAfterRedirects});

        analytics.trackPage(event.url, event.urlAfterRedirects);
       // this.appinsights.logPageView(event.url, event.urlAfterRedirects);
      }
    })
  }
  
}
