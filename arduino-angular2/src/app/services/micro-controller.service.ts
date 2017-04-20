import { Injectable } from '@angular/core';
import { ComponentSensorService } from "app/services/component-sensor.service";
import { Observable } from "rxjs/Observable";

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
        data: { id: 'nodea'},
        clickEvent: function(e){
          
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
      }]

      observer.next(nodes);
      observer.complete();

    });
  }

}
