import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import {LynkService} from './../../lynk.service';
import { SharedService } from './../../shared.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import { Router,ActivatedRoute} from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {
  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'yyyy/mm/dd',
};
private initValues:any={};
//initialisation des offres 
private offre:any={langages:[],frameworks:[],contrats:[],test:{},titre:"",description:"",proprietaire:{}};
private candidats:any=[];
public modalRef: BsModalRef;
public clickedOffre?:any={};
@ViewChild("cvModal")
public cvModal: TemplateRef<any>;
@ViewChild("selectionTestModal")
public selectionTestModal: TemplateRef<any>;
@ViewChild("offreModal")
public offreModal: TemplateRef<any>;
@ViewChild("offreInfoModal")
public offreInfoModal: TemplateRef<any>;
@ViewChild("supprimerOffre")
public supprimerOffre: TemplateRef<any>;
public config1 = {
  animated: true,
  keyboard: true,
  backdrop: true,
  ignoreBackdropClick: false
};
selectedLangagesId: any=[];
selectedFrameworksId: any=[];
selectedContratsId: any=[];
selectedTestId:any;
private tests: any=[];
private rep:any={};
private option:any={size:10,page:0,status:0,username:"",titre:"",date:""};
private offres:any=[];
private pages=[];
private pageCourant=0;
private entreprises=[];
private date: any = {};

private disableCv: boolean;
  constructor(private service :LynkService,private sharedSrvice:SharedService ,
    private route: ActivatedRoute,
     private modalService: BsModalService,private router:Router) 
  {
  }

  ngOnInit() {
    this.service.getMatchingCvInitValues().subscribe(res=>{
      this.initValues=res;
      this.initValues.langages.map(el=>{
        el.checked=true;
      });
      this.initValues.frameworks.map(el=>{
        el.checked=true;
      });
      this.initValues.typeContrat.map(el=>{
        el.checked=true;
      });
    });
    this.service.getTests().subscribe(res=>{
      this.tests=res;
    });
   
    this.getOffres();
    this.getEntreprises();
  }


  // pour le refresh du formulaire 
  newOffre(){
    this.offre.id = null;
    this.offre.titre = "";
    this.rep.error = null;
    this.selectedLangagesId = [];
    this.selectedFrameworksId = [];
    this.selectedContratsId = [];
    this.offre.description = "";
    this.offre.test = {};
    this.offre.entreprise = {};
    this.openOffreModal();
  }

  // ouvrir le modal pour la creation et la modification des offres
  openOffreModal(){
    this.modalRef = this.modalService.show(this.offreModal,Object.assign({}, this.config1, {class: 'gray modal-lg'}));
  }

  getEntreprises(){
    this.service.getEntreprises().subscribe(res=>{
      this.entreprises=res;
    });
  }
  checkedTypeContrat(type){
    let find=false;
    this.clickedOffre.contrats.forEach(el=>{
      if(el.nom==type){
        find=true;
        return;
      }
    });
    return find;
  }
  onDateChanged(event: IMyDateModel): void {
    console.log(event);
    console.log(this.date);
    this.option.date=event?event.formatted:"";
    console.log(this.option.date);
    this.getOffres();
  }

  setOffre(){
    let langs:any=[];
    let frames:any=[];
    let contrats:any=[];
    this.offre.langages=[];
    this.offre.frameworks=[];
    this.offre.contrats=[];
    this.rep={};
    this.offre.proprietaire.username = localStorage.getItem("username");
    if(this.selectedLangagesId.length>0){
      this.selectedLangagesId.forEach(el=>{
        let l:any={};
        l.id=el;
        langs.push(l);
      });
      console.log(this.selectedLangagesId);
      this.offre.langages=langs;
    }
    if(this.selectedFrameworksId.length>0){
      this.selectedFrameworksId.forEach(el=>{
        let f:any={};
        f.id=el;
        frames.push(f);
      });
      this.offre.frameworks=frames;
    }
    if(this.selectedContratsId.length>0){
      this.selectedContratsId.forEach(el=>{
        let c:any={};
        c.id=el;
        contrats.push(c);
      });
      this.offre.contrats=contrats;
    }
  }
  updateOffreTest(){
    console.log('------',this.clickedOffre);
    this.service.updateOffreTest(this.clickedOffre.id,this.clickedOffre.test.id?this.clickedOffre.test.id:0).subscribe(res=>{
     // faire un traitement après la mis à jour
    });
  }

  show = false;
  // ajouter un nouvel offre
  addOffre(){
    this.show = true;
    console.log('------',this.show);
    this.setOffre();
    console.log(this.offre);
    this.rep={};
    if(this.offre.test == null){
      this.offre.test = {id:1};
    }
    
    if(this.offre.titre==""){
      this.rep.error=true;
      this.rep.message="Le titre de l'offre est obligatoire";
    }
    else if (this.offre.description==""){
      this.rep.message="La description de l'offre est obligatoire";
      this.rep.error=true;
    }
    // else if (this.offre.test.id==undefined){
    //   this.rep.message="Le test  est obligatoire";
    //   this.rep.error=true;
    // }
    // else if (this.offre.proprietaire.username==undefined){
    //   this.rep.message="L'entreprise  est obligatoire";
    //   this.rep.error=true;
    // }
    else if (this.offre.langages.length==0){
      this.rep.message="Le langage  est obligatoire";
      this.rep.error=true;
    }
    else{
      console.log(this.offre);
      this.service.addOffre(this.offre).subscribe(res=>{
        if(res.error==true){
          this.rep.error=true;
          this.rep.message=res.titre?res.titre:res.description?res.description:res.offre;
        }
        else{
          this.getOffres();
          this.rep.error=false;
          if(this.offre.id){
            this.rep.message="Offre modifiée avec succès ";
            this.show = false;
            console.log('------',this.show);
          }
          else{
            this.rep.message="Offre ajoutée avec succès ";
            this.show = false;
            console.log('------',this.show);
          }
        }
      });
    }
  }

  verif;
  getOffres(){
    console.log(this.option);
    this.option.username = localStorage.getItem('username');
    // this.option.username=this.option.username!=null?this.option.username:"";
    this.service.getOffres(this.option).subscribe(res=>{
      this.offres = res;
      console.log("res",this.offres);
      this.pages = new Array(res.totalPages);

      // ***important A terminer
      console.log('les offres',this.offres);
      for(let offre of this.offres.content) {
        this.service.verifExistInvitation(localStorage.getItem('username'),offre.id).subscribe(
          res => {
            this.verif = res;
            console.log(this.verif);
             if(this.verif){
              offre.disableCv = false;
            } else {
              offre.disableCv = true;
            }
            return this.verif;
          }
        );
      }
    });
  }


  
  
  


  showOffre(id){
    this.service.getOffreInfo(id).subscribe(res=>{
      this.clickedOffre=res;
      if(res.titre)
      this.modalRef=this.modalService.show(this.offreInfoModal,Object.assign({}, this.config1, {class: 'gray modal-lg'}));

    });
  }
  changeSize(){
    this.option.page=0;
    this.getOffres();
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
    this.getOffres();
  }
  matching(id){
    this.router.navigate(["/pages/cv"],{queryParams:{id:id}});
  }
  setEdition(o){
    this.rep={};
    this.offre=o;
    this.offre.proprietaire.username = localStorage.getItem("username");
    if(this.offre.test == null){
      this.offre.test = {id:1};
    }
      
    console.log(o);
    this.selectedContratsId=[];
    this.selectedLangagesId=[];
    this.selectedFrameworksId=[];
    o.contrats.forEach(el=>{
      this.selectedContratsId.push(el.id);
    });
    o.langages.forEach(el=>{
      this.selectedLangagesId.push(el.id);

    });
    o.frameworks.forEach(el=>{
      this.selectedFrameworksId.push(el.id);
    });
    this.openOffreModal();
  }

  CvAnonyme(id) {
    this.router.navigate(["/pages/cv-anonymes"],{queryParams:{offreId:id}});
  }

  titre;
  idOf;
  openSupprimerOffre(titre,id) {
    this.titre = titre;
    this.idOf = id;
    console.log(this.idOf);
    console.log(this.option);
    this.modalRef = this.modalService.show(this.supprimerOffre,Object.assign({}, this.config1, {class: 'gray modal-lg'}));
  }

  deleteOffre() {
    this.show = true;
    this.service.deleteOffre(this.idOf,this.option).subscribe(res=>{
      console.log(res);
      this.offres = res;
      for(let offre of this.offres.content) {
        this.service.verifExistInvitation(localStorage.getItem('username'),offre.id).subscribe(
          res => {
            this.verif = res;
            console.log(this.verif);
             if(this.verif){
              offre.disableCv = false;
            } else {
              offre.disableCv = true;
            }
            return this.verif;
          }
        );
      }
      this.show = false;
      this.sharedSrvice.subject.next({ 
        toastr: { type: 'success', message: "l'offre " + this.titre + ' avec succès' }
      });
    },error=>{

    });
    this.modalRef.hide();
    // this.getOffres();
  }

/*   setCritere(){
    this.totalFrameworks=0;
    this.totalLangages=0;
    this.totalContrats=0;
    this.initValues.langages.map(el=>{
      if(el.checked==true){
        // 40 c'est le points pour langage 5 c'est le niveau max et 10 experience max
        this.totalPoints+=40*(5+10);
        this.totalLangages+=40*(5+10);
        let langage:any={};
        langage.id=el.id;
        this.critere.langages.push(langage);
      }
    })
    this.initValues.frameworks.map(el=>{
      if(el.checked==true){
        this.totalPoints+=60*(5+10)
        this.totalFrameworks+=60*(5+10)
        let framework:any={};
        framework.id=el.id;
        this.critere.frameworks.push(framework);
      }
    })
    this.initValues.typeContrat.map(el=>{
      if(el.checked==true){
        this.totalPoints+=50;
        this.totalContrats+=50;
        let contrat:any={};
        contrat.id=el.id;
        this.critere.contrats.push(contrat);
      }
    })
  } */


}
