import { BsDatepickerModule, DateFormatter } from 'ngx-bootstrap/datepicker';
import { SharedService } from './../../shared.service';
import { LynkService } from './../../lynk.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import { FormControl, FormGroup } from '@angular/forms';




export interface Entretien {
  message: string ;
  candidat: any ;
  invite: boolean;
  offre: any;
  date: any;
}

// intialisation de l'interface tableau pour l'affichage de la list des candidats 'pour la page candidat resultats'
declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}
@Component({
  selector: 'app-cv-anonyme',
  templateUrl: './cv-anonyme.component.html',
  styleUrls: ['./cv-anonyme.component.scss']
})
export class CvAnonymeComponent implements OnInit {
 
 

  private critere:any={langages:[],frameworks:[],contrats:[]};
  /* declaration du tableau 
  pour l'affichage de la list des candidats
  'pour la page candidat resultats'*/
  public tableData1: any;
  // declaration des lignes du tableau
  private dataRows: any = [];

  private initValues:any={};
  private invitations: any = [];
  private pages=[];
  private pageNumber: number = 0;
  private pageCourant: number = 0;
  private testpage = { first: true , last: false };
  private candidatAfficher: any ;
  private idOffre: any;
  private entretien: Entretien;
  private candidat: any;
  private date: any;
  private inviter: any;

  private candidatRow: any;

  private selectedLieuxId: any;

  // config du popup
  public modalRef: BsModalRef;
  @ViewChild("CvAnonyme")
  public cvAnonyme: TemplateRef<any>;
  @ViewChild("envoyerInvitation")
  public envoyerInvitation: TemplateRef<any>;
  @ViewChild("accepteCandidat")
  public accepteCandidat: TemplateRef<any>;
  // config du popup
  public config1 = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };

  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);
 
 
  
  
  constructor(private service: LynkService, private sharedService: SharedService,
     private route: ActivatedRoute, private modalService: BsModalService) { 

    // intialization du header du tableau
    this.tableData1 = {
      headerRow: ['Username', 'Nom', 'Prenom', "Titre de l'Offre" ,'Score', 'Action', 'Invité/Non Invité','Statut']
    };

    this.service.initalisationLieux().subscribe(
      res => {
        console.log('lieux',res);
        this.initValues = res;
      }
    );
    
    

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('----', params['offreId']);
      this.idOffre = params['offreId'];
      this.getCvAnonyme();
    });
    this.entretien = {
      message: 'Bonjour, vous etes inviter pour un entretien definitif',
      candidat: {},
      invite: false,
      offre: {},
      date: this.date
    };
    // this.entretien.message = '';
    // this.getCvAnonymes();
  }

  getCvAnonyme() {
    this.service.getCvAnonyme(localStorage.getItem('username'),this.idOffre,10,this.pageNumber).subscribe(
      res => {
        this.dataRows = [];
        this.invitations = res.content;
        this.testpage.first = res.first;
        this.testpage.last = res.last;
        // for (let invitation of this.invitations) {
        //   invitation.id.candidat.accepte = false;
        // }
        for (let invitation of this.invitations) {
          invitation.id.candidat.accepte = false;
          for(let entretien of invitation.id.candidat.entretiens) {
            console.log('/*_*/', invitation.id.offre.id);
            console.log('/*_*/', entretien.accepte);
            if(entretien.accepte == true && entretien.offre.id == this.idOffre) {
              invitation.id.candidat.accepte = true;
              console.log(true);
            }
          }
        }
        for (let invitation of this.invitations) {
          console.log(invitation);
          invitation.id.candidat.dis = false;

          this.dataRows.push(invitation.id);
        }
        // ***important
        for (let row of this.dataRows) {
          console.log('candidat',row);
          for(let entretien of row.candidat.entretiens) {
            if(entretien.inviteDefinitif == true && entretien.offre.id == this.idOffre) {
              row.inviter = true;
            }
          }
          // if(row.candidat.entretien.inviteDefinitif == true && row.candidat.entretien.offre.id == this.idOffre) {
          //  row.inviter = true;
          // }
        }
        // for (let invitation of this.invitations) {
        //   // ***important
        //   for(let entretien of invitation.id.candidat.entretiens) {
        //     if(entretien.inviteDefinitif == true && entretien.offre.id == this.idOffre) {
        //       this.dataRows.inviter = true;
        //       console.log('-///---',this.dataRows.inviter);
        //     }
        //   }
        // }
        console.log(this.dataRows);

        // trier la liste des candidat selon le score
        let candidats = [];
        for(let candidat of this.dataRows) {
          candidats.push(candidat.candidat.username);

        }
        let datarow3 = [];
        let rest = [];
        let accepte;
        console.log('candidats/*_*/',candidats);
        this.service.sortScore(candidats).subscribe(res => {

          console.log('candidats/*_*/',res);
          datarow3 = res;
          for(let dt of datarow3) {
            for (let dt1 of this.dataRows) {
              if( dt1.candidat.username == dt.username) {
                accepte = dt1.candidat.accepte;
                console.log(accepte);
                dt1.candidat = dt;
                dt1.candidat.accepte = accepte;
                rest.push(dt1);
              }
            }
          }
          console.log('/*_*/',rest);
          this.dataRows = rest;
        });

        this.pages = new Array(res.totalPages);
        console.log("total number of pages",this.pages);
      }
    );
  }

  openInviterEntretienDefinitif(candidat) {
    this.candidat = candidat;
    this.selectedLieuxId = 0;
    this.date = "";
    this.affiError = false;
    // this.entretien.message = "";
    this.modalRef = this.modalService.show(this.envoyerInvitation,Object.assign({}, this.config1, {class: 'gray modal-lg'}));
  }

  show = false;
  candidatInviter;
  dis;
  affiError = false;
  
  inviterEntretienDefinitif() {
    if(this.entretien.message != '' && this.date != null && this.selectedLieuxId != 0) {

      this.modalRef.hide();
      let candidat = this.candidat;
      // this.entretien.offre.id = this.idOffre;
      this.dis = true;
      console.log(this.invitations);

      // set Lieu pour l'entretien
      console.log('lieuID',this.selectedLieuxId);
      
      // Afficher le loader apres le click sur la button envoyer ...
      for (let row of this.dataRows) {
        if(row.candidat.username == candidat.username) {
        row.candidat.dis = true;
        candidat.dis = true;
        console.log('enter',row.candidat.dis);
        }
      }
      console.log("6666",this.date);
      console.log("55555",this.entretien.message);
      this.service.inviterEntretienDefinitif(candidat,this.entretien,this.date,this.selectedLieuxId,this.idOffre).subscribe(
        res => {
          this.dis = true;
          this.candidatInviter = res;
          if(this.candidatInviter != null) {
            // afficher le popup de success
            this.sharedService.subject.next({ 
              toastr: { type: 'success', message: 'Invitation envoyée a ' + this.candidatInviter.username + ' avec succès' }
            });
            // pour changer le status du candidat qu moment de l'envoi d'une invitation
            for (let row of this.dataRows) {
              if(row.candidat.username == candidat.username) {

                // // ***important
                // for(let entretien of row.entretiens) {
                //   if(entretien.offre.id == this.idOffre) {
                //     entretien.inviteDefinitif = true;
                //   }
                // }
                  row.inviter = true;
              }
            }
            // disactive le loader
            candidat.dis = false;
          } else {
            this.sharedService.subject.next({ 
              toastr: { type: 'error', message: 'Invitation envoyée avec echec' }
            });
            // disactive le loader
            candidat.dis = false;
          }
        }
      );
    } else {
      this.affiError = true;
    }

    console.log("/*_*/",this.date);
  }

  openAccepter(candidat) {
    this.candidatRow = candidat;
    this.modalRef = this.modalService.show(this.accepteCandidat,Object.assign({}, this.config1, {class: 'gray modal-lg'})); 
  }

  acceptes;
  accepter() {
    let candidat = this.candidatRow;
    for (let row of this.dataRows) {
      if(row.candidat.username == candidat.username) {
        row.candidat.acc = true;
        candidat.acc = true;
      }
    }
    this.service.updateAccepteEntretien(candidat,this.idOffre).subscribe(
      res => {
        console.log(res);
        this.acceptes = res;
        candidat.accepte = true;
        // for (let accepte of this.acceptes) {
        //   console.log('/*_*/', accepte.accepte);
        //   if( accepte.accepte == true ) {
        //     candidat.accepte = true;
        //   }
        // }
        this.sharedService.subject.next({ 
          toastr: { type: 'success', message: 'Statut du candidat ' + candidat.username + ' est changer avec succès' }
        });
        candidat.acc = false;
      }
    );
    this.modalRef.hide();
  }

  onDateChanged(event: IMyDateModel): void {
    console.log("ddd",this.date);
    this.date = event ? event.formatted: "";
    console.log("///",this.date);
  }

  clearDate(value) {
    console.log(value);
    value.locale = "fr";
    this.date = "";
  }
  
  openCal(value) {
    value.locale = "fr";  
    value.toggle();
  }

  /* getCvAnonymes() {
  //   this.service.getCvAnonymes(localStorage.getItem('username'),10,this.pageNumber).subscribe(
  //     res => {
  //       this.dataRows = [];
  //       this.invitaions = res.content;
  //       this.testpage.first = res.first;
  //       this.testpage.last = res.last;
  //       for (let invitation of this.invitaions) {
  //         console.log(invitation);
  //         this.dataRows.push(invitation.id);
  //       }
  //       this.pages = new Array(res.totalPages);
  //       console.log("total number of pages",this.pages);
  //     }
  //   );
  // }*/

  paginate(p){
    if( p == 'p') {
      this.pageCourant-=1;
      this.pageNumber=this.pageCourant;
    }
    else if( p == 'n') {
      this.pageCourant += 1;
      this.pageNumber = this.pageCourant;
    }
    else {
      this.pageCourant = p;
      this.pageNumber = p;
    }
    this.invitations = [];
    this.getCvAnonyme();
    // this.getCvAnonymes();
  }

  openCvAnonyme(candidat) {
    this.candidatAfficher = candidat;
    console.log('candidat',this.candidatAfficher);
    this.modalRef = this.modalService.show(this.cvAnonyme,Object.assign({}, this.config1, {class: 'gray modal-lg'}));
  }

  checkedTypeContrat(type,candidat) {
    let find=false;
    candidat.contrats.forEach(el=>{
      if(el.typeContrat.nom==type){
        find=true;
        return;
      }
    });
    return find;
  }

}
