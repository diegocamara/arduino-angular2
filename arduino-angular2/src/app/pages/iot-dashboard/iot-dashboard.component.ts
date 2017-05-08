import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from "app/services/websocket.service";

declare var $: any;

@Component({
  selector: 'app-iot-dashboard',
  templateUrl: './iot-dashboard.component.html',
  styleUrls: ['./iot-dashboard.component.css']
})
export class IotDashboardComponent implements OnInit {

  mqttServerStatus: string;

  constructor(
    private router: Router,
    private websocketService: WebsocketService
  ) {
  }

  ngOnInit() {

    this.websocketService.on('onMqttServerConnectionChange', (connectionStatus) => {
      this.mqttServerStatus = connectionStatus;      
    });

    this.navigateTo('thingsDiagram');
    $("#button-collapse").sideNav({
      edge: 'right'
    });

  }

  isMqttServerOnline(){
    return this.mqttServerStatus && this.mqttServerStatus == 'ONLINE';
  }

  navigateTo(component) {
    this.router.navigate([component]);
    $("#button-collapse").sideNav('hide');
  }

}
