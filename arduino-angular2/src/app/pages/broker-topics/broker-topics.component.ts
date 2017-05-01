import { Component, OnInit } from '@angular/core';
import { WebsocketService } from "app/services/websocket.service";
import { BrokerTopicsService } from "app/services/broker-topics.service";

@Component({
  selector: 'app-broker-topics',
  templateUrl: './broker-topics.component.html',
  styleUrls: ['./broker-topics.component.css']
})
export class BrokerTopicsComponent implements OnInit {

  topics: Array<any>;

  constructor(
    private webSocketService: WebsocketService,
    private brokerTopicsService: BrokerTopicsService
  ) { }

  ngOnInit() {

    this.brokerTopicsService.consultRegisteredTopics().subscribe((registeredTopics) => {
      this.topics = registeredTopics;
    });

    this.webSocketService.on('onTopicRegistered', (topicData) => {     
      
      if(this.topics.indexOf(topicData) == -1){
        this.topics.push(topicData);
      }
        
    });

  }

}
