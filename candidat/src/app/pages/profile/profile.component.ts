import {Component,OnInit} from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator} from '../../theme/validators';
import {CandidatService} from './../../candidat.service';
import {IMyDpOptions} from 'mydatepicker';
import * as moment from 'moment';
import { GlobalState} from './../../global.state';
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'profile',
  styleUrls:['./profile.scss'],
  templateUrl: 'profile.html',
})
export class Profile implements OnInit{
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
};
  public form:FormGroup;
  public username:AbstractControl;
  public password:AbstractControl;
  public email:AbstractControl;
  public nom:AbstractControl;
  public prenom:AbstractControl;
  public adresse:AbstractControl;
  public tel:AbstractControl;
  public cv:AbstractControl;
  public submitted:boolean = false;

  private langages:any=[];
  private frameworks:any=[];
  protected searchLangage: string;
  protected searchFramework: string;
  protected dataService: any={};
  protected dataService1: any={};
  protected dataService2:any={};
  protected searchData = [];
  protected searchData1 = [];
  protected searchData2 = [];
  private autreContrat=false;
  private freelance=false;
  private stage=false;
  private typeContrat:any=[];
  private typeFreelance:any=["Plein temps","Mi-temps"];
  private lieuxTravail:any=["Bureau","Télétravail","Les deux"];
  private clearSelected=false;
  private candidat:any={};
  private reponseInfoMaj:any={}
  private reponseCompetenceMaj:any={}
  private reponseContratMaj:any={};
  private initValues:any={};
  private lieux:any=[];
  // data contrats
  private salaireJournalier=0;
  private salaireMensuel=0;
  private disponibilite:any= new Date(); 
  private disponibiliteFreelance:any= new Date();
  private dateDebutStage:any= new Date();
  private nbMois;
  private lieuTravail=this.lieuxTravail[0];
  private tpeFreelance=this.typeFreelance[0];
  private contrats:any=[];
  private modelDate1;
  private modelDate2;
  private modelDate3;
  private photo: File;
  private competence:any={};
  private langagesCompetence:any=[];
  private frameworksCompetence:any=[];
  private selectedLangagesIds:any=[];
  private selectedFrameworksIds:any=[];
 
  constructor(private service:CandidatService,fb:FormBuilder,private completerService: CompleterService,private globalState:GlobalState) {
    this.form = fb.group({
      'nom': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'prenom': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'adresse': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'tel': ['', Validators.compose([Validators.required, Validators.minLength(8),Validators.pattern("[0-9]*")])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'username': [''],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])]
    });

    this.password = this.form.controls['password'];
    this.email = this.form.controls['email'];
    this.tel = this.form.controls['tel'];
    this.prenom = this.form.controls['prenom'];
    this.nom = this.form.controls['nom'];
    this.username = this.form.controls['username'];
    this.adresse = this.form.controls['adresse'];
  }
  ngOnInit(): void {
    this.globalState.subscribe("cvUpload",(file)=>{
      this.reponseInfoMaj={};
      if(file){
        let ext =file.name.split('.').pop();
        if(ext=="pdf"||ext=="doc"||ext=="docx"){
         this.service.uploadCv(file).subscribe(res=>{
          if(res.error==false){
            this.candidat.cvUrl=res.cv;
          }
          else{
            this.reponseInfoMaj.error=true;
            this.reponseInfoMaj.message='Une erreur sur l\' upload du cv est survenue, veuillez reessayer';
          }
        });
        }
        console.log(file)
      }
     })
    this.getLieux();
    // malgré qu'on a deja initilier ces deux alement au niveau de getInitValues, nous les initialisons ici par contrainte liée au module auto completer
    this.dataService1 = this.completerService.local(this.searchData1, 'langage.nom', 'langage.nom');
    this.dataService2 = this.completerService.local(this.searchData2, 'framework.nom', 'framework.nom');
    this.dataService = this.completerService.local(this.searchData, 'nom', 'nom');
    // fin
    this.service.getCandidat().subscribe(res=>{
      this.candidat=res;
      this.setinfoPerso();
      this.getInitValues();

    })
  }
  onSubmit(values){

  }
 findLangageInCandidatCompetence(id){
  let langage:any={};
   this.candidat.competences.forEach(el=>{
    if(el.langage!=null){
      if(el.langage.id==id){
        langage=el;
        langage.selected=true;
        return ;
      }
    }
   })
   return langage;
 }
 findFrameworkInCandidatCompetence(id){
  let framework:any={};
   this.candidat.competences.forEach(el=>{
    if(el.framework!=null){
      if(el.framework.id==id){
        framework=el;
        framework.selected=true;
        return ;
      }
    }
   })
   return framework;
 }
 setFrameworksCompetence(){
   this.initValues.frameworks.forEach(el=>{
     let framework=this.findFrameworkInCandidatCompetence(el.id);
     el.framework=el;
     if(framework.id==undefined){
      let experience:any={};
      let niveau:any ={};
      experience={label:"Aucune Expérience"};
      niveau={label:"Aucun Niveau"};
      el.experience=experience;
      el.niveau=niveau;
      el.id=el.id;
      el.candidat={};
      el.candidat.username=this.candidat.username;
     }
     else{
      let experience:any={};
      experience=framework.experience;
      let niveau:any ={};
      niveau=framework.niveau;
      el.niveau=niveau;
      el.experience=experience;
      this.selectedFrameworksIds.push(el);
      el.add=true;
     }
     
   })
 }
 setLangagesCompetence(){
   this.initValues.langages.forEach(el=>{
     let langage=this.findLangageInCandidatCompetence(el.id);
     el.langage=el;
     if(langage.id==undefined){
      let experience:any={};
      let niveau:any ={};
      experience={label:"Aucune Expérience"};
      niveau={label:"Aucun Niveau"};
      el.experience=experience;
      el.niveau=niveau;
      el.id=el.id;
      el.candidat={};
      el.candidat.username=this.candidat.username;
     }
     else{
       let experience:any={};
       experience=langage.experience;
       let niveau:any ={};
       niveau=langage.niveau;
       el.niveau=niveau;
       el.experience=experience;
       this.selectedLangagesIds.push(el);
       el.add=true;
     }
       //this.langagesCompetence.push(el);    
   })

 }
 onChange(e){
console.log(e);
console.log(this.initValues.langages);

 }
 /*  isLangageExist(nom){
    let find=false;
    console.log(nom)
    this.candidat.competences.forEach((el,index)=>{
      if(el.langage){
        let nom1= this.candidat.competences[index].langage.nom.toLowerCase();
        let nom2=nom.toLowerCase();
        console.log(nom1,nom2)
        if(nom1==nom2){
          this.langageNoResult.find =true;
          this.langageNoResult.message="Aucun langage";
          find=true;
          return;
        }
      }
    })
    if(find==false){
      this.langageNoResult.find =false;
      this.langageNoResult.message="Créer "+nom;
    }
  }
  isFrameworkExist(nom){
    console.log(nom)
    let find=false;
    this.candidat.competences.forEach((el,index)=>{
      if(el.framework){
        let nom1= this.candidat.competences[index].framework.nom.toLowerCase();
        let nom2=nom.toLowerCase();
        console.log(nom1,nom2)
        if(nom1==nom2){
          this.frameworkNoResult.find =true;
          this.frameworkNoResult.message="Aucun framework";
          find=true;
          return;
        }
      }
    })
    if(find==false){
      this.frameworkNoResult.find =false;
      this.frameworkNoResult.message="Créer "+nom;
    }
  } */
  getLieux(){
    this.service.getLieux().subscribe(res=>{
      this.lieux=res;
      this.dataService = this.completerService.local(this.lieux, 'nom', 'nom');
      console.log(this.dataService)
    })
  }
/* addLangage(){
  let el=this.getSelectedLangageElement(this.searchLangage);
  if(el!=undefined){
    this.candidat.competences.push(el);
    this.filterServiceData1(this.searchLangage);
    this.dataService1=this.completerService.local(this.dataService1._data,'langage.nom','langage.nom');
    this.searchLangage="";
  }
  

}
addFramework(){
  let el=this.getSelectedFrameworkElement(this.searchFramework);
  if(el!=undefined){
    this.candidat.competences.push(el);
    this.filterServiceData2(this.searchFramework);
    this.dataService2=this.completerService.local(this.dataService2._data,'framework.nom','framework.nom');
    this.searchFramework="";
  }
  
 // this.dataService.reply();
}
filterServiceData1(nom){
  console.log(this.dataService1);
  this.dataService1._data=this.dataService1._data.filter(el=>{
    if(el.langage.nom==nom){
      return false;
    }
    return true;
  })
}
filterServiceData2(nom){
  this.dataService2._data=this.dataService2._data.filter(el=>{
    if(el.framework.nom==nom){
      return false;
    }
    return true;
  })
} */
//ajouter un element dans le service data
/* addElementToServiceData(tab,el){
  tab._data.push(el);
} */
// supprimer un langage
/* deleteLangage(nom){
this.addElementToServiceData(this.dataService1,this.getSelectedLangageElement(nom));
this.deleteSelectedElement(nom);

} */
// supprimer un langage
/* deleteFramework(nom){
this.addElementToServiceData(this.dataService2,this.getSelectedFrameworkElement(nom));
this.deleteSelectedElement(nom);
} */
//recuperer un element c-a-d un langage mais qui a aura une structure d'une competence pour facilité le sauvegarde
/* getSelectedLangageElement(nom){
  let el:any={};
  this.initValues.langages.forEach(element => {
    console.log(element)
    if(element.nom==nom){
      el.experience={label:"Aucune Expérience"};
      el.niveau={label:"Aucun Niveau"};
      el.framework=null;
      el.langage=element;
      return ;
    }
  });
  return el;
} */
/* getSelectedFrameworkElement(nom){
  let el:any={};
  this.initValues.frameworks.forEach(element => {
    if(element.nom==nom){
      el.experience={label:"Aucune Expérience"};
      el.niveau={label:"Aucun Niveau"};
      el.framework=element;
      el.langage=null;
      return ;
    }
  });
  return el;
} */
/* deleteSelectedElement(nom){
  this.candidat.competences=this.candidat.competences.filter(element => {
    let com=element.framework!=null?element.framework:element.langage;
    if(com.nom==nom){
      return false;
    }
    else{
      return true;
    }
  });
} */
setEditMode(f,b,idE,idN){
  if(b==false){
    f.experience=this.getExperience(idE);
    f.niveau=this.getNiveau(idN);
  }
f.edit=b;
}
getNiveau(idN){
  console.log(idN)
  let niveau={label:"Aucun Niveau"};
  this.initValues.niveaux.forEach(element => {
    if(element.id==idN){
      niveau=element;
      return ;
    }
  });
  return niveau;
}
getExperience(idE){
  console.log(idE)
  let experience={label:"Aucune Expérience"};
  this.initValues.experiences.forEach(element => {
    if(element.id==idE){
      experience=element;
      return ;
    }
  });
  return experience;
}
setinfoPerso(){
  this.nom.setValue(this.candidat.nom);
  this.prenom.setValue(this.candidat.prenom);
  this.adresse.setValue(this.candidat.adresse);
  this.email.setValue(this.candidat.email);
  this.tel.setValue(this.candidat.tel);
  this.username.setValue(this.candidat.username);

}
//c'est pour récupérer les info du formbuilder et le mettre dans candidat
getinfoPerso(){
  this.candidat.nom=this.nom.value;
  this.candidat.prenom=this.prenom.value;
  this.candidat.adresse=this.adresse.value;
  this.candidat.email=this.email.value;
  this.candidat.tel=this.tel.value;
  this.candidat.password=this.password.value;
  this.candidat.username=this.username.value;
}
editerInfo(){
  this.getinfoPerso();
  this.reponseInfoMaj={};
  this.service.editerProfileInfo(this.candidat).subscribe(res=>{
    this.reponseInfoMaj=res;
  })
  jQuery('html, body').animate({scrollTop:0}, {duration:1000});
}
editerCompetence(){
  this.reponseCompetenceMaj=this.verifyCompetence();
  console.log(this.selectedLangagesIds); 
  console.log(this.selectedFrameworksIds); 
  if(this.reponseCompetenceMaj.error==false){
    this.setCompetences();
    this.service.editerProfileCompetence(this.candidat.competences).subscribe(res=>{
      if(res.error==true){
        this.reponseCompetenceMaj.error=true;
        this.reponseCompetenceMaj.message=res.competence;
      }
      else{
        this.reponseCompetenceMaj.error=false;
        this.reponseCompetenceMaj.message="Vos compétences sont mises à jour ."
      }
    })
  }
  jQuery('html, body').animate({scrollTop:0}, {duration:1000});
}
verifyCompetence(){
  this.candidat.competences=[];
  let rep:any={error:false,message:""};
  this.selectedLangagesIds.forEach(el=>{
    if(el.experience.id==undefined){
      rep.error=true;
      rep.message=`Pour le langage ${el.langage.nom} l'éxpérience est obligation`;
    }
   else  if(el.niveau.id==undefined){
        rep.message=`Pour le langage ${el.langage.nom} le niveau est obligation`;
    }
    if(rep.error==true){
      return;
    }
  })
  if(rep.error==true){
    return rep;
  }
  this.selectedFrameworksIds.forEach(el=>{
    if(el.experience.id==undefined){
      rep.error=true;
      rep.message=`Pour le framework ${el.framework.nom} l'éxpérience est obligation`;
    }
   else  if(el.niveau.id==undefined){
        rep.message=`Pour le framework ${el.framework.nom} le niveau est obligation`;
    }
    if(rep.error==true){
      return;
    }
  })
  return rep;
}
// c'est pour ajouter le candidat dans les compétences afin que le serveur sache à qui appartient ces compétences
setCompetences(){
  this.candidat.competences=[];
  this.selectedFrameworksIds.forEach(el=>{
    let competence:any={};
    competence.experience=el.experience;
    competence.niveau=el.niveau;
    competence.framework={};
    competence.framework.id=el.framework.id;
    competence.candidat={};
    competence.candidat.username=this.candidat.username;
    this.candidat.competences.push(competence);
  });
  this.selectedLangagesIds.forEach(el=>{
    let competence:any={};
    competence.experience=el.experience;
    competence.niveau=el.niveau;
    competence.langage={};
    competence.langage.id=el.langage.id;
    competence.candidat={};
    competence.candidat.username=this.candidat.username;
    this.candidat.competences.push(competence);
  });
}
//c'est pour récuperer les informations concernant les type de contrat, experience, niveau lieu de travail... de la base de données
getInitValues(){
  this.service.getInitValues().subscribe(res=>{
    this.initValues=res;
    this.setLangagesCompetence();
    this.setFrameworksCompetence();
    this.typeContrat=res.typeContrat.filter(el=>{
      if(el.nom!="STAGE"&&el.nom!="FREELANCE"){
        return true;
      }
      else{
        return false;
      }
    })
    // on  met ici cette methode car typeContrat est initialé dans getInitValues
    this.setCandidatProfileContrat();
    res.langages.forEach(el=>{
      let competence:any={};
      competence.experience={experience:"",label:"Aucune Expérience"};
      competence.niveau={niveau:"",label:"Aucun Niveau"};
      competence.langage=el;
      competence.framework=null;
      this.langages.push(competence);
    })
    res.frameworks.forEach(el=>{
      let competence:any={};
      competence.experience={experience:"",label:"Aucune Expérience"};
      competence.niveau={niveau:"",label:"Aucun Niveau"};
      competence.framework=el;
      competence.langage=null;
      this.frameworks.push(competence);
    })
  })
}
onAdd(event){
console.log(event)
console.log(this.selectedLangagesIds);
}
onRemove(event){
console.log(event)
console.log(this.selectedLangagesIds);
}
editerContrat(){
  this.reponseContratMaj=this.verifyContrat();
if(this.reponseContratMaj.error==false){
  this.setContrats();
  this.service.editerProfileContrat(this.contrats).subscribe(res=>{
    if(res.error==true){
      this.reponseContratMaj.error=true;
      this.reponseContratMaj.message=res.contrat;
    }
    else{
      this.reponseContratMaj.error=false;
      this.reponseContratMaj.message="Le contrat est mis à jour ."
    }
  })
}
  jQuery('html, body').animate({scrollTop:0}, {duration:1000});
}
verifyContrat(){
  let rep={error:false,message:""};
  if(this.autreContrat==true){
    let find =false;
    this.typeContrat.forEach(el=>{   
      if(el.checked==true){
        find=true;
        return ;
      }
    })
    if(find==false){
      rep.error=true;
      rep.message="Vous devez choisir au moins un contrat pour le type salarié";
      return rep;
    }
    if(this.salaireMensuel<=0){
      rep.error=true;
      rep.message="Le salaire mensuel doit avoir une value supérieure à 0";
    }
    else if(!moment(this.modelDate1?this.modelDate1.jsdate:"").isValid()||!moment(this.modelDate1?this.modelDate1.jsdate:"").isSameOrAfter(new Date())){
      rep.error=true;
      rep.message="La date de disponibilité pour le type salarié est incorrecte"
    }
    if(rep.error==true){
      return rep;
    }
  }
  if(this.freelance==true){

    if(this.salaireJournalier<=0){
      rep.error=true;
      rep.message="Le salaire journalier doit avoir une value supérieure à 0";
    }
    else if(!moment(this.modelDate2?this.modelDate2.jsdate:"").isValid()||!moment(this.modelDate2?this.modelDate2.jsdate:"").isSameOrAfter(new Date())){
      rep.error=true;
      rep.message="La date de disponibilité  pour le type freelance est incorrecte"
    }
    if(rep.error==true){
      return rep;
    }
  }
  if(this.stage==true){
    if(!moment(this.modelDate3?this.modelDate3.jsdate:"").isValid()||!moment(this.modelDate3?this.modelDate3.jsdate:"").isSameOrAfter(new Date())){
      rep.error=true;
      rep.message="La date de début de le stage est incorrecte"
    }
    else if(this.nbMois<=0){
      rep.error=true;
      rep.message="Le nombre de mois pour le stage est incorrecte";
    }
    if(rep.error==true){
      return rep;
    }
  }
return rep;
}
setContrats(){
  if(this.autreContrat==true){
    this.typeContrat.forEach(el=>{
      if(el.checked==true){
        let contrat:any={};
        contrat.candidat={};
        contrat.candidat.username=this.candidat.username;
        contrat.typeContrat={};
        contrat.typeContrat.id=el.id;
        contrat.disponibilite=this.disponibilite;
        contrat.salaireMensuel=this.salaireMensuel;
        this.contrats.push(contrat);
      }
    })
  }
  if(this.freelance==true){
        let contrat:any={};
        contrat.candidat={};
        contrat.candidat.username=this.candidat.username;
        contrat.typeContrat={};
        contrat.typeContrat=this.getTypeContrat("FREELANCE");
        contrat.disponibilite=this.disponibiliteFreelance;
        contrat.salaireJournalier=this.salaireJournalier;
        contrat.typeFreelance=this.tpeFreelance;
        contrat.lieuTravail=this.lieuTravail;
        this.contrats.push(contrat);
  }
  if(this.stage==true){

        let contrat:any={};
        contrat.candidat={};
        contrat.candidat.username=this.candidat.username;
        contrat.typeContrat=this.getTypeContrat("STAGE");
        contrat.disponibilite=this.dateDebutStage;
        contrat.nbMois=this.nbMois;
        this.contrats.push(contrat);
  }
}

getTypeContrat(nom){
  let contrat:any={};
this.initValues.typeContrat.forEach(el=>{
  if(el.nom==nom){
    contrat=el;
    return ;
  }
})

return contrat;
}
// pour verifiy si un contrat existe dans les informations du candidat afin de checked les type de contrat au niveau de son profil
getTypecontratIfExist(tab){
  let contrat:any;
  if(tab instanceof Array){
    tab.forEach(el=>{
      let c= this.findContrat(el);
      if(c!=undefined){
        contrat=c;
        return;
      }
    })
  }
  else{
    contrat=this.findContrat(tab);
  }
  return contrat;
}
findContrat(nom){
  let contrat:any;
  this.candidat.contrats.forEach(el=>{
    if(el.typeContrat.nom==nom){
      contrat=el;
      return;
    }
  })
  return contrat;
}
// c'est pour faire apparaitre les contrats d'un candidat s'il en possede au niveau de son profil
setCandidatProfileContrat(){
  let tab=['CDI','CDD','SVIP1','SVIP2'];
  let cont1=this.getTypecontratIfExist(tab);
  if(cont1!=undefined){
    this.autreContrat=true;
    this.salaireMensuel=cont1.salaireMensuel;
    this.disponibilite=moment(cont1.disponibilite).format("YYYY-MM-DD");
    this.modelDate1={jsdate:new Date(this.disponibilite)};
    this.candidat.contrats.forEach(el=>{
      this.typeContrat.map(t=>{
        if(el.typeContrat.id==t.id){
          t.checked=true;
        }
      })
    })
  }
  let cont2=this.getTypecontratIfExist('FREELANCE');
  if(cont2!=undefined){
    this.freelance=true;
   this.disponibiliteFreelance=moment(cont2.disponibilite).format("YYYY-MM-DD");
    this.modelDate2={jsdate:new Date(this.disponibiliteFreelance)};
    this.salaireJournalier=cont2.salaireJournalier;
    this.lieuTravail=cont2.lieuTravail;
    this.tpeFreelance=cont2.typeFreelance;
  }
  let cont3=this.getTypecontratIfExist('STAGE');
  if(cont3!=undefined){
    this.stage=true;
    this.dateDebutStage=moment(cont3.disponibilite).format("YYYY-MM-DD");
    this.modelDate3={jsdate:new Date(this.dateDebutStage)};
    this.nbMois=cont3.nbMois;
  }
}
onModelDate1Changed(event){
  this.disponibilite=this.modelDate1?this.modelDate1.jsdate:"";
  console.log(this.disponibilite);
}
onModelDate2Changed(event){
  this.disponibiliteFreelance=this.modelDate2?this.modelDate2.jsdate:"";
}
onModelDate3Changed(event){
  this.dateDebutStage=this.modelDate3?this.modelDate3.jsdate:"";
}
fileChange(event) {
  console.log("changee")
  let fileList: FileList = event.target.files;
  if(fileList.length > 0) {
      this.photo= fileList[0];
      console.log(this.photo);
  }
}
}
