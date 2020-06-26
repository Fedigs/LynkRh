import {Component,OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import { CompleterService, CompleterData } from 'ng2-completer';
import {CandidatService} from './../../candidat.service';
import { GlobalState} from './../../global.state';
@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register implements OnInit{

  public form:FormGroup;
  public nom:AbstractControl;
  public prenom:AbstractControl;
  public username:AbstractControl;
  public adresse:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public tel:AbstractControl;
  public cv:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;
  public submitted:boolean = false;
  private reponse:any={};
  protected dataService: any={};
  protected searchData = [];
  private lieux:any=[];
  constructor(fb:FormBuilder,private service:CandidatService,private completerService: CompleterService,private globalState:GlobalState) {

    this.form = fb.group({
      'nom': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'prenom': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'adresse': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'tel': ['', Validators.compose([Validators.required, Validators.minLength(8),Validators.pattern("[0-9]*")])],
      'cv': ['', Validators.compose([Validators.required])],
      'username': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.nom = this.form.controls['nom'];
    this.prenom = this.form.controls['prenom'];
    this.adresse = this.form.controls['adresse'];
    this.tel = this.form.controls['tel'];
    this.cv = this.form.controls['cv'];
    this.username = this.form.controls['username'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }
  ngOnInit(): void {
    this.getLieux();
    this.dataService = this.completerService.local(this.searchData, 'nom', 'nom');
    this.globalState.subscribe("cvUpload",(file)=>{
     if(file){
       let ext =file.name.split('.').pop();
       if(ext=="pdf"||ext=="doc"||ext=="docx"){
        this.cv.setValue(file);
       }
       else{
        this.cv.setValue("");
       }
     }
      this.form.controls['cv'].markAsTouched();
    })
    this.globalState.subscribe("auto-completer-selection",(data)=>{
      this.adresse.setValue(data.nom);
    })
    this.globalState.subscribe("auto-completer-creation",(data)=>{
      console.log(data);
    })
  }
  getLieux(){
    this.service.getLieux().subscribe(res=>{
      this.lieux=res;
      this.dataService=res;
      this.dataService = this.completerService.local(this.dataService, 'nom', 'nom');
    })
  }
  beforeUpload(event){
    console.log(event);
  }
  onSubmit(values:any){
    console.log(values)
    this.submitted = true;
    this.reponse={};
    if (this.form.valid) {
      values.password=values.passwords.password;
      this.service.inscrire(values).subscribe(res=>{
        this.reponse=res;
        if(this.reponse.error==false){
          this.cv.setValue("");
          this.form.reset();
        }
        console.log(this.reponse)
      })
    }
  }
}
