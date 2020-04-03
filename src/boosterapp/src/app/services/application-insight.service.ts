import { Injectable, OnInit } from '@angular/core';
import { ApplicationInsights, IExceptionTelemetry, IEventTelemetry } from '@microsoft/applicationinsights-web';
import { ActivatedRouteSnapshot, ResolveEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationInsightService {

  private routerSubscription: Subscription;

  private appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: environment.ApplicationInsights
    }
  });
  constructor(private router: Router) {
    this.appInsights.loadAppInsights();
    this.routerSubscription = this.router.events.pipe(filter(event => event instanceof ResolveEnd)).subscribe((event: ResolveEnd) => {
      const activatedComponent = this.getActivatedComponent(event.state.root);
      if (activatedComponent) {
        this.logPageView("${activatedComponent.name} ${this.getRouteTemplate(event.state.root)}", event.urlAfterRedirects);
      }
    });
  }

  setUserId(userId: string) {
    this.appInsights.setAuthenticatedUserContext(userId);
  }

  public logError(name: string, error: Error, properties?: { [key: string]: string }, measurements?: { [key: string]: number }) {
    let props = this.AddGlobalProperties(properties);
    let telemetry : IExceptionTelemetry = {
        id: name,
        error : error,
        exception : error,
        properties : props,
        measurements : measurements,
        severityLevel :4,

    }
                           
    this.trackException(telemetry);
}
public logEvent(name: string, properties?: { [key: string]: string }, measurements?: { [key: string]: number }) {
  let telemetry : IEventTelemetry = {
    name : name,
    properties : properties,
    measurements : measurements
   

}
  this.trackEvent(telemetry);
}

trackEvent(event : IEventTelemetry) {
  this.appInsights.trackEvent(event);
}
  trackException(error : IExceptionTelemetry) {
    this.appInsights.trackException(error);
  }
  clearUserId() {
    this.appInsights.clearAuthenticatedUserContext();
  }

  logPageView(name?: string, uri?: string) {
    this.appInsights.trackPageView({ name, uri });
  }

  private getActivatedComponent(snapshot: ActivatedRouteSnapshot): any {
    if (snapshot.firstChild) {
      return this.getActivatedComponent(snapshot.firstChild);
    }

    return snapshot.component;
  }

  private AddGlobalProperties(properties?: { [key: string]: string }): { [key: string]: string } {
    if (!properties) {
        properties = {};
    }

    //add your custom properties such as app version

    return properties;
  }
  private getRouteTemplate(snapshot: ActivatedRouteSnapshot): string {
    let path = '';
    if (snapshot.routeConfig) {
      path += snapshot.routeConfig.path;
    }

    if (snapshot.firstChild) {
      return path + this.getRouteTemplate(snapshot.firstChild);
    }

    return path;
  }



}
