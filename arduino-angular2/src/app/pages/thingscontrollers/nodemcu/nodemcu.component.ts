import { ActivatedRoute } from '@angular/router';
import { MicroControllerService } from '../../../services/micro-controller.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-nodemcu',
  templateUrl: './nodemcu.component.html',
  styleUrls: ['./nodemcu.component.css']
})
export class NodemcuComponent implements OnInit, OnDestroy {

  nodemcu: any = { value: [] };
  nodemcuId: string;
  private sub: any;

  lights: Array<any> = [];

  constructor(
    private microControllerService: MicroControllerService,
    private route: ActivatedRoute
  ) {

    this.sub = this.route.params.subscribe((params) => {
      this.nodemcuId = params['id'];
    });

  }

  ngOnInit() {

    this.microControllerService.listenMicrocontrollerInformations(this.nodemcuId).subscribe((nodeInfo) => {
      
      if (nodeInfo.hasOwnProperty('value')) {
        this.nodemcu = nodeInfo;
        this.configureLights(this.nodemcu);
      } else {
        if (!this.isExistsComponent(this.nodemcu.value, (component) => {
          return component.id == nodeInfo.id;
        })) {

          /**
           * 
           * nodeInfo example json
           * '{"id":"nodemcu.lights.bedroom", "description":"Bedroom light",  "status":1}'
           * 
           */

          this.nodemcu.value.push(nodeInfo);
          this.configureLights(this.nodemcu);
        }
      }

    });

  }

  configureLights(nodemcu: any) {

    if (nodemcu && nodemcu.value && nodemcu.value.length > 0) {

      nodemcu.value.forEach((component, componentIndex, components) => {

        let light = {
          id: component.id,
          status: component.status,
          description: component.description
        };

        if (!this.isExistsComponent(this.lights, (lightComponent) => {
          return lightComponent.id == light.id;
        })) {
          this.lights.push(light);
        }

      });

    }



  }

  isExistsComponent(components, expression) {

    let isExistsComponent = false;

    for (let component of components) {

      if (expression(component)) {
        isExistsComponent = true;
        break;
      }

    }

    return isExistsComponent;

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
