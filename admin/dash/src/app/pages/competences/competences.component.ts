import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { SharedService} from './../../shared.service';
import { Router} from '@angular/router';
import {LynkService} from './../../lynk.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
@Component({
  selector: 'competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.css']
})
export class CompetencesComponent implements OnInit {
  private competences:any=[];
  private competences_tag="competences_tag";
  private competence:any={nom:"",type:"",numeroLangage:0,compilerArgs:"",defaultText:"",description:""};
  private competenceEdit:any={nom:"",type:"",numeroLangage:0,compilerArgs:"",defaultText:"",description:""};
  private filtre="Tous";
  private competencesTmp=[];
  public modalRef: BsModalRef;
  options:any = {maxLines: 1000, printMargin: false};
  @ViewChild("competenceModal")
  private competenceModal:any;
  public config2 = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
  };

  constructor(private sharedService:SharedService, private router: Router,private service:LynkService,private modalService: BsModalService) { }

  ngOnInit() {
    this.listCompetences();
    this.sharedService.subject.subscribe(data=>{
      if(data.modal){
        if(data.modal.type=='newCompetenceRep'&&data.modal.ok){
          
          this.listCompetences();
        }
        else if(data.modal.type=='deleteRep'&&data.modal.tag==this.competences_tag){
          console.log(data.modal);
          this.delete();
        }
      }
     
    }) 
  }
listCompetences(){
  this.service.getCompetences().subscribe(res=>{
   res.frameworks.forEach(el=>{
      el.type="framework";
     this.competences.push(el);
      console.log(this.competences)
    })
   res.langages.forEach(el=>{
      el.type="langage";
      this.competences.push(el);
    })
  });
  this.competencesTmp=this.competences;
}
filtrer(){
  this.competences=this.competencesTmp.filter(el=>{
    if(this.filtre=='Tous'){
      return true;
    }
    else{
      return this.filtre==el.type;
    }
  })
}
editModal(c){
  this.competenceEdit=c;
  this.modalRef=this.modalService.show(this.competenceModal,Object.assign({}, this.config2,{class:'grey modal-md'})); 
}
public creer(){
  if(this.competence.nom.length==0||this.competence.type.length==0){
    this.sharedService.subject.next({toastr:{type:"error",message:"Veuillez renseigner les champs"}});
  }
  else{
  this.service.addCompetence(this.competence).subscribe(res=>{
    if(res.error==false){
      this.sharedService.subject.next({toastr:{type:"success",message:"Compétence créee"}});
      this.competences=[];
      this.listCompetences();
    }
    else{
      this.sharedService.subject.next({toastr:{type:"error",message:res.competence}});
    }
  });
}
}
delete(){
  this.service.deleteCompetence(this.competence).subscribe(res=>{
    if(res.error==false){
      this.sharedService.subject.next({toastr:{type:"success",message:"Compétence supprimée"}});
      this.competences=this.competences.filter(el=>{
        if(el.id==this.competence.id&&el.type==this.competence.type){
          return false;
        }
        else{
          return true;
        }
      })
    }
    else{
      this.sharedService.subject.next({toastr:{type:"error",message:"Une erreur est survenue il se peut que vous avez assayé de supprimer une compétence utilisée quelque part"}});
    }
  });
}
editer(){
  let c=this.competenceEdit;
  console.log(c);

   if(c.nom==""||c.nom==null){
    this.sharedService.subject.next({toastr:{type:"error",message:"Le nom est obligatoire"}});
   }
   else if(c.description=="" ||c.description==null){
    this.sharedService.subject.next({toastr:{type:"error",message:"La description est obligatoire"}});
   }
   else{
     this.edition();
   }
}
edition(){
  this.service.editCompetence(this.competenceEdit).subscribe(res=>{
    if(res.error==false){
      this.modalRef.hide();
      this.sharedService.subject.next({toastr:{type:"success",message:"Compétence modifiée"}});
      this.competences.forEach(el=>{
        if(el.id==this.competenceEdit.id&&el.type==this.competenceEdit.type){
          el=this.competenceEdit;
          return ;
        }
      })
      this.competencesTmp.forEach(el=>{
        if(el.id==this.competenceEdit.id&&el.type==this.competenceEdit.type){
          el=this.competenceEdit;
          return ;
        }
      })
    }
    else{
      this.sharedService.subject.next({toastr:{type:"error",message:res.competence}});
    }
  });
}
public openDeleteModal(comp) {
  this.competence=comp;
  this.sharedService.subject.next({modal:{type:"delete",tag:this.competences_tag}});
}

info(id){
  this.router.navigate(['/test'],{queryParams:{id:id}});
}

}
