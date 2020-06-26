import { Component, OnInit,TemplateRef,ViewChild,ViewContainerRef } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Router,NavigationEnd} from '@angular/router';
import { LynkService } from './lynk.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SharedService } from './shared.service';
import{RouteGuard} from './guard';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public modalRef: BsModalRef;
  @ViewChild("template")
  public template: TemplateRef<any>;
  @ViewChild("deleteModal")
  public deleteModal: TemplateRef<any>;
  @ViewChild("addQuestionToTestModal")
  public addQuestionToTestModal: TemplateRef<any>;
  @ViewChild("addTestModal")
  public addTestModal: TemplateRef<any>;
  private userDetails:any={};
  public tests:any=[];
  public titre;
  public idTest;
  private notification:any=[];
  public config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: true
  };
  public config1 = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };
public tag='';
public currentUser:any={};
     constructor(public location: Location
      ,private vcr: ViewContainerRef,private toastr: ToastsManager,
      private modalService: BsModalService,private router:Router,private service:LynkService,public sharedService:SharedService,public guard: RouteGuard) {
        this.toastr.setRootViewContainerRef(vcr);
      }
    ngOnInit(){
      this.sharedService.subject.subscribe(data=>{
        if(data.modal){
          console.log(data.modal);
          if(data.modal.type=='delete'){
            this.tag=data.modal.tag;
            this.modalRef=this.modalService.show(this.deleteModal,Object.assign({}, this.config1, {class: 'gray modal-md'}));
          }
          else if(data.modal.type=='questionToTest'){
            this.initTests();
            this.modalRef=this.modalService.show(this.addQuestionToTestModal,Object.assign({}, this.config1, {class: 'gray modal-md'}));            
          }
          else if(data.modal.type=='newTest'){
            this.modalRef=this.modalService.show(this.addTestModal,Object.assign({}, this.config1, {class: 'gray modal-md'}));            
          }
        }
        if(data.toastr){
          if(data.toastr.type=='success'){
            this.notification.push(this.toastr.success(data.toastr.message));
          }
          if(data.toastr.type=='error'){
            this.notification.push(this.toastr.error(data.toastr.message));
          }

        }
      });
    }
    initTests(){
      
            this.service.getTests().subscribe(res=>{
              this.tests=res;
            });
        }
        createTest(){
          if(this.titre.length>0){
            let data={titre:this.titre};
            this.service.createTest(data).subscribe(res=>{
              if(res.error==false){
                this.toastr.success('Le test est ajoutée');
                this. initTests();
               }
               else{
                this.toastr.warning(res.test);
                 console.log("els")
                //this.bsModalRef.hide();
                
               }
            });
          }
        }
        addToTest(){
         this.sharedService.subject.next({modal:{type:"questionToTestRep",idTest:this.idTest}});
         this.modalRef.hide();
       }
addTest(){
  if(this.titre.length>0){
    let data={titre:this.titre};
    this.service.createTest(data).subscribe(res=>{
      if(res.error==false){
        this.modalRef.hide();
        this.toastr.success('Le test est ajoutée');
        this.sharedService.subject.next({modal:{type:"newTestRep",ok:true}});
        
       }
       else{
        this.toastr.warning(res.test);
        //this.bsModalRef.hide();
        
       }
    });
  }
}
delete(){
  this.modalRef.hide();
  this.sharedService.subject.next({modal:{type:"deleteRep",tag:this.tag}});
}
    isMap(path){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.slice( 1 );
      if(path == titlee){
        return false;
      }
      else {
        return true;
      }
    }
    public openModal() {
      this.modalRef = this.modalService.show(this.template,Object.assign({}, this.config, {class: 'gray modal-md'}));
    }
    showSuccess(m) {
      this.toastr.clearToast(this.notification);
      this.toastr.success(m, 'Success!');
    }
  
    showError(m) {
      this.toastr.clearToast(this.notification);
      
      this.toastr.error(m, 'Oops!');
    }
  
    showWarning(m) {
      this.toastr.clearToast(this.notification);  
      this.toastr.warning(m, 'Alert!');
    }
  
    showInfo(m) {
      this.toastr.clearToast(this.notification);      
      this.toastr.info(m);
    }
    
    showCustom() {
      this.toastr.clearToast(this.notification);      
      this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
    }
}
