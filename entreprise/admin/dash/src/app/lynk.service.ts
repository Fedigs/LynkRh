import { Injectable } from '@angular/core';
import { Http,Headers,Response,RequestOptions,URLSearchParams} from '@angular/http';
import {baseUrl} from './config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class LynkService {
  // the headers of the http query
  private headers;
  // the Url base of the http query
  public baseUrl=baseUrl;

  // injecting the dependency of the http service
  constructor(private http:Http) { }

  // service de login
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
    let options = new RequestOptions({ headers: headers, params:params, withCredentials:true});
    let url = baseUrl + '/login';
    return this.http.post(url,{},options)
    .map((res)=> {
      console.log(res);
      return res.json();
    })
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  initParams(){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/question/init_params";
    return this.http.get(url,options)
    .map((res)=> {
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  // service qui permet d'enregistrer un question
  enregistrer(question){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/question/add";
    return this.http.post(url,question,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  // service qui permet d'envoyer une reponse
  send(reponses,type){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/question/correction?tq="+type;
    return this.http.post(url,reponses,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }


  temporalStore(question){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/question/tmpStore";
    return this.http.post(url,question,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  getThemeAndDifficulteStats(option){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/question/themeAndDifficulteStats?l="+option.langage+"&t="+option.theme+"&search="+option.search;
    return this.http.get(url,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  getLangageStats(type){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/question/langagesStats?t="+type;
    return this.http.get(url,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  getQuestionsStats(option){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/question/by/criteria?t="+option.type+"&tq="+option.typeQuestion+"&th="+option.theme
    +"&l="+option.langage+"&d="+option.difficulte+"&search="+option.search+"&size="+option.size+"&page="+option.page;
    return this.http.get(url,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  getQuestion(id){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/question/get?id="+id;
    return this.http.get(url,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  copy(id){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/question/copy?q="+id;
    return this.http.get(url,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  delete(id){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/question/delete?q="+id;
    return this.http.get(url,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  getTests(){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/test";
    return this.http.get(url,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  createTest(data){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/test";
    return this.http.post(url,data,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  addToTest(data){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/test/question?id="+data.id+"&idQuestion="+data.idQuestion;
    return this.http.post(url,{},options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  listTest(data){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/test/page?size="+data.size+"&page="+data.page;
    return this.http.get(url,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  deleteTest(data){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/test?id="+data;
    return this.http.delete(url,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  getTest(id){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/test/get?id="+id;
    return this.http.get(url,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  getReponses(id){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/question/reponses?id="+id;
    return this.http.get(url,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  getCompetences(){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/competences";
    return this.http.get(url,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  getCompetence(id){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/competence?id="+id;
    return this.http.get(url,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
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
  editCompetence(data){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/competence";
    return this.http.put(url,data,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  deleteCompetence(data){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/competence?id="+data.id+"&type="+data.type;
    return this.http.delete(url,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  getUsers(data){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/users?size="+data.size+"&page="+data.page+"&role="+data.type;
    return this.http.get(url,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  addUser(data){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/user";
    return this.http.post(url,data,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  editUser(data){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/user";
    return this.http.put(url,data,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  activationUser(data){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/user/activation?username="+data.username+"&a="+data.a;
    return this.http.put(url,data,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  deleteUser(username){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/user?username="+username;
    return this.http.delete(url,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  getFonctionnalites(){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/fonctionnalites";
    return this.http.get(url,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  addDroits(data){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/droits";
    return this.http.post(url,data,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  userDroits(username){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    //this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/droits/user?username="+username;
    return this.http.get(url,options)
    .map((res)=> {
      console.log(res);
    return res.json()})
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
  getMatchingCvInitValues(){
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
  getCandidats(data){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/candidat/matching";
    return this.http.post(url,data,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }


  getEntretien(id) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url = baseUrl+"/entretien?idOffre=" + id;
    return this.http.get(url,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }


  getEntreprises(){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/entreprises";
    return this.http.get(url,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  setCandidatNote(data){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/candidat/note?username="+data.username+"&note="+data.note;
    return this.http.post(url,"",options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  // service qui permet la deconnexcion 
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
  // un service qui permet de recuperer tout les offres
  getOffres(option){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/offres?size="+option.size+"&page="+option.page+"&username="+option.username+"&status="+option.status+"&titre="+option.titre+"&date="+option.date;
    return this.http.get(url,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  // un service qui permet de recuperer un offre selon l'id
  getOffre(id){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/offre?id="+id;
    return this.http.get(url,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  // un service qui permet de recuperer un les info d'un offre selon l'id
  getOffreInfo(id){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/offre/info?id="+id;
    return this.http.get(url,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  // un service qui permet de mettre a jour un offre selon l'id de l'offre et l'id du test
  updateOffreTest(id,idTest){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/offre/test?id="+id+"&idTest="+idTest;
    return this.http.get(url,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  initalisationLieux() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url = baseUrl + "/initalisationLieux";
    return this.http.get(url,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  inviterEntretienDefinitif(candidat,entretien,date,selectedLieuxId,idOffre) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/inviterEntretienDefinitif?candidatUsername="+candidat.username+"&date="+date+"&lieu="+selectedLieuxId+"&idOffre="+idOffre;
    return this.http.post(url,entretien,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  updateAccepteEntretien(candidat,idOffre) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/updateAccepteEntretien?idOffre="+idOffre;
    return this.http.post(url,candidat.username,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  deleteOffre(idOffre,option) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/supprimerOffre?idOffre="+idOffre+"&size="+option.size+"&page="+option.page+
      "&username="+option.username+"&status="+option.status+"&titre="+option.titre+"&date="+option.date;
    return this.http.post(url,option,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  // un service qui permet de d'ajouter un offre
  addOffre(data){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/offre";
    return this.http.post(url,data,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  verifExistInvitation(entreprise,idOffre){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/verifExistInvitation?entreprise="+entreprise+"&idOffre="+idOffre;
    return this.http.get(url,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  sortScore(candidats) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/candidats/sortScore";
    return this.http.post(url,JSON.stringify(candidats),options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  getCvAnonyme(entreprise,idOffre,size,page){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/cvAnonyme?entreprise="+entreprise+"&idOffre="+idOffre+"&size="+size+"&page="+page;
    return this.http.get(url,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  // un service pour recuperer les cv-anonymes
  getCvAnonymes(entreprise) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/cvAnonymes?entreprise="+entreprise;
    return this.http.get(url,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  // addOffreEntreprise(data){
  //   this.headers = new Headers();
  //   this.headers.append('Content-Type', 'application/json');
  //   this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
  //   let options = new RequestOptions({ headers: this.headers,withCredentials:true});
  //   let url=baseUrl+"/offreEntreprise";
  //   return this.http.post(url,data,options)
  //   .map((res)=> res.json())
  //   .catch((error:Response)=>{
  //     return Observable.throw(error.json().error || 'Server error');
  //   });
  // }

  // un service qui permet de recuperer les invitations pour un offre
  offreInvitations(data){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/invitations/offre?id="+data;
    return this.http.get(url,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  // un service qui permet de recuperer les reponses d'un candidat
  getCandidatReponses(idOffre,username){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/candidatReponse?idOffre="+idOffre+"&username="+username;
    return this.http.get(url,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }
  // un service qui permet de corriger les reponses d'un candidat
  correction(data){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url=baseUrl+"/correction?id="+data.id+"&correcte="+data.correcte+"&score="+data.score;
    return this.http.get(url,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }



  //inviterCandidat() 
  //pour passer une variable il faut d'abord déclarer une cette variable dans le service lynk_service
  //
  entretien:any;

  // un service qui permet d'inviter un candidat pour un entretien preliminaire selon l'id
  inviterCandidat(entretien){

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url = baseUrl+"/inviter";
    // JSON.stringify(entretien) qui permet d'envoyer un objet json dans une requete http
    return this.http.post(url,JSON.stringify(entretien),options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });

  }
}
