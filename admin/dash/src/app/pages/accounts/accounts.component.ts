import { Component, OnInit,ViewContainerRef,ViewChild,TemplateRef } from '@angular/core';
import { SharedService} from './../../shared.service';
import { Router} from '@angular/router';
import {LynkService} from './../../lynk.service';
import { ActivatedRoute } from '@angular/router';
import { Data} from './../../data';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
@Component({
  selector: 'accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  public modalRef: BsModalRef;
  private user:any={role:{role:"GESTIONNAIRE"},fonctions:[]};
  private option:any={size:10,page:0,type:""};
  private users:any=[];
  private pages=[];
  private pageCourant=0;
  private action='add';
  private accounts_tag='accounts_tag';
  private username;
  private fonctionnalites:any=[];
  private fonctionnalite=0;
  private droits:any=[];
  @ViewChild("droitModal")
  private droitModal:any;
  public config2 = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
  };
  private lgModal:any;
  constructor(private modalService: BsModalService,private route:ActivatedRoute,private router:Router,private service:LynkService,
    private sharedService:SharedService, private data:Data) { 
   
  }
    ngOnInit() {
      this.getUsers();
      this.getFonctionnalites();
      this.sharedService.subject.subscribe(data=>{
        if(data.modal){
          if(data.modal.type=='deleteRep'&&data.modal.tag==this.accounts_tag){
            this.service.deleteUser(this.username).subscribe(res=>{
              if(res.error==false){
                this.sharedService.subject.next({toastr:{type:"success",message:"Suppession reçue"}});
                this.getUsers();
              }
              else{
                this.sharedService.subject.next({toastr:{type:"error",message:"Une erreur est survenue il se peut que l'utilisateur est réferencié quelque part"}});
              }
            })
          }
        }
      });
    }
    verifyUser(){
      // if(this.user.role.role=='GESTIONNAIRE'){
      //   this.user.fonctions=this.user.fonctions.filter(el=>{
      //     return el.selected;
      //   })
      // }
      if(this.user.nom==""||this.user.nom==null){
        this.sharedService.subject.next({toastr:{type:"error",message:"Le nom est obligatoire"}});
        return false;
      }
      else if(this.user.username==""||this.user.username==null){
        this.sharedService.subject.next({toastr:{type:"error",message:"Le nom d'utilisateur est obligatoire"}});
        return false;
      }
      else if(this.user.password==""||this.user.password==null){
        this.sharedService.subject.next({toastr:{type:"error",message:"Le mot de passe est obligatoire"}});
        return false;
      }
      else if(this.user.email==""||this.user.email==null){
        this.sharedService.subject.next({toastr:{type:"error",message:"L'email' est obligatoire"}});
        return false;
      }
      else if(this.user.tel==""||this.user.tel==null){
        this.sharedService.subject.next({toastr:{type:"error",message:"Le tel est obligatoire"}});
        return false;
      }
      else if(this.user.adresse==""||this.user.adresse==null){
        this.sharedService.subject.next({toastr:{type:"error",message:"L'adresse est obligatoire"}});
        return false;
      }
      else if(this.user.role.role==""||this.user.role.role==null){
        this.sharedService.subject.next({toastr:{type:"error",message:"Le type est obligatoire"}});
        return false;
      }
      else{
        return true;
      }
    }
  creer(){

    if(this.verifyUser()){
      if(this.user.role.role=='CANDIDAT'){
        this.user.type='C';
      }
      else if(this.user.role.role=='GESTIONNAIRE'){
        this.user.type='G';
      }
      else {
        this.user.type='E';
      }
      this.service.addUser(this.user).subscribe(res=>{
        if(!res.error){
          let message="Utilisateur crée";
          this.sharedService.subject.next({toastr:{type:"success",message:message}});
          this.user={role:{role:"GESTIONNAIRE"}};
        }
        else{
          this.sharedService.subject.next({toastr:{type:"error",message:res.user?res.user:res}});
        }
      });
    }

  }
  delete(username){
  this.username=username;
  this.sharedService.subject.next({modal:{type:"delete",tag:this.accounts_tag}});
  }
  validEdit(){
    if(this.verifyUser()){
      this.user.type=this.user.role.role;
      this.service.editUser(this.user).subscribe(res=>{
        if(!res.error){
          let message="Mise à jour réçue";
          this.sharedService.subject.next({toastr:{type:"success",message:message}});
          this.action='add';
          this.user={role:{role:"GESTIONNAIRE"}};
          this.users.content.forEach(el=>{
            if(el.username==this.user.username){
              el=this.user;
              return ;
            }
          })
        }
        else{
          this.sharedService.subject.next({toastr:{type:"error",message:res.user?res.user:res}});
        }
      });
    }
  }
  getFonctionnalites(){
    this.service.getFonctionnalites().subscribe(res=>{
      this.fonctionnalites=res;
      this.fonctionnalites.map(el=>{
        el.selected=false;
      })
      this.user.fonctions=this.fonctionnalites;
    });
  }
  addDroits(){
    if(this.droits.length>0){
      this.service.addDroits(this.droits).subscribe(res=>{
        if(res.error==false){
          this.modalRef.hide();
          this.sharedService.subject.next({toastr:{type:"success",message:"Sauvegarde effectuée"}});
        }
      });
    }
  }
  openDroitmodal(u){
    this.modalRef=this.modalService.show(this.droitModal,Object.assign({}, this.config2,{class:'grey modal-md'})); 
    this.service.userDroits(u).subscribe(res=>{
      this.droits=res;
      if(this.droits.length==0){
          this.getInitValue(u);
      }
    })
  }
  getInitValue(u){
    this.service.getFonctionnalites().subscribe(res=>{
      this.fonctionnalites=res;
      this.fonctionnalites.forEach(el=>{
        let droit:any={};
        droit.fonctionnalite=el;
        droit.user={};
        droit.user.username=u;
        droit.lecture=false;
        droit.ecriture=false;
        this.droits.push(droit);
      });
      console.log("after foreach");
      console.log(this.fonctionnalites);
    });
  }
  activation(username,value){
      let u:any={};
      u.username=username;
      u.a=value;
      console.log(u);
      this.service.activationUser(u).subscribe(res=>{
        if(res.error==false){
          console.log("misee")
          console.log(res);
          let message="Mise à jour réçue";
          this.sharedService.subject.next({toastr:{type:"success",message:message}});
        }
        else{
          this.sharedService.subject.next({toastr:{type:"error",message:res.user?res.user:res}});
        }
      });
  }
  editer(u){
    this.action='edit';
    this.user=u;
    if(this.user.role.role=='GESTIONNAIRE'){
      // if(this.user.fonctions.length==0){
      //   this.user.fonctions=this.fonctionnalites;
      // }
    }
  }
  getUsers(){
    this.service.getUsers(this.option).subscribe(res=>{
      this.users=res;
      this.pages= new Array(res.totalPages);
    });
  }
  changeType(){
    this.option.page=0;
    this.getUsers();
  }
  changeSize(){
    this.getUsers();
  }
  paginate(p){
    if(p=='p'){
      this.pageCourant-=1;
      this.option.page=this.pageCourant;
    }
    else if(p=='n'){
      this.pageCourant+=1;
      this.option.page=this.pageCourant;
    }
    else{
      this.pageCourant=p;
      this.option.page=p;
    }
    this.getUsers();
  }
  addFonctionnalite(id){
    this.fonctionnalites=this.user.fonctions.map(el=>{
      if(el.id==id){
        el.selected=true;;
      }
    })
  }
  deleteFonctionnalite(id){
    this.fonctionnalites=this.user.fonctions.map(el=>{
      if(el.id==id){
        el.selected=false;;
      }
    })
  }
  changeF(id){
console.log("change "+id);
  }
}
