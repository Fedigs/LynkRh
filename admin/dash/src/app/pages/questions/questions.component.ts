import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import {LynkService} from './../../lynk.service';
import { SharedService } from './../../shared.service';
import { Router} from '@angular/router';
@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  private themeDifficulteStats={themes:{},difficultes:{}};
  private langageStats={};
  private questions={listQuestions:{}};
  private options={langage:"",search:"",theme:"",typeQuestion:"",type:"",difficulte:"",size:10,page:0};
  private pages=[];
  private pageCourant=0;
  private idQuestion="";
  private questions_tag="questions_tag";  
  @Input()
  private mode='default'; 
  constructor(private service:LynkService, private router: Router,private sharedService:SharedService) { }
  @Output()
  private itemsChange=new EventEmitter();
  private itemsTmp=[];
  ngOnInit() {
    this.sharedService.subject.subscribe(data=>{
      if(data.modal){
        if(data.modal.type=='deleteRep'&&data.modal.tag==this.questions_tag){
        this.service.delete(this.idQuestion).subscribe(res=>{
          if(res.error==undefined){
              this.sharedService.subject.next({toastr:{type:"success",message:"La question est bien supprimée"}});
              this.getThemeAndDifficulteStats();
              this.getLangageStats();
              this.getQuestionStats();        
          }
          else{
            this.sharedService.subject.next({toastr:{type:"error",message:"La question n'est pas supprimée"}});
          }
        });
      }
        if(data.modal.type=='questionToTestRep'&&data.modal.idTest){
            let datas={id:data.modal.idTest,idQuestion:this.idQuestion};
            this.service.addToTest(datas).subscribe((res)=>{
              if(res.error==false){
                this.sharedService.subject.next({toastr:{type:"success",message:"La question est bien supprimée"}});             
              }
              else{
                this.sharedService.subject.next({toastr:{type:"error",message:res.question}});
               
              }
            });
         
      }
    }
    },
  error=>{
    this.sharedService.subject.next({toastr:{type:"error",message:"Une erreur est survenue"}});
  })
    this.getThemeAndDifficulteStats();
    this.getLangageStats();
    this.getQuestionStats();
  }
  @Input()   
  get items(){
    return this.itemsTmp;
  }
  set items(value){
    if(value instanceof Array){
      this.itemsTmp=value
    }
    else{
    this.itemsTmp.push(value);
    }
    this.itemsChange.emit(this.itemsTmp);
  }
  getThemeAndDifficulteStats(){
    this.service.getThemeAndDifficulteStats(this.options).subscribe(res=>{
      this.themeDifficulteStats=res;
    });
  }
  getLangageStats(){
    this.service.getLangageStats(this.options.type).subscribe(res=>{
      this.langageStats=res;
    });
  }
  getQuestionStats(){
    this.service.getQuestionsStats(this.options).subscribe(res=>{
      this.questions=res;
      this.pages= new Array(res.listQuestions.totalPages);
     
    });
  }
  deleteModal(id){
    this.idQuestion=id;
    this.sharedService.subject.next({modal:{type:"delete",tag:this.questions_tag}});
  }
  changeTheme(id){
    this.options.theme=id;
    this.getQuestionStats();
  }

  type;
  // method qui permet de changer le type de question
  changeTypeQuestion() {
    if(this.type == "Programmation") {
      this.type = 0;
    } else if(this.type == 'QCM' ) {
      this.type = 1;
    } else if(this.type == "Reponse Libre") {
      this.type = 2;
    }
  }
  
  changeType(t){
    this.options.typeQuestion=t;
    this.getQuestionStats();
  }
  changeDifficulte(d){
    this.options.difficulte=d;
    this.getQuestionStats();
  }
  changeLangage(id){
    this.options.langage=id;
    this.getQuestionStats();
  }
  changeSize(){
    this.options.page=0;
    this.getQuestionStats();
  }
  paginate(p){
    if(p=='p'){
      this.pageCourant-=1;
      this.options.page=this.pageCourant;
    }
    else if(p=='n'){
      this.pageCourant+=1;
      this.options.page=this.pageCourant;
    }
    else{
      this.pageCourant=p;
      this.options.page=p;
    }
    this.getQuestionStats();
  }

  editer(q){
    //this.sharedService.subject.next(q);
    let tp;
    if(q.typeQuestion=='QCM'){
      tp=1;
    }
    else if(q.typeQuestion=='REPONSELIBRE'){
      tp=2;
    }else{
      tp=0;
    }
    this.router.navigate(['/pages/question'],{queryParams:{tp:tp,id:q.id}});
  }
  copy(id){
    this.service.copy(id).subscribe(res=>{
      this.sharedService.subject.next({toastr:{type:"success",message:"La question est copiée"}});
      this.getThemeAndDifficulteStats();
      this.getLangageStats();
      this.getQuestionStats();
    })
  }
  addToTest(id){
    this.idQuestion=id;
    this.sharedService.subject.next({modal:{type:"questionToTest"}});
 
 }
 //************************* ces méthodes sont là pour service le composant test-details dans le cadre d'ajout de question dans un test */
 isQuestionExist(id){
   let find=false;
   this.itemsTmp.forEach(el=>{
     if(el.id==id){
       find=true;
       return ;
     }
   });
   return find;
 }
 selectionner(q){
   this.items=q;
 }
 enlever(id){
   this.items=this.items.filter(el=>{
     if(el.id!=id){
       return true;
     }
     else{
       return false;
     }
   })
 }
 /** fin */
}
