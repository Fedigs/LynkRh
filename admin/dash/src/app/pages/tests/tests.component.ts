import { Component, OnInit } from '@angular/core';
import { SharedService} from './../../shared.service';
import { Router} from '@angular/router';
import {LynkService} from './../../lynk.service';
@Component({
  selector: 'app-user',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  private tests=[];
  private pages=[];
  private pageCourant=0;
  private options={size:10,page:0};
  private idTest;
  private tests_tag="tests_tag";
  constructor(private sharedService:SharedService, private router: Router,private service:LynkService) { }

  ngOnInit() {
    this.listTest();
    this.sharedService.subject.subscribe(data=>{
      if(data.modal){
        if(data.modal.type=='newTestRep'&&data.modal.ok){
          
          this.listTest();
        }
        else if(data.modal.type=='deleteRep'&&data.modal.tag==this.tests_tag){
          this.service.deleteTest(this.idTest).subscribe(res=>{
            if(res.error==false)
            {
            this.sharedService.subject.next({toastr:{type:'success',message:'Le test est supprimé'}});
            this.listTest();
            }
            else{
              this.sharedService.subject.next({toastr:{type:'error',message:'Une erreur est survenue'}});
            }
          },error=>{
            this.sharedService.subject.next({toastr:{type:'error',message:'Une erreur est survenue'}});
          })
        }
      }
     
     /*  if(data.type=='test'){
        this.service.delete(data.id).subscribe(res=>{
          if(res.error==false)
          {
          this.sharedService.subject.next({ok:true});
          this.toastr.success('Le test est supprimé', 'Success!');
          this.listTest();
          }
          else{
            this.toastr.warning('Une erreur est survenue', 'Erreur!');
          }
        })
      }
      else if(data.type=='addTest'){
        if(data.ok==1){
          this.toastr.success('Le test est ajouté', 'Success!');
          this.listTest();
        }
      } */
    }) 
  }
listTest(){
  this.service.listTest(this.options).subscribe(res=>{
    this.tests=res;
    this.pages= new Array(res.totalPages);
  });
}
public openDeleteModal(id) {
  this.idTest=id;
  this.sharedService.subject.next({modal:{type:"delete",tag:this.tests_tag}});
}
public openAddTestModal() {
 this.sharedService.subject.next({modal:{type:"newTest"}});
}
changeSize(){
  this.options.page=0;
  this.listTest();
}
paginate(p){
  if(p=='p'){
    this.pageCourant-=1;
    this.options.page=this.pageCourant;
  }
  else if(p=='n'){
    this.pageCourant+=1;
    this.options.page=this.pageCourant;
  }
  else{
    this.pageCourant=p;
    this.options.page=p;
  }
  this.listTest();
}
info(id){
  this.router.navigate(['/pages/test'],{queryParams:{id:id}});
}

}
