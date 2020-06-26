import { Component, OnInit ,Input , Output,EventEmitter} from '@angular/core';
import {SharedService} from './../../shared.service';
import { ReponseRepLibre} from './../../reponse-rep-libre';
@Component({
  selector: 'app-reponses-libre',
  templateUrl: './reponses-libre.component.html',
  styleUrls: ['./reponses-libre.component.css']
})
export class ReponsesLibreComponent implements OnInit {
  private qcmItems:Array<ReponseRepLibre>;
  @Output()
  itemsChange= new EventEmitter();
   constructor(private sharedService:SharedService) { }
 
   ngOnInit() {
     this.sharedService.subject.subscribe(item=>{
       this.items.push(item);
     })
   }
   @Input()
   get items(){
     return this.qcmItems;
   }
   set items(value){
    this.qcmItems=value;
    this.itemsChange.emit(this.qcmItems);
  }
   delete(i){
     let _items=[];
     this.items.forEach(function(el,index){
       if(i!=index){
         _items.push(el);
       }
     });
     this.items=_items;
   }
 

}
