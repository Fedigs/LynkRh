import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the LynkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LynkProvider {

  baseUrl: string;
  private headers;
  constructor(public http: Http) {
    this.baseUrl = 'http://localhost:8080';
    console.log('Hello LynkProvider Provider');
  }

  login(credential) {
    let headers = new Headers({
      //  'Authorization': 'Basic ' + btoa(credential.username + ':' + credential.password),
      'X-Requested-With': 'XMLHttpRequest' // to suppress 401 browser popup
    });
    headers.append('Content-Type', 'application/json');
    //  this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let params = new URLSearchParams();
    params.append('username', credential.username);
    params.append('password', credential.password);
    let options = new RequestOptions({ headers: headers, params: params, withCredentials: true });
    let url = this.baseUrl + '/login';
    return this.http.post(url, {}, options)
      .map((res) => {
        console.log(res);
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error.json().error || 'Server error');
      });
  }

  logout(){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    // this.headers.append('Authorization', 'Basic ' + btoa(credential.username + ':' + credential.password));
    let options = new RequestOptions({ headers: this.headers, withCredentials:true });
    let url = this.baseUrl + '/logout';
    return this.http.get(url,options)
    .map((res) => {
      console.log(res);
      localStorage.clear();
      return res.json();
    }).catch((error:Response) => {
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  getOffres(option) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:8100');
    let options = new RequestOptions({ headers: this.headers, withCredentials: true });
    let url = this.baseUrl + '/offres?size=' + option.size + '&page=' +
      option.page + '&username=' + option.username + '&status='
      + option.status + '&titre=' + option.titre + '&date=' + option.date;
    return this.http.get(url, options)
      .map((res) => res.json())
      .catch((error: Response) => {
        return Observable.throw(error.json().error || 'Server error');
      });
  }

  inviterEntretienDefinitif(candidat,entretien,date,selectedLieuxId,idOffre) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url = this.baseUrl + '/inviterEntretienDefinitif?candidatUsername=' +
      candidat + '&date=' + date + '&lieu=' + selectedLieuxId + '&idOffre=' + idOffre;
    return this.http.post(url,entretien,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  getLieux() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:8100');
    let options = new RequestOptions({ headers: this.headers, withCredentials: true });
    let url = this.baseUrl + '/lieux';
    return this.http.get(url, options)
      .map((res) => res.json())
      .catch((error: Response) => {
        return Observable.throw(error.json().error || 'Server error');
      });
  }

  getCvAnonyme(entreprise,idOffre,size,page){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url = this.baseUrl + '/cvAnonyme?entreprise=' + entreprise
        + '&idOffre=' + idOffre + '&size=' + size + '&page=' + page;
    return this.http.get(url,options)
    .map((res)=> res.json())
    .catch((error:Response)=>{
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  getCompetenceInitValues(){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url = this.baseUrl + '/profile/initValues';
    return this.http.get(url,options)
    .map((res) => res.json())
    .catch((error:Response) => {
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  updateOffre(offre) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url = this.baseUrl + '/offre';
    return this.http.post(url,offre,options)
    .map((res) => res.json())
    .catch((error:Response) => {
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  getEntrepriseProfile() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    let options = new RequestOptions({ headers: this.headers,withCredentials:true});
    let url = this.baseUrl + '/EntrepriseProfile';
    return this.http.get(url, options)
    .map((res) => res.json())
    .catch((error:Response) => {
      return Observable.throw(error.json().error || 'Server error');
    });
  }
}
