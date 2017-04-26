import { Injectable, OnInit } from '@angular/core';
import { HttpInterceptorService } from "app/services/http-interceptor.service";
import { Observable } from "rxjs";

@Injectable()
export class BrokerTopicsService {

  constructor(
    private httpInterceptorService: HttpInterceptorService
  ) { }

  public consultRegisteredTopics(): Observable<any>{
    return new Observable((observer) => {

      let url = 'getresgisteredtopics';

      this.httpInterceptorService.get(url).subscribe((registeredTopics)=>{            
        observer.next(registeredTopics.json());
        observer.complete();
      });

    });
  }

}
