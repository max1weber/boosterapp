import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule  } from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth'
import { FormsModule } from '@angular/forms'




import { StreamComponent } from './stream/stream.component';
import { VideoComponent } from './video/video/video.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { environment } from 'src/environments/environment';
import { ChatComponent } from './chat/chat.component';
import { GlobalErrorHandler } from './shared/global-error-handler';




declare const videojs: any;


const appRoutes: Routes = [
  
  {
    path: 'stream/:streamName',
    component: StreamComponent,
    data: { title: 'Booster Streaming Festival 2020' }
  },
  { path: '',
    redirectTo: '/stream/East',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    StreamComponent,
    VideoComponent,
    SidebarComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false}),
    AppRoutingModule,
    FormsModule,
    
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
 ],
  providers: [
    {
      provide: ErrorHandler, 
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
