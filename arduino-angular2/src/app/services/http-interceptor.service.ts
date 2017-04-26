import { Injectable } from '@angular/core';
import { RequestOptions, RequestOptionsArgs, Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environments';

@Injectable()
export class HttpInterceptorService {

  constructor(
    private http: Http
  ) { }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);    
    return this.http.get(url, this.getRequestOptionArgs(options));
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return this.http.post(url, body, this.getRequestOptionArgs(options));
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return this.http.put(url, body, this.getRequestOptionArgs(options));
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return this.http.delete(url, this.getRequestOptionArgs(options));
  }

  public xmlHttpPost(url: string, formData: FormData) {
    url = this.updateUrl(url);
    return new Observable((observer) => {

      let xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);

      xhr.onload = function (e) {

        if (xhr.readyState == 4 && xhr.status == 200) {
          observer.next(xhr.response);
          observer.complete();
        }

      }

      xhr.send(formData);

    });
  }


  private updateUrl(req: string) {
    return environment.origin + req;
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    
    options.headers.append('Content-Type', 'application/json');

    return options;
  }

}
