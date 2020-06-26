import {Component, OnInit,NgZone} from '@angular/core';
import {CandidatService} from './../../candidat.service';
import { GlobalState} from './../../global.state';
import {Router} from '@angular/router';


@Component({
  selector: 'tests',
  styleUrls:['./startTest.scss'],
  templateUrl: 'startTest.html',
})
export class StartTest implements OnInit{
private clickedInvitation={};
private invitation:any={};
private invitationId:any={};
private questions:any=[];
private start=false;
private message="";
private welcomeMessage="Patientez";
private verification=false;
private actuelQuestion:any={};
private index=0;
private totalDuree="00:00";
private totalDureeSecond=0;
private timer="00:00";
private min:any=0;ss:any=0;
private end=false;
private closeSession=false;
private reponses:any=[];
private activeBtn=true;
private promise;
constructor(private service:CandidatService,private globalState:GlobalState,private router:Router) {
   
    }
ngOnInit(){
  
/*   this.globalState.subscribe("start-test",(data)=>{
    this.invitationId=data;
    this.getInvitation(this.invitationId);
   }) */
  this.globalState.subscribe("next-question",(data)=>{
    this.next();
   })
  this.globalState.subscribe("start_test_page",(data)=>{
    console.log(data)
    setTimeout(()=>{
      this.invitationId.idOffre=data.id.offre.id;
      this.invitationId.username=data.id.candidat.username;
      this.getInvitation(this.invitationId);
    },5000)
   })
}
viewInvitation(i){
this.clickedInvitation=i;
}
getInvitation(id){
  this.welcomeMessage="Vérification de l'invitation";
setTimeout(()=>{
  this.service.getInvitation(id).subscribe(res=>{
    this.invitation=res;
    this.getTestQuestion(this.invitation.id.offre.test.id);
   /*  if(this.invitation.start==false){
      this.welcomeMessage="Vérification effectuée";
      
      this.getTestQuestion(this.invitation.id.offre.test.id);
    }
    else{
      this.message="Ce test a été déja fait";
    } */
  })
},2000)
}
getTestQuestion(id){
 setTimeout(()=>{
   this.welcomeMessage="Récupération du test";
  this.service.getTestQuestion(id).subscribe(res=>{
   console.log(res);
    if(res.length>0){
      setTimeout(()=>{
        this.welcomeMessage="Mise en place des questions";
        this.questions=res;
        this.startConfirmation();
      },1000)
    }
    else{
      this.message="Ce test contient quelques dysfonctionnnements , nous vous prions de reesayer ultérieurement. Merci pour votre compréhension"
    }
  })
 },2000)
}
createSession(){

}
startConfirmation(){
  setTimeout(()=>{
    this.verification=true;
      },1000)
}
confirm(){
  this.setTestTotalTime();
  let invitationId={offre:{id:this.invitationId.idOffre},candidat:{username:this.invitationId.username}};
 this.service.session(invitationId,this.totalDureeSecond+10).subscribe(res=>{
  this.verification=false;
  this.message="";
  this.welcomeMessage="Creation d'une session";
  setTimeout(()=>{
    this.start=true;
    this.next();
    this.timerStart();
    this.welcomeMessage="";
      },1000)
 }) 
}

next(){
  let i=this.index;
  if(this.index<this.questions.length){
    this.actuelQuestion=this.questions[i];  
  }
  this.index++;
  
  this.initReponse();
}
setTestTotalTime(){
  this.questions.forEach(element => {
    let d=element.duree.split(":");
    this.ss+=parseInt(d[1]);
    this.min+=parseInt(d[0]);
    if(this.ss>=60){
      this.ss=60-this.ss;
      this.min+=1;
    }
  });
  if(this.min<10){
    this.min="0"+this.min+'';
  }
  if(this.ss<10){
    this.ss="0"+this.ss+'';
  }
  this.totalDureeSecond=(this.min*60)+this.ss;
  this.totalDuree=this.min+":"+this.ss;
}
timerStart(){
  let min=0;
  let ss=0;
  let promise=setInterval(()=>{
    if((this.min==min&&this.ss==ss)||(this.index>this.questions.length)){
      clearInterval(promise);
      this.closeTest();
      this.send();
    }
    else{
      if(ss>=60){
        ss=60-ss;
        min+=1;
      }
      else{
        ss+=1;
      }
    }
    let minStr:any=min;
    let ssStr:any=ss;
    if(min<10){
      minStr="0"+min+'';
    }
    if(ss<10){
      ssStr="0"+ss+'';
    }
    this.timer=minStr+":"+ssStr;
  },1000)
}
closeTest(){
  this.message=" ";
  this.welcomeMessage=" ";
  this.end=true;
  setTimeout(()=>{
    this.closeSession=true;
    this.end=false;
  },10000)
}
initReponse(){
  this.actuelQuestion.reponses.forEach((element,index )=> {
    let reponse={question:{id:this.actuelQuestion.id},invitation:{id:{offre:{id:this.invitationId.idOffre},candidat:{username:this.invitationId.username}}},duree:"",reponseBol:false,
    reponseText:this.actuelQuestion.typeQuestion=='PROGRAMMATION'?this.actuelQuestion.langage.defaultText:"",reponse:{id:element.id},type:this.actuelQuestion.typeQuestion};
    this.reponses.push(reponse);
  });
  this.questionTimerStart();
}
send(){
  this.activeBtn=false;
  clearTimeout(this.promise);
    this.service.candidatReponse(this.reponses).subscribe(res=>{
      this.activeBtn=true;
      this.reponses=[];
      this.next();
     })
     
 }
 questionTimerStart(){
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
}
