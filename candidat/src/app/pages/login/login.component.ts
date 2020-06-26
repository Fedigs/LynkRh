import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {CandidatService} from './../../candidat.service';
import { Router} from '@angular/router';
@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public form:FormGroup;
  public username:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  private auth:any={};
  constructor(fb:FormBuilder,private service:CandidatService,private route:Router) {
    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.auth={};
    this.submitted = true;
    if (this.form.valid) {
      this.service.login({username:this.username.value,password:this.password.value}).subscribe(res=>{
        if(res.login==true){
          if(res.role=="CANDIDAT"){
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
      })
    }
  }
}
