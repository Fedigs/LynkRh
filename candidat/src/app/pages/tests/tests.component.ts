import {Component, OnInit} from '@angular/core';
import {CandidatService} from './../../candidat.service';
import { GlobalState} from './../../global.state';
import {Router} from '@angular/router';

@Component({
  selector: 'tests',
  styleUrls:['./tests.scss'],
  templateUrl: 'tests.html',
})
export class Tests implements OnInit{
private invitations:any[];
private clickedInvitation={};
  constructor(private service:CandidatService,private globalState:GlobalState,private router:Router) {
   
    }
ngOnInit(){
  this.service.getCandidatInvitations().subscribe(res=>{
    this.invitations=res;
    console.log("invitations",this.invitations);
  })
 
}
viewInvitation(i){
this.clickedInvitation=i;
}
startTest(id){
  setTimeout(()=>{
    this.globalState.notifyDataChanged('start_test_page',id);
  },1000)

  this.router.navigate(['/pages/start-test']);
  
}
}
