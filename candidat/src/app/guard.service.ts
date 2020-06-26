import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot ,RouterStateSnapshot,Router} from '@angular/router';
import {CandidatService} from './candidat.service';
@Injectable()
export class GuardService implements CanActivate {

  constructor(private service:CandidatService,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   return this.service.user().map(res=>{
     console.log(state.url);
     if(res.login==true&&res.role=="CANDIDAT"){
      if(state.url=="/login"||state.url=="/register"){
        return false;
      }
       return true;
     }
     else{
       if(state.url=="/register"){
         return true;
       }
       else{
       if(state.url=="/login"){
        return true;
      }
      this.router.navigate(["/login"]);
       return false;
    }
     }
   }).first();
  }
}