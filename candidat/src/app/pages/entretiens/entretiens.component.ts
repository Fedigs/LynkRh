import { Component, OnInit } from '@angular/core';
import { CandidatService } from '../../candidat.service';

@Component({
  selector: 'app-entretiens',
  templateUrl: './entretiens.component.html',
  styleUrls: ['./entretiens.component.scss']
})
export class EntretiensComponent implements OnInit {
  entretiens=[];
  entretiens2=[];
  entretien={};
  user=[];
  username;
   offre=[];
entretiensPréliminaire=[];
entretiensDefinitive=[];
 pages=[];
typeEntretien;
pageEntretien;
pageCourant=0;
private option:any={size:7,page:0,status:0,username:"",titre:"",date:""};
value;


  constructor(private service:CandidatService) { }

  ngOnInit() {
    
   this.value=0;
   this.getEntretiens(0);
   this.doAction(0);
   console.log("pages.length::::",this.pages.length)
    
    
   

    
  }
  getEntretiens(valeur){
    this.entretiens=[];
    this.pageEntretien=[];
    console.log("valuer:::::",valeur)

    this.service.user().subscribe(res=>{
      this.user=res;
      console.log("user:::::::::",res.username)
      this.service.getEntretiens(res.username,this.option,valeur).subscribe(res=>{
        console.log("res::::",res);
        this.pageEntretien=res;
        console.log("pageEntretien",this.pageEntretien)

        this.pages= new Array(res.totalPages);
        console.log("this.pages.legth dans le service",this.pages)
        this.entretiens=[];
        this.entretiens2=[];
        
        //this.TrierParDate(res.content);
          for(let el of res.content){
              this.entretiens.push(el);
              this.entretiens2.push(el);
         
          } 
          
       
        
         
          console.log("les entretiens::::",this.entretiens);
          
       })
    })
    

  }
 
 infoInvitation(entretien){
   this.offre=[];
   let idOffre=entretien.offre.id;
   entretien.vu=true;
   console.log("::::",this.offre)
   console.log("id offre::::",idOffre);
   //console.log("invitations",this.invitations);*/
   for(let el of this.entretiens ){
     if(el.offre.id==idOffre){
      this.offre.push(el.offre);
     }
      
   }

   console.log("offre:::::",this.offre)
   console.log(":::::",this.entretiens)
   this.service.saveEntretien(entretien).subscribe(res=>{
   
    console.log("new entretien",res)
     });

  
 } 
 /*TrierParDate(entretiens){
 

entretiens.sort(function(a, b){
  if ( a.dateEntretien < b.dateEntretien)
      return -1;
  if ( a.dateEntretien > b.dateEntretien )
      return 1;
  return 0;
});
  console.log("entretien triés::::::::",entretiens);

 }*/
 
 doAction(value){
this.value=value;
   if(value==0){
     this.getEntretiens(0);
   }else if(value==1){
    this.getEntretiens(1);
}else{
   this.getEntretiens(2);
 }
   
  
 }
 paginate(p){
  if(p=='p'){
    this.pageCourant-=1;
    this.option.page=this.pageCourant;
  }
  else if(p=='n'){
    this.pageCourant+=1;
    this.option.page=this.pageCourant;
  }
  else{
    this.pageCourant=p;
    this.option.page=p;
  }
  this.getEntretiens(this.value);
}
 
}
