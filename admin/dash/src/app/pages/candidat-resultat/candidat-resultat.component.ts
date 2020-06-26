import { BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from './../../shared.service';
import { LynkService } from './../../lynk.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { setTimeout } from 'timers';
import { BsModalRef } from 'ngx-bootstrap';
import { BsDatepickerModule, DateFormatter } from 'ngx-bootstrap/datepicker';


// intialisation de l'interface tableau pour l'affichage de la list des candidats 'pour la page candidat resultats'
declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'app-candidat-resultat',
    templateUrl: './candidat-resultat.component.html',
    styleUrls: ['./candidat-resultat.component.scss']
})
export class CandidatResultatComponent implements OnInit {

    minDate = new Date(2017, 5, 10);
    maxDate = new Date(2050, 9, 15);
    numCandidat: number;
    i = 0;
    img: any;

    affiError = false;
    private selectedLieuxId: any;
    private date: any;
    // l'initialisation des lieux
    private initValues:any={};

    /* declaration du tableau 
       pour l'affichage de la list des candidats
        'pour la page candidat resultats'*/
    public tableData1: any;
    /* declaration de l'id de l'offre */
    private id: any;
    // declaration des invitations pour l'offre  
    private invitations: any = [];
    // declaration des reponses des candidats
    private reponses: any = [];
    // declaration des lignes du tableau
    private dataRows: any = [];
    // declaration des reponses des candidats
    private reponseCandidat: any[] = [];
    // declaration des reponses des candidats
    private repCand: any[] = [];
    // declaration du score du candidat
    private score;
    // declaration du username des candidats
    private username;
    private disInv: any;


    // 
    private offreInvitations: any = [];
    private listOfselectedCandidat: any = [];
    dis;

    width = 600;
    height = 500;
    type = 'column2d';
    dataFormat = 'json';
    dataSource;
    dataSource2;
    invitations1;

    verif: boolean;
    max;
    // declaration du titre de l'offre
    offreTitre;


    @ViewChild("envoyerInvitation")
    public envoyerInvitation: TemplateRef<any>;

    // intialization du popup de la correction des question du test
    public modalRef: BsModalRef;
    @ViewChild('correctionModal')
    public correctionModal: TemplateRef<any>;
    public config1 = {
        animated: true,
        keyboard: true,
        backdrop: true,
        ignoreBackdropClick: false
    };

    // intialization du popup de l'affichage des resultats du test de chaque candidat
    @ViewChild('resultatModal')
    public resultatInfoModal: TemplateRef<any>;
    public config2 = {
        animated: true,
        keyboard: true,
        backdrop: true,
        ignoreBackdropClick: false
    };

    constructor(private service: LynkService, private sharedSrvice: SharedService,
        private route: ActivatedRoute, private modalService: BsModalService, private router: Router) {
            this.entretien.message = 'Bonjour mr,Votre candidature a retenu notre attention.Dans le cadre de notre processus de recrutement, nous avons le plaisir de vous invité à passer un entretien préliminaire.Bonne chance ! Cordialement';

        // recuperation de l'id et le titre de l'offre a partir de l'url...
        this.route.queryParams.subscribe(data => {
            this.id = data['id'];
            this.offreTitre = data['titre'];
            if (this.id > 0) {
                // ...recuperation des invitations
                this.getOffreInvitations(this.id);
            }
            else {
                this.router.navigate(['/pages/offres']);
            }
        });

        // l'intialization des donnees du graphe des resultats generals
        this.dataSource = {
            'chart': {
                'caption': 'les resultats du test technique',
                'exportEnabled': '1',
                'exportMode': 'client',
                'numberSuffix': 'points',
                'theme': 'fint',
                'canvasBorderThickness': '1',
                'showAlternateHGridColor': '0',
                'subcaption': "pour l'offre " + this.offreTitre,
                'yaxisname': 'les points retenus',
                'labelpadding': '50',
                'rotatevalues': '0',
                "exportFormats": "PNG=Exporter comme image de haute qualité(PNG)|PDF=Exporter comme imprimable(PDF)|XLS=Exporter les données de graphique(XLS)",
                "exportFileName": "Resultats des candidats pour l'offre "
            },
            // l'affichage des images au niveau du premier graphe
            // 'annotations': {
            //     'autoscale': '0',
            //     'scaleimages': '1',
            //     'origw': '400',
            //     'origh': '300',
            //     'groups': [
            //         {
            //             'id': 'user-images',
            //             'items': [
            //                 // {
            //                 //     'id': '',
            //                 //     'type': '',
            //                 //     'url': '',
            //                 //     'x': '$xaxis.label.0.x - 24',
            //                 //     'y': '$xaxis.label.0.y - 52',
            //                 //     'xScale': '20',
            //                 //     'yScale': '20'
            //                 // }
            //                 {
            //                 }
            //             ]
            //         }
            //     ]
            // },
            'data': [
                // {
                //     'label': '',
                //     'value': ''

                // }
                // {

                // }
            ]
        };

        // l'intialization des donnees du graphe des resultats details "no need for this"
        this.dataSource2 = {
            'chart': {
                'caption': 'les resultats du test technique',
                'exportEnabled': '1',
                'exportMode': 'client',
                'numberSuffix': 'points',
                'theme': 'fint',
                'canvasbgColor': '#1790e1',
                'canvasbgAlpha': '10',
                'canvasBorderThickness': '1',
                'showAlternateHGridColor': '0',
                'bgColor': '#eeeeee'
            },
            'data': [
                {
                    'label': 'PHP',
                    'value': 0,
                    'color': '#ee82ee'
                },
                {
                    'label': 'JAVA',
                    'value': 0,
                    'color': '#009933'
                }
            ],
            'trendlines': [
                {
                    'line': [
                        {
                            'startvalue': '0',
                            'color': '#1aaf5d',
                            'valueOnRight': '1',
                            'displayvalue': 'Max'
                        }
                    ]
                }
            ]

        }


        // // *** important visualiser le status des candidats
        // this.service.offreInvitations(this.id,this.size,this.page).subscribe(res => {
        //     this.invitations1 = res;
        //     console.log('/*_*1/',res);

        //     for (let invitation of this.invitations) {
        //         invitation.id.candidat.accepte = false;
        //         console.log('/*_*1/',invitation);
        //         console.log('/*_*1/',invitation.id.candidat);
        //         console.log('',invitation.id.candidat.entretiens);
        //         console.log('accepte',invitation.id.candidat.accepte);
        //         for( let entretien of  invitation.id.candidat.entretiens) {
        //             if( entretien.offre.id == this.id) {
        //                 console.log('true');
        //                 invitation.id.candidat.accepte = true;
        //             }
        //         }
        //         console.log('accepte',invitation.id.candidat.accepte);
        //     }
        //     console.log('accepte invitation',this.invitations);


        //     // for (let invitation of this.invitations1) {
        //     //     console.log('/*_*1/',invitation);
        //     //     invitation.id.candidat.accepte = false;
        //     //     for(let entretien of invitation.id.candidat.entretiens) {
        //     //       console.log('/*_*1/', invitation.id.offre.id);
        //     //       console.log('/*_*1/', entretien.accepte);
        //     //       if(entretien.accepte == true && entretien.offre.id == this.id) {
        //     //         invitation.id.candidat.accepte = true;
        //     //         console.log(true);
        //     //       }
        //         /*   else {
        //         //     invitation.id.candidat.accepte = false; 
        //         //}*/
        //     //     }
        //     // }
        // });

        this.service.initalisationLieux().subscribe(
            res => {
              console.log('lieux',res);
              this.initValues = res;
            }
        );


    }

    ngOnInit() {
        this.dis = false;
        this.disInv = false;
        // affectation du nom du fichier pour le graphe general
        this.dataSource['chart'].exportFileName += this.offreTitre;

        // intialization du header du tableau
        this.tableData1 = {
            headerRow: ['Username', 'Nom', 'Prenom', 'email', 'Action', 'invité/Non invité', 'statut', 'Sélectionner']
        };

        // charger les donnees du graphe des resultats generals
        setTimeout(() => { this.getrep() }, 1000);

        for (let l of this.dataSource2['data']) {
            console.log(l['value']);
        }


        // affecter les donnees des reponse au graphe... 
        for (let sco of this.reponses) {
            // ...si les donner son des donnees php alors on passe les donnees au graphe
            if (sco.question.langage.nom == 'PHP') {
                for (let l of this.dataSource2['data']) {
                    if (l['label'] == 'PHP') {
                        l['value'] += sco.candReponseProjection[0].candReponseItem.score;
                    }
                }
            }
            // ...si les donner son des donnees C# alors on passe les donnees au graphe
            else if (sco.question.langage.nom == 'C#') {
                for (let l of this.dataSource2['data']) {
                    if (l['label'] == 'C#') {
                        l['value'] += sco.candReponseProjection[0].candReponseItem.score;
                    }
                }
            }
            // ...si les donner son des donnees C alors on passe les donnees au graphe
            else if (sco.question.langage.nom == 'C') {
                for (let l of this.dataSource2['data']) {
                    if (l['label'] == 'C') {
                        l['value'] += sco.candReponseProjection[0].candReponseItem.score;
                    }
                }
            }
            // ...si les donner son des donnees C++ alors on passe les donnees au graphe
            else if (sco.question.langage.nom == 'C++') {
                for (let l of this.dataSource2['data']) {
                    if (l['label'] == 'C++') {
                        l['value'] += sco.candReponseProjection[0].candReponseItem.score;
                    }
                }
            }
            // ...si les donner son des donnees JAVA alors on passe les donnees au graphe
            else {
                for (let l of this.dataSource2['data']) {
                    if (l['label'] == 'JAVA') {
                        l['value'] += sco.candReponseProjection[0].candReponseItem.score;
                    }
                }
            }
        }

        // cette algorithme a changer a cause d'une bug
        // intialization du variable du variable pour la verification
        this.verif = false;
        // verifier si le langage sa existe ou non...
        for (let l of this.dataSource2['data']) {
            for (let sco of this.reponses) {
                if (l['label'] == sco.question.langage.nom) {
                    this.verif = true;
                }
            }
            // si le langage n'existe pas alors...
            if (!this.verif) {
                // ...on va le supprimer du dataSource2
                this.dataSource2['data'].shift();
            }
        }


        /*console.log(this.dataSource2['data']);
        // this.max = 0;
        // for (let l of this.dataSource2['data']) {
        //     if (l['value'] > this.max) {
        //         this.max = l['value'];
        //     }
        // }
        // this.dataSource2['trendlines'][0]['line'][0]['startvalue'] = this.max;
        // console.log(this.dataSource2['trendlines'][0]['line'][0]['startvalue']);*/

    }


    // declaration de la variable porteuse de filtre 
    dataRow1 = [];
    val;

    filter(value) { 
    //   console.log(this.dataRow1);
      console.log(value);
      this.dataRows = [];
        if( value == '1' ) {
            for(let row of this.dataRow1) {
                if(row.id.candidat.accepte == true) {
                    console.log(row.id.candidat);
                    this.dataRows.push(row);
                }
            }
        } else if ( value == '2') {
            for(let row of this.dataRow1) {
                if(row.id.candidat.accepte == false) {
                    console.log(row.id.candidat);
                    this.dataRows.push(row);
                }
            }
        } else {
            for(let row of this.dataRow1) {
                this.dataRows.push(row);
            }
        }
        this.val = value;
        console.log(this.val);
    }

    // contains(value,tab) {
    //     let found = false;
    //     for(var i = 0; i < tab.length; i++) {
    //         if (tab[i].username == value) {
    //             found = true;
    //             break;
    //         }
    //     }
    // }

    // declaration des variable pour la pagination ...
    size = 5;
    page = 0;
    private pageCourant=0;
    private testpage = { first: true , last: false };
    pages = [];


    paginate(p){
        this.dataRows = [];
        if(p=='p'){
          this.pageCourant-=1;
          this.page=this.pageCourant;
        }
        else if(p=='n'){
          this.pageCourant+=1;
          this.page=this.pageCourant;
        }
        else{
          this.pageCourant=p;
          this.page=p;
        }
        this.getOffreInvitations(this.id);
        console.log(this.val);
        
    }

    // declaration de la variable ...
    entretiens;
    entre: any[] = [];

    // loading spinner ...
    tabload = false;

    // recuperer tout les invitations ...
    getOffreInvitations(id) {
        this.tabload = true;
        this.service.offreInvitations(id,this.size,this.page).subscribe(res => {
            
                this.dataRows = [];
                this.testpage.first = res.first;
                this.testpage.last = res.last;
                this.invitations = res.content;
                this.pages= new Array(res.totalPages);
                // for (let inv of this.invitations) {
                this.invitations.map((inv)=> {
                    // ...inserter tout les candidats inviter pour l'offre en question dans le tableau

                    // ...disable the button that show the general result
                    inv.isChecked = inv.checked;
                    inv.verif = false;
                    this.disable(inv.id.candidat.username, inv);
                    this.dataRows.push(inv);
                    this.getcandidatReponses(inv.id.candidat.username);

                    console.log('----////',inv.id.candidat.entretiens);
                    for (let entr of inv.id.candidat.entretiens) {
                        console.log('/-/--/-/-/',entr);
                        console.log('----------', entr.invite);
                        console.log('/*/*/*/*//',this.id);
                        console.log('/*/*/*/*//',entr.offre);
                        if ((entr.invite == true) && (entr.offre.id == this.id) ) {
                            inv.invite = true;
                        } 
                        else if((entr.invite == false) && (entr.offre.id == this.id)) {
                            inv.invite = false;
                        }
                    }
                    // for (let data of this.dataRows){
                    //     this.service.getEntretien(this.id).subscribe(
                    //         res => {
                    //             this.entretiens = res;
                    //             for(let entr of this.entretiens) {
                    //                 this.entre.push(entr);
                    //             } 
                    //         }
                    //     );
                    // }
                // }
                });
                this.listOfselectedCandidat = [];
                console.log('listOfselectedCandidat avant la récuperation des candidats', this.listOfselectedCandidat);
                // récupération des candidats déjà sélectionnés
                for(let row of this.dataRows){
                    if(row.checked==true){
                        this.listOfselectedCandidat.push(row);
                    }
                }
                // if(this.acceptValid) {
                    for(let row of this.dataRows) {
                        row.id.candidat.accepte = false;
                        console.log('/*_*1/',row);
                        console.log('/*_*1/',row.id.candidat);
                        console.log('',row.id.candidat.entretiens);
                        console.log('accepte',row.id.candidat.accepte);
                        for( let entretien of  row.id.candidat.entretiens) {
                            if( entretien.offre.id == this.id && entretien.accepte == true) {
                                console.log('true');
                                row.id.candidat.accepte = true;
                            }
                        }
                        console.log('accepte',row.id.candidat.accepte);
                    }
                // }
                

                // initialisation de la variable de filtrage ...
                this.dataRow1 = [];
                for(let row of this.dataRows) {
                    this.dataRow1.push(row);
                }
                console.log('invitations',this.dataRows);
                console.log("listOfselectedCandidat aprés la récuperation des candidats", this.listOfselectedCandidat);
                // load selon l'action
                this.filter(this.val);
            this.tabload = false;
        });
        
    }

    // recuperer tout les reponses ...
    getrep() {
        for (let inv of this.invitations) {
            console.log('username', inv.id.candidat.username);
            // ...faire l'apple a la fonction getCandidatReponses
            this.getCandidatReponses(inv.id.candidat.username);
        }
    }


    // avoir les reponses des candidats 
    getCandidatReponses(username) {
        this.reponses = [];
        this.score = 0;
        this.service.getCandidatReponses(this.id, username).subscribe(res => {
            this.reponses = res;

            for (let rep of this.reponses) {
                // this.repCand.push(rep.candReponseProjection[0].candReponseItem.score);
                if (this.reponses != null) {
                    this.score += rep.candReponseProjection[0].candReponseItem.score;
                }
            }

            /*this.reponseCandidat.push(
                {
                    'username': username,
                    'resultat': this.score
                }
            );*/


            // ***important***
            // for (let i of this.invitations) {
            //     if ((i.id.candidat.username == username)) {
            //         this.img = i.id.candidat.photoUrl;
            //     }
            // }

            //this.dataSource['data'][0].label=username;
            //this.dataSource['data'][0].value=this.score;
            // console.log('fffffffff', this.score)

            this.dataSource['data'].push(
                {
                    'label': username,
                    'value': this.score

                }
            );

            // ***important*** il faut creer un boucle pour inserer les images
            // linsertion de l'image dans le graphe du resultat general
            // this.dataSource.annotations.groups[0].items.push(

            //     {
            //         'id': username,
            //         'type': 'image',
            //         //  'url': this.img,
            //         'url': '/assets/img/logo.png',
            //         'x': '$xaxis.label.3.x - 24',
            //         'y': '$xaxis.label.3.y - 52',
            //         'xScale': '40',
            //         'yScale': '40'
            //     }

            // );
            console.log('image-----------', this.img);


            for (let ds of this.dataSource.annotations.groups[0].items) {
                this.i++;
                if (ds.id == username) { this.numCandidat = this.i; }

            }
            /* this.dataSource['data'][this.numCandidat-2].label=username;
             this.dataSource['data'][this.numCandidat-2].value=this.score;*/

            console.log('iiiiiiiiiiiiiiiiiiii', this.numCandidat);

            this.score = 0;
            this.repCand = [];
            console.log(res);
        });
    }

    getScore() {
        // for( let re of this.getCandidatReponses ){  
        //     this.score =  re.; 
        // }
        return this.reponses;
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


    openInviterEntretienPreliminaire(invi) {
        this.selectedLieuxId = 0;
        this.date = "";
        this.inv = invi;
        this.affiError = false;
        this.modalRef = this.modalService.show(this.envoyerInvitation,Object.assign({}, this.config1, {class: 'gray modal-lg'})); 
    }

    // intialization du variable entretien pour envoyer une invitation d'un entretien
    entretien = {
        message: '',
        candidat: {
            username: '',
            email: ''
        },
        invite: true,
        offre: {
            id: '',
        },
        date: this.date
    };
    candidat: any;
    inv;

    // inviter le candidat pour un preliminaire...
    inviter() {
        let invi = this.inv;
        console.log("/*_*/",invi);
        this.modalRef.hide();
        // affecter le candidat a inviter
        this.entretien.candidat = invi.id.candidat;
        // affecter le message a envoyer 
        // this.entretien.message = 'Bonjour ' + invi.id.candidat.nom + ',Votre candidature a retenu notre attention.Dans le cadre de notre processus de recrutement, nous avons le plaisir de vous inviter à passer un entretien préliminaire.Bonne chance ! Cordialement';
        // affectation de l'id de l'offre
        this.entretien.offre.id = this.id;
        // indice d'invitation 
        this.entretien.invite = true;
        // 
        this.disInv = true;
        // ...faire apple au service inviterCandidat()
        this.service.inviterCandidat(this.entretien,this.date,this.selectedLieuxId).subscribe(
            (res) => {
                if (!res.error) {
                    console.log('-----------', this.entretien);
                    invi.invite = true;
                    // this.service.;
                    console.log(invi.id.candidat);
                    this.disInv = false;
                    // afficher le popup de success
                    this.sharedSrvice.subject.next({ toastr: { type: 'success', message: 'Invitation envoyée avec succès' } });
                } else {
                    // afficher le popup de echec
                    this.sharedSrvice.subject.next({ toastr: { type: 'error', message: "Echec d'envoyée l'Invitation" } });
                }
            }
        );
    }

    //  
    correction() {
        /*this.service.getOffreInfo(id).subscribe(res=>{
          this.clickedOffre=res;
          if(res.titre)*/
        //  no need for this...............
        this.modalRef = this.modalService.show(this.correctionModal, Object.assign({}, this.config1, { class: 'gray modal-lg' }));

    }


    verif1 = false;
    selectedCandidat(username) {
        this.username = username;
        this.getcandidatReponses(username);
        console.log("555555555555555", this.verif1);
        this.modalRef = this.modalService.show(this.correctionModal, Object.assign({}, this.config1, { class: 'gray modal-lg' }));
    }

    // disable the show result botton if the result don't existe ...
    disable(username, invit) {
        this.reponses = [];
        this.service.getCandidatReponses(this.id, username).subscribe(res => {
            this.reponses = res;
            console.log("]]]]]]]]]]]]", this.reponses);
            if (this.reponses.length == 0) {
                invit.verif = false;
            } else {
                invit.verif = true;
            }
        });
    }

    // recuperer les reponses des candidats ...
    getcandidatReponses(username) {
        this.reponses = [];
        this.service.getCandidatReponses(this.id, username).subscribe(res => {
            this.reponses = res;
            console.log("]]]]]]]]]]]]", this.reponses);
            if (this.reponses.length == 0) {
                this.verif1 = false;
            } else {
                this.verif1 = true;
            }
        });
    }

    // 
    setCorrection(id, correcte, score) {
        
        this.service.correction({ id: id, correcte: correcte, score: score }).subscribe(res => {
            this.getCandidatReponses(this.username);
            console.log("dssssssssssssssssssssss");
            this.modalService.hide(1);
            window.location.reload();
            this.router.navigate(['/pages/resultat/candidat-resultat'], { queryParams: { id: this.id, titre: this.offreTitre } });
        });
    }


    resultat(username) {
        this.service.getCandidatReponses(this.id, username).subscribe(res => {
            this.reponses = res;
            this.modalRef = this.modalService.show(this.resultatInfoModal, Object.assign({}, this.config2, { class: 'gray modal-lg' }));
        });
    }


    clicked;
    // method pour recuperer le click event ...
    onClicked(click: boolean) {
        this.clicked = click;
    }


    

    // test quelque chose
    checkedCandidat;  
   //cette fonction permet de remplir le nouveau tableau listOfselectedCandidat par les candidats sélecionnés 
    envoyerEntreprise(){
        // (<HTMLInputElement> document.getElementById("checkedCandidat")).disabled = true;
        // this.listOfselectedCandidat=[];
        console.log("id de l'offre :::::",this.id);
        console.log("btn marche");
        console.log("dataRows",this.dataRows)
        console.log(this.listOfselectedCandidat);
        for(let off of this.dataRows){
            console.log("isChcked",off.isChecked);
            if(off.isChecked==true){
                off.checked=true;
            }
            console.log("checked",off.checked)
        }
        console.log("listOfselectedCandidat",this.listOfselectedCandidat)
        console.log("this.dataRows",this.dataRows)
        for(let off of this.dataRows){
            if((off.checked==true)&&(this.existDansliste(this.listOfselectedCandidat,off)==true)){
                this.listOfselectedCandidat=this.listOfselectedCandidat.filter(obj=>obj!==off);
                console.log(" candidat existe dans la liste listOfselectedCandidat et il est été supprimer  :::::",this.listOfselectedCandidat);
            }else if(((this.existDansliste(this.listOfselectedCandidat,off)==false))&&(off.checked==true)){
                this.listOfselectedCandidat.push(off);
                console.log("off:::::",off);
            }
        }

        console.log("selected candidat::::",this.listOfselectedCandidat);
        if(this.listOfselectedCandidat.length!=0){
            this.dis = true;
            console.log("tableau non vide :::::",this.listOfselectedCandidat);

            this.service.envoyerCandidatsEntreprise(this.listOfselectedCandidat).subscribe(
                res => {
                    
                    console.log(this.listOfselectedCandidat);
                    this.sharedSrvice.subject.next({toastr:{type:"success",message:"les Cvs envoyés avec succés"}});
                     setTimeout(() => {
                         window.location.reload();
                    }, 2000);
                });
        // this.listOfselectedCandidat.length=[];
        } else {
            this.sharedSrvice.subject.next({toastr:{type:"error",message:"aucun candidat sélectionné"}});
            for(let row of this.dataRows){
                if(row.checked==true){
                    this.listOfselectedCandidat.push(row);
                }
            }
        }
}

    // checkedCandidat;
    // //cette fonction permet de remplir le nouveau tableau listOfselectedCandidat par les candidats sélecionnés 
    // envoyerEntreprise() {
    //     console.log("id de l'offre :::::", this.id);
    //     console.log("btn marche");
    //     console.log(this.listOfselectedCandidat.length);
    //     for(let off of this.dataRows) {
    //         if(off.isChecked==true) {
    //             off.checked=true;
    //         }
    //     }

    //     for(let off of this.dataRows) {
    //         if((off.checked==true)&&(this.existDansliste(this.listOfselectedCandidat,off)==true)) {
    //             this.listOfselectedCandidat=this.listOfselectedCandidat.filter(obj=>obj!==off);
    //             console.log(" candidat existe dans la liste listOfselectedCandidat et il est été supprimer  :::::",this.listOfselectedCandidat);
    //         } else if(((this.existDansliste(this.listOfselectedCandidat,off)==false))&&(off.checked==true)) {   
    //             this.listOfselectedCandidat.push(off);
    //             console.log("off:::::",off); 
    //         }
    //     }
    //     // for (let off of this.dataRows) {
    //     //     if (((this.existDansliste(this.listOfselectedCandidat, off) == false)) && (off.checked==true)) {
    //     //         this.listOfselectedCandidat.push(off);
    //     //         console.log("off.checked:::::", off.checked);
    //     //     } else if ((off.checked == true) && (this.existDansliste(this.listOfselectedCandidat, off) == true)) {
    //     //         this.listOfselectedCandidat=this.listOfselectedCandidat.filter(obj=>obj!==off);
    //     //         console.log(" candidat existe dans la liste listOfselectedCandidat et il est été supprimer  :::::",this.listOfselectedCandidat);
    //     //     }

    //     //     /*else if((off.checked==false)&&(this.existDansliste(this.listOfselectedCandidat,off)==true)){  
    //     //         this.listOfselectedCandidat=this.listOfselectedCandidat.filter(obj=>obj!==off);
    //     //         console.log("case non coché et candidat existe dans la liste listOfselectedCandidat et il est été supprimer  :::::",this.listOfselectedCandidat);
    //     //     }*/

    //     // }

    //     console.log("selected candidat::::", this.listOfselectedCandidat);
    //     if (this.listOfselectedCandidat.length != 0) {
    //         console.log("tableau non vide :::::", this.listOfselectedCandidat);
    //         this.service.envoyerCandidatsEntreprise(this.listOfselectedCandidat).subscribe(
    //             res => {
    //                 // console.log('/*-*/',this.listOfselectedCandidat);
    //                 this.sharedSrvice.subject.next({ toastr: { type: "success", message: "les Cvs envoyés avec succés" } });
    //                 //  to change with spinner or loader
    //                 setTimeout(() => {
    //                     window.location.reload();
    //                 }, 5000);
    //             });
    //     } else {
    //         this.sharedSrvice.subject.next({toastr:{type:"error",message:"aucun candidat sélectionné"}});
    //         setTimeout(() => {
    //             window.location.reload();
    //         }, 5000);
    //     }
    // }


    test(value) {
        //console.log(" changed ",value);
    }

    exist;
    //pour vérifier si le candidat est existe déjà dans le tableau listOfSelectedCandidat
    existDansliste(list, off) {
        this.exist=false;
        for (let el of list) {
            if(el.id.candidat.username == off.id.candidat.username) {
                console.log("exist::::::::",el.id.candidat.username);
                this.exist = true;
            }
        }
        return this.exist;
    }


    

}



