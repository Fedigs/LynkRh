import { Component, OnInit } from '@angular/core';
import { LynkService } from './../../lynk.service';
import { SharedService } from './../../shared.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private credentials:Credentials= new Credentials();
  private auth:any={};
  constructor(private service:LynkService,private sharedService:SharedService,private route:Router) {
    console.log("login")
   }

  ngOnInit() {
    
    }
    login(){
      this.service.login(this.credentials).subscribe(res=>{
        if(res.login==true){
          if(res.role!="CANDIDAT" && res.role!="ENTREPRISE"){
            console.log("/*_*/",res.username);
            localStorage.setItem('username', res.username);
            this.route.navigate(['/pages/dashboard']);
          }
          else{
            this.auth.rep=-1;
            this.auth.message=`En tant que ${res.role} vous n'avez pas les autorisations d'accès cet espace`;
          }
         
        }
        else{
          this.auth.rep=false;
          this.auth.message=res;
        }

      },err=>{
        console.log("errorr")
       
      })
    }
}
export class Credentials{
  username:string;
  password:string;
}