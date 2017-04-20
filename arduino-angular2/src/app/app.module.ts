import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { IotDashboardComponent } from './pages/iot-dashboard/iot-dashboard.component';
import { routing } from "app/app.routes";
import { ThingsDiagramComponent } from './pages/things-diagram/things-diagram.component';
import { MicroControllerService } from "app/services/micro-controller.service";
import { ComponentSensorService } from "app/services/component-sensor.service";

@NgModule({
  declarations: [
    AppComponent,
    IotDashboardComponent,
    ThingsDiagramComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    routing
  ],
  providers: [MicroControllerService, ComponentSensorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
