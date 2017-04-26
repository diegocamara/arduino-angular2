import { Component, OnInit } from '@angular/core';
import * as cytoscape from 'cytoscape';
import { MicroControllerService } from "app/services/micro-controller.service";
import { WebsocketService } from "app/services/websocket.service";

declare var $: any;

@Component({
  selector: 'app-things-diagram',
  templateUrl: './things-diagram.component.html',
  styleUrls: ['./things-diagram.component.css']
})
export class ThingsDiagramComponent implements OnInit {

  thingsDiagramContainer: any;

  constructor(
    private microControllerService: MicroControllerService
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

    $('#node-modal').modal();

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

        $('#modules-table tbody').html('');

        $('#node-modal-title').html(node.data.id);
        $('#node-modal').modal('open');

        node.onClickComplete($('#modules-table tbody'));
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
