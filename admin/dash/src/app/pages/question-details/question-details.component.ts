import { Component, OnInit} from '@angular/core';
import { LynkService} from './../../lynk.service';
import { ActivatedRoute } from '@angular/router';
import { ReponsesQcmComponent} from '../reponses-qcm/reponses-qcm.component';
import { ReponsesLibreComponent} from '../reponses-libre/reponses-libre.component';
import { ReponseQcm} from './../../reponse-qcm';
import { ReponseRepLibre} from './../../reponse-rep-libre';
import { SharedService} from './../../shared.service';
import { Router} from '@angular/router';
import { Question } from './../../question';
import { ReponseProg } from './../../reponse-prog';
import { Data} from './../../data';
@Component({
  selector: 'app-user',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {
  private itemsRepQcm:Array<ReponseQcm>=[];
  private itemsRepLibre:Array<ReponseRepLibre>=[];
  private question:Question= new Question();
  private text:string;
  private type:number=2;
  private reponse={};
  private id=0;
  options:any = {maxLines: 1000, printMargin: false};

  constructor(private service:LynkService,
  private route: ActivatedRoute,
  private router: Router,
  private sharedService:SharedService,
  private data:Data
) { 
}
   private iParams:any=[];
  ngOnInit() {
      this.question.reponses=[];
      
      if(this.type==0){
        this.question.reponses[0]={reponseText:""};
        this.question.reponses.push(new ReponseProg());
        console.log(this.question);
        
      }
      this.route.data
      this.service.initParams().subscribe((res)=>{
      this.iParams=res;
      this.question.langage=this.iParams.langages[0];
      this.question.theme=this.iParams.themes[0];
      this.question.difficulte=this.iParams.difficulte[0];
      if(this.type==0){
        this.text=this.question.langage.defaultText;
        
      }
      
    });
    this.route.queryParams.subscribe(params => {
      if (params['tp']) {
        this.type=params['tp'];
      }
      if (params['id']) {
        this.id=params['id'];
      }
    });
    if(this.type==0){
      this.question.typeQuestion="PROGRAMMATION";
      this.text=this.question.langage.defaultText;
    }else if(this.type==1){
      this.question.typeQuestion="QCM";
    }else{
      this.question.typeQuestion="REPONSELIBRE";
    }
    //****** */
    if(this.id>0){
      this.service.getQuestion(this.id).subscribe(res=>{
        if(res.id>0)
        {
        this.question=res;
        if(this.question.typeQuestion=='QCM'){
          this.type=1;
        }
        else if(this.question.typeQuestion=='REPONSELIBRE'){
          this.type=2;
        }else{
          this.type=0;
        }
        }
        else{
          this.router.navigate(['/question'],{queryParams:{tp:0}});
        }
      })
    }
  }
  onChange(code) {
    console.log("new code", code);
}
addReponseQcm(){
  this.sharedService.subject.next(new ReponseQcm("",false));
}
addReponseLibre(){
  this.sharedService.subject.next(new ReponseRepLibre(""));
}

onChangeLangage(id){
  this.iParams.langages.forEach(element => {
    if(element.id==id){
      this.text=element.defaultText;
      this.question.langage=element;
    }
  });
}

tester(){
  this.reponse = {};
  if(this.type == 0){
    this.question.reponses[0] = {};
    this.question.reponses[0].reponseText = this.text;
  }
  this.service.temporalStore(this.question).subscribe((res)=>{
    if(!res.error) {
      this.data.storage = this.question;
      this.router.navigate(['/pages/simulation']);
    }
    else {
      this.reponse = res;
    }
  });
}


enregistrer(){
  this.reponse={};
  if(this.type==0)
  {
    this.question.reponses[0]={};
  this.question.reponses[0].reponseText=this.text;
  }
  console.log(this.question);
  this.service.enregistrer(this.question).subscribe(question=>{
   this.reponse=question;
   this.sharedService.subject.next({ 
    toastr: { type: 'success', message:  'la question est créer avec succès' }
  });
  })
}
isReponsesCorrect(){

  if(this.type==0){
    if(this.text==null){
      return true;
    }
    else
    return false;
  }
  else if(this.type==1){
    let trueReponse=0;
    this.question.reponses.forEach(el=>{
      
      if(el.titre.length<0){
        return false;
      }
      else{
        if(el.reponseBol==true&&el.titre.length>0){
          trueReponse=1;
        }
      }
    })
    if(trueReponse>0){
      return true;
    }
    return false;
  }
  else if(this.type==2){
    let correct=false;
    this.question.reponses.forEach(el=>{
      if(el.reponseText.length>0){
        correct=true;
      }
    })
    if(correct)
      return true;
    return false;
  }
}

}
