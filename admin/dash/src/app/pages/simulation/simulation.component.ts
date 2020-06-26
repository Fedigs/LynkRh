import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { SharedService} from './../../shared.service';
import { Data} from './../../data';
import { LynkService} from './../../lynk.service';
import { Question} from './../../question';
import { ReponseQcm} from './../../reponse-qcm';
import { ReponseProg} from './../../reponse-prog';
import { ReponseRepLibre} from './../../reponse-rep-libre';
import * as moment from 'moment';
@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {
private question:Question;
private tempsEcoule:string;
private reponses:Array<any>;
private end:boolean=false;
  constructor(private route:ActivatedRoute,private router:Router,private data:Data,private service:LynkService) { }

  ngOnInit() {
    
    this.question=this.data.storage;
    console.log(this.question)
    if(this.question===undefined){
      console.log("okkk")
      this.router.navigate(['/question']);
    }
    this.start();
    if(this.question.typeQuestion==="PROGRAMMATION"){
      this.reponses=new Array<ReponseProg>();
      this.reponses=this.question.reponses;
      this.reponses[0].reponseText=this.question.langage.defaultText;
    }
    else if(this.question.typeQuestion==="QCM"){
      this.reponses=new Array<ReponseQcm>();
      this.reponses=this.question.reponses;
      this.reponses.forEach((el)=>{
        el.reponseBol=false;
      })
    }
    else{
      this.reponses=new Array<ReponseRepLibre>();
      this.reponses.push(new ReponseRepLibre(""));
    }
    
  }
  send(){
    this.end=true;
    this.service.send(this.reponses,this.question.typeQuestion).subscribe((res)=>{
      console.log(res);
    });
  }
 start(){
   let mm=0;
   let ss=0;
   let timer=setInterval(()=>{
    if(this.question===undefined){
      clearInterval(timer);
    }
     if(this.end){
      clearInterval(timer);
     }
     if(this.tempsEcoule===moment(this.question.duree,"mm:ss").format("mm:ss")){
       clearInterval(timer);
       this.send();
     }
     else{
       if(ss==60){
         mm++;
         ss=0;
       }
       if(mm<=9){
         this.tempsEcoule="0"+mm+":";
       }
       else{
         this.tempsEcoule=mm+":";
       }
       if(ss<=9){
        this.tempsEcoule=this.tempsEcoule+"0"+ss;
      }
      else{
        this.tempsEcoule=this.tempsEcoule+ss;
      }
       ss++;       
     }
   },1000);
 }
}
