import { ErrorHandler, Injectable} from '@angular/core';
import { ApplicationInsightService } from '../services/application-insight.service';
import { IExceptionTelemetry } from '@microsoft/applicationinsights-web';



@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private appinsights: ApplicationInsightService) { }
  handleError(error) {
    
   let errorhandled: IExceptionTelemetry = { 
        id : "GlobalErrorHandler",
       
        
        severityLevel : 4,
        exception : new Error(error)
        }

        this.appinsights.trackException(errorhandled);
     // IMPORTANT: Rethrow the error otherwise it gets swallowed
     throw error;
  }
  
}