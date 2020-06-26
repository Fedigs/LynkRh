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
  // instance of the class credentials
  private credentials: Credentials = new Credentials();
  private auth: any = {};
  constructor(private service: LynkService,
              private sharedService: SharedService,
              private route: Router) {
                console.log('login');
  }

  ngOnInit() { }

  // login and storing the username in the localStorage
  login() {
    this.service.login(this.credentials).subscribe(
      res => {
        console.log('---------', res);
        if (res.login == true){
          // if the user role isn't CANDIDAT or ADMIN then...
          if (res.role != 'CANDIDAT' && res.role != 'ADMIN') {
            // ... he do have access to this space
            // ... store the username in the localstorage
            localStorage.setItem('username', res.username);
            this.route.navigate(['/pages/dashboard']);
          } else {
            // ... he don't have access to this space
            this.auth.rep = -1;
            this.auth.message = `En tant que ${res.role} vous n'avez pas les autorisations d'accès cet espace`;
          }
        } else {
          this.auth.rep = false;
          this.auth.message = res;
        }
      }, err => {
        console.log('errorr');
      }
    );
  }
}

// declaration de la class credentials ...
export class Credentials {
  username: string;
  password: string;
}
