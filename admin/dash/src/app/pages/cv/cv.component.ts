import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import {LynkService} from './../../lynk.service';
import { SharedService } from './../../shared.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Router,NavigationEnd,ActivatedRoute} from '@angular/router';@Component({
  selector: 'app-user',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {
private initValues:any={};
private critere:any={langages:[],frameworks:[],contrats:[],size:100};
private candidats:any=[];
private totalPoints=0;
// utilisé pour calculé pour un candidat donnéé
private totalFramework=0;
private totalLangage=0;
private totalContrat=0;
// utilisé pour calculé les total des élément checked
private totalFrameworks=0;
private totalLangages=0;
private totalContrats=0;

public doughnutChartLabels:string[] = [];
public doughnutChartData:number[] = [];
public doughnutChartType:string = 'doughnut';

selectedLangagesId: any=[];
selectedFrameworksId: any=[];
selectedContratsId: any=[];
public modalRef: BsModalRef;
public clickedCandidat:any={};
@ViewChild("cvModal")
public cvModal: TemplateRef<any>;
@ViewChild("selectionTestModal")
public selectionTestModal: TemplateRef<any>;
@ViewChild("offreModal")
public offreModal: TemplateRef<any>;
private idOffre:any;
private offre:any;
public config1 = {
  animated: true,
  keyboard: true,
  backdrop: true,
  ignoreBackdropClick: false
};
private baseImageUrl: string = "https://demos.telerik.com/kendo-ui/content/web/panelbar/";

    private imageUrl(imageName: string) :string {
        return this.baseImageUrl + imageName + ".jpg";
    }
  constructor(private service :LynkService,private sharedSrvice:SharedService ,
    private route: ActivatedRoute,
    private modalService: BsModalService,private router:Router) 
  {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.idOffre=params['id'];
        if(this.idOffre>0)
        {
          this.getMatchingInitValues();
          this.service.getOffre(this.idOffre).subscribe(res=>{
            this.offre=res;
              this.setSelectedLangagesId(res.langages);
              this.setSelectedFrameworksId(res.frameworks);
              this.setSelectedContratsId(res.contrats);
              
          })
        }
        else{
          this.router.navigate(["/pages/offres"]);
        }

      }
      else {
        this.router.navigate(["/pages/offres"]);
      }
    });
  }
  getMatchingInitValues(){

    this.service.getMatchingCvInitValues().subscribe(res=>{
      this.initValues=res;
      this.initValues.langages.map(el=>{
        el.checked=true;
      })
      this.initValues.frameworks.map(el=>{
        el.checked=true;
      })
      this.initValues.typeContrat.map(el=>{
        el.checked=true;
      })
    })
  }
setSelectedLangagesId(langages){
  this.selectedLangagesId=[];
  langages.forEach(el=>{
    console.log(el);
    this.selectedLangagesId.push(el.nom);
  })

}  
setSelectedFrameworksId(frameworks){
  this.selectedFrameworksId=[];
  frameworks.forEach(el=>{
    this.selectedFrameworksId.push(el.nom);
  })

}  
setSelectedContratsId(contrats){
  this.selectedContratsId=[];
  contrats.forEach(el=>{
    this.selectedContratsId.push(el.nom);
  })

}  
displayCv(i){
    console.log(i)
    this.clickedCandidat=this.candidats[i];
    this.modalRef=this.modalService.show(this.cvModal,Object.assign({}, this.config1, {class: 'gray modal-lg'}));
  }
  checkedTypeContrat(type){
    let find=false;
    this.clickedCandidat.contrats.forEach(el=>{
      if(el.typeContrat.nom==type){
        find=true;
        if(type=="FREELANCE"){
          this.clickedCandidat.contratFreelance=el;
        }
        else if(type=="STAGE"){
          this.clickedCandidat.contratStage=el;
        }
        else{
          this.clickedCandidat.contratSalarie=el;
        }
        return;
      }
    })
    return find;
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
rechercher(){
  this.totalPoints=0;
  this.buildCritere();
  console.log(this.totalPoints);
  console.log(this.critere);
  this.service.getCandidats(this.critere).subscribe(res=>{
    this.critere={langages:[],frameworks:[],contrats:[],size:this.critere.size};
    this.candidats=res;
    this.candidats.map((el,index)=>{
      el.pourcentage=el.score>0?Math.round((el.score/this.totalPoints)*100)+"%":"0%";
      if(index==0){
       // this.setChart(el);
      }
    })
    console.log(res);
    
  })
  
}
buildCritere(){
  let langs:any=[];
  let frames:any=[];
  let contrats:any=[];
  if(this.selectedLangagesId.length>0){
    this.selectedLangagesId.forEach(el=>{
      let l:any={};
      l.nom=el;
      langs.push(l);
    })
    this.critere.langages=langs;
  }
  if(this.selectedFrameworksId.length>0){
    this.selectedFrameworksId.forEach(el=>{
      let f:any={};
      f.nom=el;
      frames.push(f);
    })
    this.critere.frameworks=frames;
  }
  if(this.selectedContratsId.length>0){
    this.selectedContratsId.forEach(el=>{
      let c:any={};
      c.nom=el;
      contrats.push(c);
    })
    this.critere.contrats=contrats;
  }
}
invitationModal(){
  this.modalRef=this.modalService.show(this.selectionTestModal,Object.assign({}, this.config1, {class: 'gray modal-md'}));
}
creerOffreModal(){
  this.modalRef=this.modalService.show(this.offreModal,Object.assign({}, this.config1, {class: 'gray modal-md'}));
}
setCandidatNote(){
  this.service.setCandidatNote({username:this.clickedCandidat.username,note:this.clickedCandidat.note}).subscribe(res=>{

  });
}

candidatsInvi = [];
show = false;
doAction(value){

  //  let verif: boolean = false;

  // // si l'element "selectionner tous" est selectionner alors tous les candidats vont etre selectionner  
  // if(value == 1){
  //   if(this.candidats.length>0)
  //   this.candidats.forEach(el=>{
  //     el.checked=true;
  //   })
  // }
  // // sinon si l'element "faire un test technique" est selectionner alors les candidats vont etre inviter pour un test techique
  // else if(value == 2){
  //   // initializer un tableau d'invitation
  //   let invitations:any=[];
  //   // pour chaque candidat... 
  //   this.candidats.forEach(el => {
  //     // ...si sa case est selectionner alors
  //     if(el.checked==true){
  //       // ...initializer un objet invitation
  //       let invitation:any={};
  //       // ...initializer l'id de l'invitation
  //       invitation.id = {};
  //       invitation.id.candidat = {};
  //       invitation.id.candidat.username = el.username;
  //       invitation.id.offre={};
  //       invitation.id.offre.id = this.offre.id;
  //       // invitation.invite = false;
  //       // invitation.start = false;
  //       // invitation.end = false;

  //      invitations.push(invitation);

        
  //       // // aj
  //       // for( let invi of this.offre.invitations ) {
  //       //   if(invi == invitation) {
  //       //     verif = true;
  //       //   }
  //       // }

  //       // if(!verif) {
  //       //   this.offre.invitations.push(invitation);
  //       // }
  //       // // aj
         
  //     }

  //     })

  //     // console.log(invitations);
  //     // console.log(this.offre.invitations);
  //     for (let inv of this.offre.invitations){
  //       invitations.push(inv);
  //     }
  //     // invitations.concat(this.offre.invitations);
  //     // this.offre.invitations.concat(invitations);
  //     console.log("avant------------",this.offre.invitations);
  //     this.offre.invitations = invitations;
  //     console.log("apres",this.offre.invitations);
  //     console.log(invitations);



      
  //     this.service.addOffre(this.offre).subscribe(res=>{
  //       console.log(res);
  //   })

  // }


  // new version ***important
  let verif: boolean = false;

  // si l'element "selectionner tous" est selectionner alors tous les candidats vont etre selectionner  
  if(value == 1){
    if(this.candidats.length>0)
    this.candidats.forEach(el=>{
      el.checked=true;
    })
  }
  // sinon si l'element "faire un test technique" est selectionner alors les candidats vont etre inviter pour un test techique
  else if(value == 2){
    this.candidatsInvi = [];
    this.show = true;
    // initializer un tableau d'invitation
    let invitations:any=[];
    this.offre.invitations = [];
    // pour chaque candidat... 
    this.candidats.forEach(el => {
      // ...si sa case est selectionner alors
      if(el.checked==true){
        // ...initializer un objet invitation
        let invitation:any={};
        // ...initializer l'id de l'invitation
        invitation.id = {};
        invitation.id.candidat = {};
        invitation.id.candidat.username = el.username;
        invitation.id.offre={};
        invitation.id.offre.id = this.offre.id;
        console.log("*****",invitation);
        // invitation.invite = false;
        // invitation.start = false;
        // invitation.end = false;

        for (let inv of this.offre.invitations){
          invitations.push(inv);
        }
        console.log(invitations);
        if(!this.findInvitation(invitation,invitations)){
          invitations.push(invitation);
        }

        console.log("invitationtest/*_*/",invitations);
        this.candidatsInvi = [];
        // for(let inv of invitations) {
        //   console.log(inv);
        //   this.candidatsInvi.push(inv.id.candidat);
        // }
        // console.log('/*_*/',this.candidatsInvi);

        this.service.envoyerEmailCandidats(el.username).subscribe(res=>{
          console.log(res);
        });

        
        // // aj
        // for( let invi of this.offre.invitations ) {
        //   if(invi == invitation) {
        //     verif = true;
        //   }
        // }

        // if(!verif) {
        //   this.offre.invitations.push(invitation);
        // }
        // // aj
         
      }

      })

      // console.log(invitations);
      // console.log(this.offre.invitations);

      // ***important
      // for (let inv of this.offre.invitations){
      //   invitations.push(inv);
      // }
      // ***important


      // invitations.concat(this.offre.invitations);
      // this.offre.invitations.concat(invitations);

      // ***important
      // console.log("avant------------",this.offre.invitations);
      // this.offre.invitations = invitations;
      // console.log("apres",this.offre.invitations);
      // console.log(invitations);
      // ***important


      // this.offre.invitations = [];

      console.log('les invitations',invitations);
      this.offre.invitations = invitations;
      console.log('offre invi',this.offre.invitations);
      // this.offre.invitations = [];

      this.service.addOffre(this.offre).subscribe(res => {
        console.log(res);
        this.sharedSrvice.subject.next({ toastr: { type: 'success', message: 'Invitation envoyée avec succès' } });
        this.show = false;
      },err => {
        this.sharedSrvice.subject.next({ toastr: { type: 'error', message: 'Invitation envoyée avec echec' } });
        this.show = false;
      });

      this.offre.invitations = [];
      invitations = [];
      this.candidatsInvi = [];
      console.log('les invitations',invitations);
  }
}

findInvitation(invi,invis) {
  for (let inv of invis) {
    if(inv.id.candidat.username == invi.id.candidat.username) {
      return true;
    }
  }
  return false;
}

voirCandidat(idOffre,titre) {
  this.router.navigate(["/pages/resultat/candidat-resultat"],{queryParams:{id: idOffre, titre: titre}});
}


/* setChart(c){
  console.log(c);
  this.totalContrat=0;
  this.totalFramework=0;
  this.totalLangage=0;
  this.doughnutChartData=[];
  this.doughnutChartLabels=[];
this.initValues.frameworks.forEach(element => {
  if(element.checked==true){
    this.doughnutChartLabels.push(element.nom);
    let find=false;
    let compt;
    c.competences.forEach(el=>{
      if(el.framework){
        if(el.framework.id==element.id){
          find=true;
          compt=el;
          return ;
        }
      }
    })
    let score=find?(60*(compt.experience.experience+compt.niveau.niveau)):0;
    this.totalFramework+=score;
    this.doughnutChartData.push(score);
  }
});
this.initValues.langages.forEach(element => {
  if(element.checked==true){
    this.doughnutChartLabels.push(element.nom);
    let find=false;
    let compt;
    c.competences.forEach(el=>{
      if(el.langage){
        if(el.langage.id==element.id){
          find=true;
          compt=el;
          return ;
        }
      }
    })
    let score=find?(40*(compt.experience.experience+compt.niveau.niveau)):0;
    this.totalLangage+=score;
    this.doughnutChartData.push(score);
  }

});
this.initValues.typeContrat.forEach(el=>{
  if(el.checked==true){
    let find=false;
    c.contrats.forEach(con=>{
      if(con.typeContrat.id==el.id){
        this.totalContrat+=50;
        return ;
      }
    })
  }
})
} */
}
