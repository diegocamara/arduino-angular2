import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { IotDashboardComponent } from './pages/iot-dashboard/iot-dashboard.component';
import { routing } from 'app/app.routes';
import { ThingsDiagramComponent } from './pages/things-diagram/things-diagram.component';
import { MicroControllerService } from 'app/services/micro-controller.service';
import { ComponentSensorService } from 'app/services/component-sensor.service';
import { WebsocketService } from 'app/services/websocket.service';
import { BrokerTopicsComponent } from './pages/broker-topics/broker-topics.component';
import { HttpInterceptorService } from "app/services/http-interceptor.service";
import { BrokerTopicsService } from "app/services/broker-topics.service";
import { DynamicComponent } from './pages/dynamic/dynamic.component';
import { HtmlOutlet } from "app/directives/html-outlet";
import { NodemcuComponent } from './pages/thingscontrollers/nodemcu/nodemcu.component';
import { SpeechRecognitionService } from "app/services/speech-recognition.service";

@NgModule({
  declarations: [
    AppComponent,
    IotDashboardComponent,
    ThingsDiagramComponent,
    BrokerTopicsComponent,
    DynamicComponent,
    HtmlOutlet,
    NodemcuComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    routing
  ],
  providers: [MicroControllerService, ComponentSensorService, WebsocketService, HttpInterceptorService, BrokerTopicsService, SpeechRecognitionService],
  entryComponents:[DynamicComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
