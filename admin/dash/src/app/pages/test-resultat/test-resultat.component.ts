import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import {LynkService} from './../../lynk.service';
import { SharedService } from './../../shared.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import { Router,ActivatedRoute} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-test-resultat',
  templateUrl: './test-resultat.component.html',
  styleUrls: ['./test-resultat.component.css']
})
export class TestResultatComponent implements OnInit {
  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'yyyy/mm/dd',
};
private initValues:any={};
private offre:any={langages:[],frameworks:[],contrats:[],test:{},titre:"",description:"",proprietaire:{}};
private candidats:any=[];
public modalRef: BsModalRef;
public clickedOffre:any={};
@ViewChild("cvModal")
public cvModal: TemplateRef<any>;
@ViewChild("selectionTestModal")
public selectionTestModal: TemplateRef<any>;
@ViewChild("offreModal")
public offreModal: TemplateRef<any>;
@ViewChild("offreInfoModal")
public offreInfoModal: TemplateRef<any>;
private type="correction";
private username;
public config1 = {
  animated: true,
  keyboard: true,
  backdrop: true,
  ignoreBackdropClick: false
};
private invitations:any=[];
private id:any;
private reponses:any=[];
  constructor(private service :LynkService,private sharedSrvice:SharedService ,
    private route: ActivatedRoute,
     private modalService: BsModalService,private router:Router) 
  {
  }

  ngOnInit() {

    this.route.queryParams.subscribe(data =>{
      this.id = data['id'];
      if (this.id > 0) {
       this.getOffreInvitations(this.id);
      }
      else {
       this.router.navigate(['/pages/offres']);
      }
    })
  }
 getOffreInvitations(id){
   this.service.offreInvitations(id,10,0).subscribe(res=>{
     this.invitations = res.content;
   })
 }

 selectedCandidat(username){
   this.username=username;
   this.getCandidatReponses(username);
 }
getCandidatReponses(username){
  this.reponses=[];
  this.service.getCandidatReponses(this.id,username).subscribe(res=>{
      this.reponses=res;
  
  })
}
setCorrection(id,correcte,score){
  this.service.correction({id:id,correcte:correcte,score:score}).subscribe(res=>{
    this.getCandidatReponses(this.username);
  })
}

entretien =  {
  message:'',
  candidat: {
  username: '',
  email: "" }
};

//inviter() => inviter les candidat 
// this.entretien.message=idCandidat;
candidat:any;
 inviter(candidat){

  this.entretien.candidat=candidat;
  this.entretien.message='Bonjour '+candidat.nom+',Votre candidature a retenu notre attention.Dans le cadre de notre processus de recrutement, nous avons le plaisir de vous inviter à passer un entretien préliminaire.Bonne chance ! Cordialement';
  // this.service.inviterCandidat(this.entretien).subscribe(
  //   res=> {
  //     console.log(candidat);
  //   }

  // ); 
   this.sharedSrvice.subject.next({toastr:{type:"success",message:"Invitation envoyée avec succès"}});
}
}
