import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef, ComponentFactoryResolver, ComponentRef, ReflectiveInjector } from '@angular/core';
import { Location } from '@angular/common'
import * as cytoscape from 'cytoscape';
import { MicroControllerService } from "app/services/micro-controller.service";
import { DynamicComponent } from "app/pages/dynamic/dynamic.component";
import { WebsocketService } from "app/services/websocket.service";

declare var $: any;

@Component({
  selector: 'app-things-diagram',
  templateUrl: './things-diagram.component.html',
  styleUrls: ['./things-diagram.component.css']
})
export class ThingsDiagramComponent implements OnInit {

  modalHtml: String;
  dynamicMicrocontroller: any;

  thingsDiagramContainer: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private microControllerService: MicroControllerService,
    private websocketService: WebsocketService,
    private router: Router,
    private location: Location
  ) {
  }

  ngOnInit() {

    this.microControllerService.getDiagramNodes().subscribe((nodes) => {

      this.configureDiagram(nodes);

      this.microControllerService.getDiagramEdges().subscribe((edges) => {

        this.thingsDiagramContainer.add({ edges: edges });
        this.applyEdgeRules(edges);


      });

    });

    $('#node-modal').modal({
      complete: () => {
        this.microControllerService.disableTopicListener(this.websocketService.socket.io.engine.id).subscribe((response) => {
          this.location.back();
        });
      }
    });

  }

  configureDiagram(nodes: any) {
    this.thingsDiagramContainer = cytoscape({
      container: document.getElementById('things-diagram'),
      elements: {
        nodes: nodes
      }
    });

    this.applyNodeRules(nodes);

  }

  applyNodeRules(nodes: Array<any>) {

    for (let node of nodes) {

      let nodeId = '#' + node.data.id;

      this.thingsDiagramContainer.on('click', nodeId, (e) => {

        $('#node-modal').modal('open');
        this.router.navigate([node.componentPath, node.data.id.toString().toLowerCase()]);

      });

      this.thingsDiagramContainer.style().resetToDefault().selector(nodeId).css(node.style).update();

    }

  }

  applyEdgeRules(edges: Array<any>) {

    for (let edge of edges) {

      let edgeId = '#' + edge.data.id;

      this.thingsDiagramContainer.style().resetToDefault().selector(edgeId).css(edge.style).update();

    }

  }

}
