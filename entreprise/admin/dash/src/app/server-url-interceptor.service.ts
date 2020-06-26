import { Injectable } from '@angular/core';
import { Interceptor, InterceptedRequest, InterceptedResponse } from 'ng2-interceptors';
import {Router} from '@angular/router';
import { SharedService } from './shared.service';
import { baseUrl } from './config';
@Injectable()
export class ServerUrlInterceptorService implements Interceptor{
public status=200;
  constructor(private route:Router,public sharedService:SharedService) { 

  }
  public interceptBefore(request: InterceptedRequest): InterceptedRequest {
    console.log("before "+request.url);
    return request;
  
}
public interceptAfter(response: InterceptedResponse): InterceptedResponse {
  if(response.response.status==201&&this.status!=201){
    this.status=201;
   this.sharedService.subject.next({login:{}});
  }
  else{
    this.status=response.response.status;
  }
  return response;
}
}
