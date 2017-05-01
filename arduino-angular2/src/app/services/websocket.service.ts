import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare var io: any;

@Injectable()
export class WebsocketService {

  onTopicRegistered: any;

  private _socket: any;

  constructor() {

    this._socket = io(environment.origin);
    
    this._socket.on('topicregistered', (data) => {
     
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

  public get socket() {
    return this._socket;
  }  

}
