import {Component, OnInit,Input} from '@angular/core';
import { GlobalState} from './../../../../global.state';
import {CandidatService} from './../../../../candidat.service';
@Component({
  
  selector: 'prog',
  styleUrls:['./prog.scss'],
  templateUrl: 'prog.html',
})
export class Prog implements OnInit{
  @Input()
  private question:any={};
  @Input()
  private time:"00:00";
  @Input()
  private timer="00:00";
  private activeBtn=true;
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  @Input()
  private invitationId
  private reponses:any=[];
  private promise;
  private testEnd=false;
  constructor(private globalState:GlobalState,private service:CandidatService) {

     }
 ngOnInit(){
  this.reponses[0]={question:{id:this.question.id},invitation:{id:{offre:{id:this.invitationId.idOffre},candidat:{username:this.invitationId.username}}},duree:"",reponse:{id:this.question.reponses[0].id},reponseText:this.question.langage.defaultText,type:"PROGRAMMATION"};
  this.timerStart();
  this.globalState.subscribe("test_end",(data)=>{
    this.testEnd=data;
    if(this.reponses.length>0){
      this.send();
    }
   })

 }
 send(){
  this.activeBtn=false;
  clearTimeout(this.promise);
  setTimeout(()=>{
   this.service.candidatReponse(this.reponses).subscribe(res=>{
    this.activeBtn=true;
    this.globalState.notifyDataChanged('next-question',this.question); 
    this.reponses=[];
    this.reponses[0]={question:{id:this.question.id},invitation:{id:{offre:{id:this.invitationId.idOffre},candidat:{username:this.invitationId.username}}},duree:"",reponse:{id:this.question.reponses[0].id},reponseText:"",type:"REPONSELIBRE"};
    this.timerStart();
   })
  },1000);
     
 }
 timerStart(){
  let min=0;
  let ss=0;
  this.promise=setInterval(()=>{
      if(ss>=60){
        ss=60-ss;
        min+=1;
      }
      else{
        ss+=1;
      }
    
    let minStr:any=min;
    let ssStr:any=ss;
    if(min<10){
      minStr="0"+min+'';
    }
    if(ss<10){
      ssStr="0"+ss+'';
    }
    this.reponses[0].duree=minStr+":"+ssStr;
  },1000)
}
onBlur() { }
onFocus() { }
}
