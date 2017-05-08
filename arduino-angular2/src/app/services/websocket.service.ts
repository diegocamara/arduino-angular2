import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from "rxjs/Observable";
import { HttpInterceptorService } from "app/services/http-interceptor.service";

declare var io: any;

@Injectable()
export class WebsocketService {

  onTopicRegistered: any;
  onMqttServerConnectionChange: any;

  private _socket: any;

  constructor(
    private httpInterceptorService: HttpInterceptorService
  ) {

    this._socket = io(environment.origin);

    this._socket.on('connect', () => {

      this.consultMqttServerConnectionStatus().subscribe((status) => {

        if (this.onMqttServerConnectionChange) {
          this.onMqttServerConnectionChange(status);
        }

      });

    });

    this._socket.on('topicregistered', (data) => {
     
      if (this.onTopicRegistered) {
        this.onTopicRegistered(data);
      }

    });

    this._socket.on('mqttserverconnectionchange', (connectionStatus) => {

      if (this.onMqttServerConnectionChange) {
        this.onMqttServerConnectionChange(connectionStatus);
      }

    });

  }

  public on(event: String, eventCallback: any) {

    switch (event) {

      case 'onTopicRegistered': {
        this.onTopicRegistered = eventCallback;
        break;
      }

      case 'onMqttServerConnectionChange': {
        this.onMqttServerConnectionChange = eventCallback;
        break;
      }

    }

  }

  private consultMqttServerConnectionStatus(): Observable<any> {

    return new Observable((observer) => {

      let url = 'consultmqttserverconnectionstatus';

      this.httpInterceptorService.get(url).subscribe((mqttServerConnectionStatus: Response) => {

        observer.next(mqttServerConnectionStatus.json());

      }, (error) => {

      }, () => {

        observer.complete();

      });

    });
  }

  public get socket() {
    return this._socket;
  }

}
