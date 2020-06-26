import { Injectable} from '@angular/core';
import { Http,Headers,Response,RequestOptions,URLSearchParams} from '@angular/http';
import {baseUrl} from './config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class CandidatService {
private headers;
public uploadUrl=baseUrl+"/candidat/photo";
public downloadCvUrl=baseUrl+"/candidat/download/cv";
public baseUrl=baseUrl;
  constructor(private http:Http) { }
  getInitValues(){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/profile/initValues";
    return this.http.get(url,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  inscrire(candidat){
    this.headers = new Headers();
    //this.headers.append('Content-Type', 'application/json');
    //this.headers.append('Content-Type', 'multipart/form-data');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/candidat/inscription";
    let formData:FormData = new FormData();
    formData.append('cv', candidat.cv?candidat.cv:"", candidat.cv?candidat.cv.name:"");
    delete candidat['cv'];
    formData.append('c', new Blob([JSON.stringify(candidat)], {
      type: "application/json"
  }));
    return this.http.post(url,formData,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  login(credential){
    let headers = new Headers({ 
      //'Authorization': 'Basic ' + btoa(credential.username + ':' + credential.password),
      'X-Requested-With': 'XMLHttpRequest' // to suppress 401 browser popup
});
    headers.append('Content-Type', 'application/json');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
   let params=new URLSearchParams();
   params.append('username',credential.username);
   params.append('password',credential.password); 
   let options = new RequestOptions({ headers: headers,params:params,withCredentials:true});
    let url=baseUrl+"/login";
    return this.http.post(url,{},options)
    .map((res)=> {
      console.log(res);
    return res.json();
  })
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
getLieux(){
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/json');
  //this.headers.append('Content-Type', 'multipart/form-data');
  this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  let options = new RequestOptions({ headers: this.headers,withCredentials:true});
  let url=baseUrl+"/lieux";
  return this.http.get(url,options)
  .map((res)=> res.json())
  .catch((error:Response)=>{
    return Observable.throw(error.json().error || 'Server error');
  });
}
getCandidat(){
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/json');
  //this.headers.append('Content-Type', 'multipart/form-data');
  this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  let options = new RequestOptions({ headers: this.headers,withCredentials:true});
  let url=baseUrl+"/candidat/profile";
  return this.http.get(url,options)
  .map((res)=> res.json())
  .catch((error:Response)=>{
    return Observable.throw(error.json().error || 'Server error');
  });
}
editerProfileInfo(data){
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/json');
  //this.headers.append('Content-Type', 'multipart/form-data');
  this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  let options = new RequestOptions({ headers: this.headers,withCredentials:true});
  let url=baseUrl+"/candidat/profile";
  return this.http.post(url,data,options)
  .map((res)=> res.json())
  .catch((error:Response)=>{
    return Observable.throw(error.json().error || 'Server error');
  });
}
editerProfileCompetence(data){
  console.log(data);
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/json');
  //this.headers.append('Content-Type', 'multipart/form-data');
  this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  let options = new RequestOptions({ headers: this.headers,withCredentials:true});
  let url=baseUrl+"/competence/candidat";
  return this.http.post(url,data,options)
  .map((res)=> res.json())
  .catch((error:Response)=>{
    
    return Observable.throw(error.json().error || 'Server error');
  });
}
editerProfileContrat(data){
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/json');
  //this.headers.append('Content-Type', 'multipart/form-data');
  this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  let options = new RequestOptions({ headers: this.headers,withCredentials:true});
  let url=baseUrl+"/candidat/contrats";
  return this.http.post(url,data,options)
  .map((res)=> res.json())
  .catch((error:Response)=>{
    return Observable.throw(error.json().error || 'Server error');
  });
}
user(){
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/json');
  this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
  let options = new RequestOptions({ headers: this.headers,withCredentials:true});
  let url=baseUrl+"/user";
  return this.http.get(url,options)
  .map((res)=> {
    console.log(res);
  return res.json()})
  .catch((error:Response)=>{
    return Observable.throw(error.json().error || 'Server error');
  });
}
logout(){
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/json');
  this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
  let options = new RequestOptions({ headers: this.headers,withCredentials:true});
  let url=baseUrl+"/logout";
  return this.http.get(url,options)
  .map((res)=> {
    console.log(res);
  return res.json()})
  .catch((error:Response)=>{
    return Observable.throw(error.json().error || 'Server error');
  });
}
  uploadPhoto(file){
  this.headers = new Headers();
  this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
  let formData:FormData = new FormData();
  formData.append('photo', file?file:"", file?file.name:"");
  let options = new RequestOptions({ headers: this.headers,withCredentials:true});
  let url=this.uploadUrl;
  return this.http.post(url,formData,options)
  .map((res)=> res.json())
  .catch((error:Response)=>{
    return Observable.throw(error.json().error || 'Server error');
  });
}
  uploadCv(file){
  this.headers = new Headers();
  this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
  let formData:FormData = new FormData();
  formData.append('cv', file?file:"", file?file.name:"");
  let options = new RequestOptions({ headers: this.headers,withCredentials:true});
  let url=baseUrl+"/candidat/upload/cv";
  return this.http.post(url,formData,options)
  .map((res)=> res.json())
  .catch((error:Response)=>{
    return Observable.throw(error.json().error || 'Server error');
  });
}
removePhoto(){
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/json');
  this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  let options = new RequestOptions({ headers: this.headers,withCredentials:true});
  let url=baseUrl+"/candidat/photo";
  return this.http.delete(url,options)
  .map((res)=> res.json())
  .catch((error:Response)=>{
    return Observable.throw(error.json().error || 'Server error');
  });
}
addCompetence(data){
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/json');
  this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
  let options = new RequestOptions({ headers: this.headers,withCredentials:true});
  let url=baseUrl+"/competence";
  return this.http.post(url,data,options)
  .map((res)=> {
    console.log(res);
  return res.json()})
  .catch((error:Response)=>{
    return Observable.throw(error.json().error || 'Server error');
  });
}
getCandidatInvitations(){
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/json');
  //this.headers.append('Content-Type', 'multipart/form-data');
  this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  let options = new RequestOptions({ headers: this.headers,withCredentials:true});
  let url=baseUrl+"/invitations/candidat";
  return this.http.get(url,options)
  .map((res)=> res.json())
  .catch((error:Response)=>{
    return Observable.throw(error.json().error || 'Server error');
  });
}
getInvitation(data){
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/json');
  //this.headers.append('Content-Type', 'multipart/form-data');
  this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  let options = new RequestOptions({ headers: this.headers,withCredentials:true});
  let url=baseUrl+"/invitation?idOffre="+data.idOffre+"&username="+data.username;
  return this.http.get(url,options)
  .map((res)=> res.json())
  .catch((error:Response)=>{
    return Observable.throw(error.json().error || 'Server error');
  });
}
getTestQuestion(data){
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/json');
  //this.headers.append('Content-Type', 'multipart/form-data');
  this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  let options = new RequestOptions({ headers: this.headers,withCredentials:true});
  let url=baseUrl+"/test/questions?id="+data;
  return this.http.get(url,options)
  .map((res)=> res.json())
  .catch((error:Response)=>{
    return Observable.throw(error.json().error || 'Server error');
  });
}
candidatReponse(data){
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/json');
  this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
  let options = new RequestOptions({ headers: this.headers,withCredentials:true});
  let url=baseUrl+"/candidatReponse";
  return this.http.post(url,data,options)
  .map((res)=> {
    console.log(res);
  return res.json()})
  .catch((error:Response)=>{
    return Observable.throw(error.json().error || 'Server error');
  });
}
session(invitationId,duree){
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/json');
  this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
  let options = new RequestOptions({ headers: this.headers,withCredentials:true});
  let url=baseUrl+"/invitation/session?duree="+duree;
  return this.http.post(url,invitationId,options)
  .map((res)=> {
    console.log(res);
  return res.json()})
  .catch((error:Response)=>{
    return Observable.throw(error.json().error || 'Server error');
  });
}
getEntretiens(username,option,valeur){
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/json');
  this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  let options = new RequestOptions({ headers: this.headers,withCredentials:true});
  let url = baseUrl+"/entretiens?username="+username+"&valeur="+valeur+"&size="+option.size+"&page="+option.page;
  return this.http.get(url,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error'); 
    });

}

saveEntretien(entretien){
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/json');
  this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  let options = new RequestOptions({ headers: this.headers,withCredentials:true});
  let url = baseUrl+"/saveEntretien";
  return this.http.post(url,JSON.stringify(entretien),options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error'); 
    });
  

}

}
