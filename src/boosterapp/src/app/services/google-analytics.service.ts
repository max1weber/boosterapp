import { Injectable } from '@angular/core';
import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'
import { environment } from 'src/environments/environment';




const analytics = Analytics({
  app: 'Booster Online Festival',
  version: 100,
  plugins: [
    googleAnalytics({
      trackingId: environment.GoogleAnalytics
    })
  ]
})

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() { }

  trackPage(name:string, uri: string)
  {
    analytics.page({
      title: name,
      url: uri
    })
  }

  public eventEmitter( 
    eventName: string, 
    eventCategory: string, 
    eventAction: string, 
    eventLabel: string = null,  
    eventValue: number = null ){ 
      analytics.track(eventName, eventCategory, eventAction, eventLabel, eventValue);
    }
}
