import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { StreamComponent } from './stream/stream.component';
import { VideoComponent } from './video/video/video.component';
import { SidebarComponent } from './sidebar/sidebar.component';



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
    
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false}),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
