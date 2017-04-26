import { Injectable } from '@angular/core';

declare var io: any;

@Injectable()
export class WebsocketService {

  onTopicRegistered: any;

  constructor() {

    let socket = io('http://localhost:3000');



    socket.on('topicregistered', (data) => {

      if (this.onTopicRegistered) {
        this.onTopicRegistered(data);
      }

    });

  }

  public on(event: String, eventCallback: any) {

    switch (event) {

      case 'onTopicRegistered': {
        this.onTopicRegistered = eventCallback;
        break;
      }

    }

  }

}
