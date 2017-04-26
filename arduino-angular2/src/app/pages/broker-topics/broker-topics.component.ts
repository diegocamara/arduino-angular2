import { Component, OnInit } from '@angular/core';
import { WebsocketService } from "app/services/websocket.service";

@Component({
  selector: 'app-broker-topics',
  templateUrl: './broker-topics.component.html',
  styleUrls: ['./broker-topics.component.css']
})
export class BrokerTopicsComponent implements OnInit {

  topics: Array<any>;

  constructor(
     private webSocketService: WebsocketService
  ) { }

  ngOnInit() {

    this.webSocketService.on('onTopicRegistered', (topicData) => {
      this.topics = this.componentsToArray(topicData);
    });

  }

  componentsToArray(topicData: any): Array<any> {

    let topics = [];

    Object.keys(topicData).forEach(function (topic, topicIndex, topicsData) {
      topics.push(topic);
    });

    return topics;

  }
  

}
