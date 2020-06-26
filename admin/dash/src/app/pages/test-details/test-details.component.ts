import { Component, OnInit,ViewContainerRef,ViewChild,TemplateRef } from '@angular/core';
import { SharedService} from './../../shared.service';
import { Router} from '@angular/router';
import {LynkService} from './../../lynk.service';
import { ActivatedRoute } from '@angular/router';
import { Data} from './../../data';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
@Component({
  selector: 'app-user',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {
  public modalRef: BsModalRef;
  private question:any={};
  private test={affichage:"a",questions:[]};
  @ViewChild("repModal")
  private repModal:any;
  public config2 = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
  };
  private mode='addQuestionToTest';
  @ViewChild("lgModal")
  private lgModal:any;
    constructor(private modalService: BsModalService,private route:ActivatedRoute,private router:Router,private service:LynkService,
      private sharedService:SharedService, private data:Data) { 
     
    }
    @ViewChild("QuestionsListModal")
    public questionsListModal: TemplateRef<any>;
    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        if (params['id']) {
          let id=params['id'];
          if(id>0){
            this.service.getTest(id).subscribe(res=>{
              this.test=res;
              if(this.test==null){
                this.router.navigate(['/pages/tests']);  
              }
            })
          }
          else{
            this.router.navigate(['/pages/tests']);  
          }
        }
        else{
          this.router.navigate(['/pages/tests']);
        }
      });
    }
   delete(ind){
  this.test.questions=this.test.questions.filter((el,index)=>{
    if(ind===index){
      return false;
    }
    else {
      return true;
    }
  });
  
   }
   sauvegarder(){
     this.service.createTest(this.test).subscribe(res=>{
       if(res.error==false){
         this.sharedService.subject.next({toastr:{type:'success',message:'Le test est sauvegardé '}})
       }else{
        this.sharedService.subject.next({toastr:{type:'error',message:res.toString()}})
       }
     });
   }
   public openReponseModal(id,type) {
    
    /*  this.service.getReponses(id).subscribe(res=>{
      this.bsModalRef = this.modalService.show(ReponseModalComponent,{class: 'modal-lg'});
      this.bsModalRef.content.question=res;
     }); */
    
  }
  questionModal(){
    this.modalRef=this.modalService.show(this.questionsListModal,Object.assign({}, this.config2)); 
  }
  reponseModal(id){
    this.service.getReponses(id).subscribe(res=>{
      this.question=res;
      this.modalRef=this.modalService.show(this.repModal,Object.assign({}, this.config2,{class:'grey modal-lg'})); 
    });
  }
  simuler(q){
    this.service.getQuestion(q.id).subscribe(re=>{
      q=re;
     this.data.storage=q;
     this.service.temporalStore(q).subscribe((res)=>{
      if(!res.error){
        this.router.navigate(['/pages/simulation']);
      }
      else{
       
      }
    });
    
    });
  
  }
  console(questions){
    console.log(questions);
  }
}
