import { CanActivate,ActivatedRouteSnapshot ,RouterStateSnapshot,Router,NavigationEnd} from '@angular/router';
import { Injectable,OnInit} from '@angular/core';
import {LynkService} from './lynk.service';
import 'rxjs/add/observable/of';
import {Observable, Subject} from "rxjs/Rx";
import { SharedService } from './shared.service';
@Injectable()
export class RouteGuard implements CanActivate,OnInit {

    constructor(private service:LynkService,public router:Router){
    }
   ngOnInit(){
 
  
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.service.user().map(res=>{
        if(res.login==true&&res.role!="CANDIDAT"){
            if(state.url=="/login"){
              return false;
            }
             return true;
           }
           else{
               if(state.url!="/login")
               {
                this.router.navigate(["/login"]);
                return false;
               }
               else
             return true;
           }
    }).first();
    } 
    }
/*     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        let access=false;
        let fonction=route.data['fonction'];
        if(fonction.id==0){
            if(this.authenticate==true){
               return false;
            }
            else{
                return true;
            }
        }
       return this.service.user().map(res=>{
           if(!res.login){
               return false;
           }
        this.sharedService.subject.next({user:{userDetails:res}});
            this.user=res;
            console.log("utils");
            console.log(this.user);
            let fonction=route.data['fonction'];
            console.log("CanActiv");
            console.log(fonction);
            if(fonction.id==0){
                if(this.user.login==true){
                    access= false;
                }
                else{
                    access= true;
                }
            }else{
            if(this.user.role=='ADMIN'){
                access= true;
            }
            else{
               
                if(this.user.fonctions.length==0){
                    access= false;
                }
                else{
                this.user.fonctions.forEach(el=>{
                    console.log("foreach "+el.id)
                    if(el.id==fonction.id){
                        console.log("foreach egal"+el.id)
                        access=true;
                    }
                });
            }
            }
            }
            return access;

        }).first();
 
     
        
    } */