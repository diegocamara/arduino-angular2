import { Component, OnInit } from '@angular/core';
import * as cytoscape from 'cytoscape';

@Component({
  selector: 'app-things-diagram',
  templateUrl: './things-diagram.component.html',
  styleUrls: ['./things-diagram.component.css']
})
export class ThingsDiagramComponent implements OnInit {

  thingsDiagramContainer: any;

  constructor() { }

  ngOnInit() {
    this.thingsDiagramContainer = cytoscape({
      container: document.getElementById('things-diagram'),
      elements: {
        nodes: [{
          data: { id: 'a' }
        },
        {
          data: { id: 'b' }
        }]
      }
    });

    console.log(this.thingsDiagramContainer);

  }

}
