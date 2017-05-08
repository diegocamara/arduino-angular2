import { WebsocketService } from './websocket.service';
import { Injectable } from '@angular/core';
import { URLSearchParams, Response } from '@angular/http';
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

        let mqttTopic: string = microcontrollerId + '/#';
        let clientSocketId: string = this.websocketService.socket.io.engine.id;
        let webSocketEvent: string = 'microcontrollerupdate';

        this.enableTopicListener(mqttTopic, clientSocketId, webSocketEvent).subscribe((response: Response) => {

          this.onSocket(webSocketEvent).subscribe((updatedInfo) => {
            observer.next(updatedInfo);
          });

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

  public enableTopicListener(mqttTopic: string, clientSocketId: string, webSocketEvent: string): Observable<any> {
    return new Observable((observer) => {

      let url = 'enabletopiclistener';

      let params: URLSearchParams = new URLSearchParams();
      params.set('mqttTopic', mqttTopic);
      params.set('clientSocketId', clientSocketId);
      params.set('webSocketEvent', webSocketEvent);

      this.httpInterceptorService.get(url, { search: params }).subscribe((response) => {
        observer.next(response);
        observer.complete();
      });

    });
  }

  public disableTopicListener(clientSocketId: string): Observable<any> {
    return new Observable((observer) => {

      let url = 'disabletopiclistener';

      let params: URLSearchParams = new URLSearchParams();
      params.set('clientSocketId', clientSocketId);

      this.httpInterceptorService.get(url, { search: params }).subscribe((response) => {
        observer.next(response);
        observer.complete();

      });

    });
  }

  public getDiagramNodes(): Observable<any> {
    return new Observable((observer) => {
      let nodes = [];

      nodes = [{
        data: { id: 'ESP8266-01', info: {} },
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
        data: { id: 'RPI-01' },
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
          data: { id: 'NodeMcuToRaspberryPi_edge', source: 'ESP8266-01', target: 'RPI-01' },
          style: {
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle'
          }
        },
        {
          data: { id: 'RaspberryPiToNodeMcu_edge', source: 'RPI-01', target: 'ESP8266-01' },
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
