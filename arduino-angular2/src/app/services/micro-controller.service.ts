import { Injectable } from '@angular/core';
import { ComponentSensorService } from "app/services/component-sensor.service";
import { Observable } from "rxjs/Observable";

declare var $: any;

@Injectable()
export class MicroControllerService {

  constructor(
    private componentSensorService: ComponentSensorService
  ) {

  }

  public getDiagramNodes(): Observable<any> {
    return new Observable((observer) => {

      let nodes = [];

      nodes = [{
        data: { id: 'NodeMcu' },
        onClickComplete: function (tbodyComponent) {

          let lightHtml = `
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
          </tr>`;

          tbodyComponent.append(lightHtml);

        },
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
