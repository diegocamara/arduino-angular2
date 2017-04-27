import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from "app/services/websocket.service";

@Component({
  selector: 'app-iot-dashboard',
  templateUrl: './iot-dashboard.component.html',
  styleUrls: ['./iot-dashboard.component.css']
})
export class IotDashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private websocketService: WebsocketService
  ) {
  }

  ngOnInit() {
    this.navigateTo('thingsDiagram');
  }

  navigateTo(component) {
    this.router.navigate([component]);
  }

}
