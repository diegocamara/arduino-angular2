import { WebsocketService } from './websocket.service';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ComponentSensorService } from "app/services/component-sensor.service";
import { Observable } from "rxjs/Observable";
import { HttpInterceptorService } from "app/services/http-interceptor.service";

declare var $: any;

@Injectable()
export class MicroControllerService {

  constructor(
    private componentSensorService: ComponentSensorService,
    private httpInterceptorService: HttpInterceptorService,
    private websocketService: WebsocketService
  ) {

  }

  public listenMicrocontrollerInformations(microcontrollerId: string): Observable<any> {

    return new Observable((observer) => {

      let url = 'getmicrocontrollerinfo';

      let params: URLSearchParams = new URLSearchParams();
      params.set('microcontrollerId', microcontrollerId);

      this.httpInterceptorService.get(url, { search: params }).subscribe((microcontrollerInfo: any) => {

        if (microcontrollerInfo._body && microcontrollerInfo._body != '') {
          observer.next(microcontrollerInfo.json());
        }

        let mqttTopic: string;
        let clientSocketId: string;

        this.enableTopicWebsocket(mqttTopic, clientSocketId).subscribe(() => {

        });

        this.onSocket('microcontrollerupdate').subscribe((updatedInfo) => {
          observer.next(updatedInfo);
        });

      });

    });

  }

  public onSocket(socketEvent: String): Observable<any> {
    return new Observable((observer) => {

      this.websocketService.socket.on(socketEvent, (data) => {

        observer.next(data);

      });

    });
  }

  public enableTopicWebsocket(mqttTopic: string, clientSocketId: string): Observable<any> {
    return new Observable((observer) => {

      let url = 'enabletopicwebsocket';

      let params: URLSearchParams = new URLSearchParams();
      params.set('mqttTopic', mqttTopic);
      params.set('clientSocketId', clientSocketId);

      this.httpInterceptorService.get(url, { search: params }).subscribe(() => {

        observer.complete();

      });

    });
  }

  public getDiagramNodes(): Observable<any> {
    return new Observable((observer) => {

      let nodes = [];

      nodes = [{
        data: { id: 'NodeMcu', info: {} },
        componentPath: 'thingsDiagram/nodemcu',
        style: {
          'shape': 'rectangle',
          'width': '330',
          'height': '411',
          'background-fit': 'cover',
          'background-image': 'assets/images/esp12f.png'
        }
      },
      {
        data: { id: 'RaspberryPi' },
        componentPath: 'thingsDiagram/raspberrypi',
        style: {
          'shape': 'rectangle',
          'width': '924',
          'height': '690',
          'background-image': 'assets/images/raspberrypi3.png'
        }
      }
      ]

      observer.next(nodes);
      observer.complete();

    }
    );
  }

  getDiagramEdges(): Observable<any> {

    return new Observable((observer) => {

      let edges = [
        {
          data: { id: 'NodeMcuToRaspberryPi_edge', source: 'NodeMcu', target: 'RaspberryPi' },
          style: {
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle'
          }
        },
        {
          data: { id: 'RaspberryPiToNodeMcu_edge', source: 'RaspberryPi', target: 'NodeMcu' },
          style: {
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle'
          }
        }

      ];

      observer.next(edges);
      observer.complete();

    });

  }

}
