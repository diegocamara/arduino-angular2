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
      
      this.httpInterceptorService.get(url, { search: params }).subscribe((microcontrollerInfo) => {

        observer.next(microcontrollerInfo.json());

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

  public getDiagramNodes(): Observable<any> {
    return new Observable((observer) => {

      let nodes = [];

      nodes = [{
        data: { id: 'NodeMcu', info: {} },
        onClickComplete: function (tbodyComponent) {

        },
        html: `
        
        <h4 id="node-modal-title">{{componentTitle}}</h4>
        <table id="modules-table">
            <thead>
                <tr>
                    <th>
                        Module description
                    </th>
                </tr>
            </thead>
            <tbody>
                 <tr>
            <td>Bedroom light</td>
            <td class="right-align">
              <div class="switch">
              <label>
                Off
                <input type="checkbox">
                <span class="lever"></span>
                On
              </label>
            </div>
            </td>             
          </tr>
          <tr>
            <td>Bathroom light</td>
            <td class="right-align">
              <div class="switch">
              <label>
                Off
                <input type="checkbox">
                <span class="lever"></span>
                On
              </label>
            </div>
            </td>             
          </tr>
          <tr>
            <td>Temperature sensor</td>
            <td class="right-align">
              <i class="fa fa-thermometer-three-quarters fa-2x" aria-hidden="true"></i>
            </td>
          </tr>
          <tr>
            <td>Light Intensity</td>
            <td class="right-align">
              <i class="fa fa-lightbulb-o fa-2x" aria-hidden="true"></i>              
            </td>
          </tr>
            </tbody>
        </table>        
        `,
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
        onClickComplete: function (tbodyComponent) {

        },
        html: `<div></div>`,
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
