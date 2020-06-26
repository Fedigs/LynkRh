import { Component, OnInit, Input, Output } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { SharedService } from '../../shared.service';
import { runInThisContext } from 'vm';

var myDataSource = {
  "chart": {
      "caption": "Harry's SuperMart",
      "subCaption": "Top 5 stores in last month by revenue",
      "numberSuffix": "Points",
      "theme": "fint",
      "exportEnabled": "1",
      "exportMode": "client",
      'exportFileName': 'Resultats detaille du ',
      "exportFormats": "PNG=Exporter comme image de haute qualité(PNG)|PDF=Exporter comme imprimable(PDF)|XLS=Exporter les données de graphique(XLS)"
  },
  "data": [
  {
      "label": "Connaissance",
      "value": "0"
  },
  {
      "label": "Modélisation",
      "value": "0"
  },
  {
      "label": "",
      "value": ""
      }
  ]
}

@Component({
  selector: 'app-details-resultat',
  templateUrl: './details-resultat.component.html',
  styleUrls: ['./details-resultat.component.scss']
})
export class DetailsResultatComponent implements OnInit {

  id = 'chart2';
  id_offre:any;
  score:any;
  scoreConnaissance=0;
  scoreModelisation=0;
  ob;
  width = 700;
  height = 500;
  type = 'pie3d';
  dataFormat = 'json';
  dataSource = myDataSource;
  nom_langage;
  @Input() username: any;

  // pour passer le click event 
  @Input() clicked;

  

  constructor(private _route: ActivatedRoute, private _router: Router, public sharedService: SharedService) { }

  ngOnInit() {

    

    // 
   /* this._route.queryParams.subscribe( params => {
      this.nom_langage=params['nom_langage'];
    });*/

    // the scervice of the 
    this.sharedService.subject.subscribe( res => {
 //test
 //test
      this.scoreConnaissance=0;
      this.scoreModelisation=0; 
      
      this.score = res.score;
      this.nom_langage=res.nom_langage
      console.log("12323",res);

      for( let r of this.score ){
       
        if(r.question.theme.nom=="Connaissance" && (r.question.langage.nom==this.nom_langage)) {
          this.scoreConnaissance = this.scoreConnaissance + r.candReponseProjection[0].candReponseItem.score;
        } else if(r.question.theme.nom=="Modélisation" && (r.question.langage.nom==this.nom_langage)) {
          this.scoreModelisation=this.scoreModelisation+r.candReponseProjection[0].candReponseItem.score;
        }
     

       
          //this.dataSource.data[0].label="qdsdsqdsddqsqqs";

          console.log("score connaissance:::::",this.scoreConnaissance);
          console.log("score Modelisation:::::",this.scoreModelisation);
          this.dataSource.data[0].value =this.scoreConnaissance+"";
          this.dataSource.data[1].value =this.scoreModelisation+""; 
          


      }
      /* affectation du nom de fichier du graphe des resultats details du candidat 
      dans le components 'details-resultats' */
      this.dataSource['chart'].exportFileName += this.nom_langage + '_candidat: ' + this.username;
      
    });

  }

}
