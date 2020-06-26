import { SharedService } from './../../shared.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LynkService } from '../../lynk.service';
import { setTimeout } from 'timers';


@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.scss']
})
export class ResultatsComponent implements OnInit {

  @Input() score: any;  
  // pour afficher le resultat   
  showdetails: boolean;
  @Input() username: any;
  // pour envoyer le click event  
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  

    id = 'chart1';
    width = 600;
    height = 400;
    type = 'column2d';
    dataFormat = 'json';
    dataSource;

    
    constructor(public sharedService:SharedService,private _router: Router,private service: LynkService ) {
        this.dataSource = {
            "chart": {
                "caption": "les resultats du test technique",
                "exportEnabled": "1",
                "exportMode": "client",
                "numberSuffix": "points",
                "theme": "fint",
                "canvasbgAlpha": "10",
                "canvasBorderThickness": "1",
                "showAlternateHGridColor": "0",
                "exportFileName": "Resultats de "
            },
            "data": [
                // {
                //     "label": "PHP",
                //     "value": 0,
                //     "color": "#ee82ee"
                // }, 
                // {
                //     "label": "JAVA",
                //     "value": 0,
                //     "color": "#009933"
                // },
                // {
                //     "label": "C#",
                //     "value": 0,
                //     "color": "#4286f4"
                // }    
                // ,
                // {
                //     "label": "Javascript",
                //     "value": 0,
                //     "color": "#f44141"
                // },
                // {
                //     "label": "C",
                //     "value": 0,
                //     "color": "#41f4cd"  
                // },
                // {
                //     "label": "C++",
                //     "value": 0,
                //     "color": "#e2f441"  
                // }
            ],
            "trendlines": [
                {
                    "line": [
                        // {
                        //     "startvalue": "0",
                        //     "color": "#1aaf5d",
                        //     "valueOnRight": "1",
                        //     "displayvalue": "Max"
                        // }
                    ]
                }
            ]
          
        };

        

        
        
    }

    maxVar;
    max;
    verif: boolean;
    i = 0;
    langages;
    ngOnInit() {

        
        // // liste des langages ...
        this.service.getLangages().subscribe(res => {
            this.langages = res
            for(let lang of this.langages){
             console.log("nom lang",lang.nom);
                if(lang.nom == "JAVA") {
                    this.dataSource['data'].push({
                        "label": lang.nom,
                        "value": 0,
                        "color": "#009933"
                    });
                } else if(lang.nom == "PHP"){
                    this.dataSource['data'].push({
                        "label": lang.nom,
                        "value": 0,
                        "color": "#ee82ee"
                    });
                } else if(lang.nom == "C#") {
                    this.dataSource['data'].push({
                        "label": lang.nom,
                        "value": 0,
                        "color": "#4286f4"
                    }); 
                } else if(lang.nom == "Javascript") {
                    this.dataSource['data'].push({
                        "label": lang.nom,
                        "value": 0,
                        "color": "#f44141"
                    }); 
                } else if(lang.nom == "C++") {
                    this.dataSource['data'].push({
                        "label": lang.nom,
                        "value": 0,
                        "color": "#e2f441"
                    }); 
                } else {
                    this.dataSource['data'].push({
                        "label": lang.nom,
                        "value": 0,
                        "color": "#4286f4"
                    });  
                }
                
            }
            console.log("----data-----",this.dataSource);

            // affectation du nom du fichier des resultats du candidat pour le graphe app-resultat
        this.dataSource['chart'].exportFileName += this.username;
      
        for(let l of this.dataSource['data']){
            console.log("val----------",l['value']);
        }    

        for (let sco of this.score) {
            if( sco.question.langage.nom == "PHP" ) {
                console.log("reponse*------",sco);
                for(let l of this.dataSource['data'] ) {
                  if(l['label'] == "PHP") {
                    l['value'] +=  sco.candReponseProjection[0].candReponseItem.score;
                    console.log("value*------",l['value']);
                  }  
                }
            }  else if(sco.question.langage.nom == "C#"){
                console.log('---------C#-------------');
                for(let l of this.dataSource['data'] ) {
                    if(l['label'] == "C#") {
                      l['value'] +=  sco.candReponseProjection[0].candReponseItem.score;

                      console.log('---------C#-------------');
                    }  
                }
            } else if(sco.question.langage.nom == "C") {
                for(let l of this.dataSource['data'] ) {
                    if(l['label'] == "C") {
                      l['value'] +=  sco.candReponseProjection[0].candReponseItem.score;
                    }  
                }
            } else if(sco.question.langage.nom == "Javascript"){
                for(let l of this.dataSource['data'] ) {
                    if(l['label'] == "Javascript") {
                      l['value'] +=  sco.candReponseProjection[0].candReponseItem.score;
                    }  
                }   
            }
            else {
                for(let l of this.dataSource['data'] ) {
                    if(l['label'] == "JAVA") {
                      l['value'] +=  sco.candReponseProjection[0].candReponseItem.score;
                    }  
                }
            }
        }

        console.log("----data-----",this.dataSource);





        // pour supprimer les donner qui existe dans le tableau this.datasource['data'] qui ne sont pas utils
        this.verif = false;
        console.log('les datasource****',this.dataSource['data']);
        for(let l of this.dataSource['data']) {
            // ** important **
            for(let sco of this.score) {
               if(l['label'] == sco.question.langage.nom) {
                   this.verif = true;
               }
            //    console.log("verif-----1",this.verif); 
            }



            // ** important **
            // console.log("indexOf-----------:::::::::",l['label']+this.dataSource['data'].indexOf(l)); 
            if(!this.verif) {
               this.dataSource['data'].shift(); 
            //    console.log('sup----',this.dataSource['data']);
            //    console.log("verif-----2",this.verif); 
            }

            console.log("verif----000",this.verif);
        }


        

        console.log('tabfinal---',this.dataSource['data']);

        // intialization du tableau des valeur maximum
        this.maxVar = [
            {
                startvalue: "0",
                color: "#ee82ee",
                valueOnRight: "1",
                displayvalue: "PHP"
            },
            {
                startvalue: "0",
                color: "#1aaf5d",
                valueOnRight: "1",
                displayvalue: "JAVA"
            },
            {
                startvalue: "0",
                color: "#4286f4",
                valueOnRight: "1",
                displayvalue: "C#"
            },
            {
                startvalue: "0",
                color: "#41f4cd",
                valueOnRight: "1",
                displayvalue: "C"
            },
            {
                startvalue: "0",
                color: "#e2f441",
                valueOnRight: "1",
                displayvalue: "C++"
            },
            {
                startvalue: "0",
                color: "#f44141",
                valueOnRight: "1",
                displayvalue: "Javascript"
            }
        ];


        for (let l of this.dataSource['data']) {
            // console.log('datasource', l);
           for(let l1 of this.maxVar) {
            // console.log('maxVar', l1);

            if ( l.label == l1.displayvalue) {
                // console.log('not found!!!!!!!!!!!!!!!!!!!');
                for (let sco of this.score) {
                    if(sco.question.langage.nom == l1.displayvalue) {
                        l1.startvalue = Number(l1.startvalue) + sco.question.score;
                        // console.log('score',l1.startvalue);
                    }
                }
            }
           }
        }

        //pour ne pas afficher des lignes superposées
        for(let l1 of this.maxVar){
            for(let l2 of this.maxVar){
                if((l1.displayvalue!=l2.displayvalue)&&(l1.startvalue==l2.startvalue)&&(l1.startvalue!=0)&&(l2.startvalue!=0)){
                    l2.displayvalue=l2.displayvalue+"&&"+l1.displayvalue;
                    l1.displayvalue="";
                    l1.startvalue=0;
                }
            }
        }

        // determiner le maximum de point pour chaque langage
        for (let o of this.maxVar) {
        //    console.log('value------',o); 
           if ( o.startvalue != 0 ){
            //    o.displayvalue += "MAX";
            this.dataSource['trendlines'][0]['line'].push(o);
           }
        }
        // **important : console.log(this.dataSource['trendlines'][0]['line']);




        // No changes needed
        // this.max = 0;
        // for(let l of this.dataSource['data']) {
        //    if(l['value']> this.max) {
        //     this.max = l['value'];
        //    } 
        // }
        // this.dataSource['trendlines'][0]['line'][0]['startvalue'] = this.max;
        // console.log (this.dataSource['trendlines'][0]['line'][0]['startvalue']);

        });

    }



    findLang(l){
        for (let sco of this.score) {
            if (l['label'] == sco.question.langage.nom) {
                return true;
            }
        }
        return false;
    }

    
    
    events = {
        dataplotClick: (eventObj, dataObj) => {
            console.log('nom',dataObj.categoryLabel)
            this.clicked.emit(true);
            this.sharedService.subject.next({score:this.score,nom_langage:dataObj.categoryLabel});
            console.log('---------------',dataObj.categoryLabel);
        }
    };
}
