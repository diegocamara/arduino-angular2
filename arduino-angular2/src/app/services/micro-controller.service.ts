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
          </tr>`;

          tbodyComponent.append(lightHtml);

        },
        style: {
          'shape': 'rectangle',
          'content': '',
          'width': '80px',
          'height': '40px',
          'background-color': '#F5A45D',
          'color': '#fff',
          'text-outline-width': 1,
          'text-outline-color': '#F5A45D',
          'text-valign': 'center'
        }
      }
      ]

      observer.next(nodes);
      observer.complete();

    });
  }

}
