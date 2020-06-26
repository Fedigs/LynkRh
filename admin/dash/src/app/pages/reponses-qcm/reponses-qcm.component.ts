import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {SharedService} from './../../shared.service';
import { ReponseQcm} from './../../reponse-qcm';
@Component({
  selector: 'app-reponses-qcm',
  templateUrl: './reponses-qcm.component.html',
  styleUrls: ['./reponses-qcm.component.css']
})
export class ReponsesQcmComponent implements OnInit {

 private repItems:Array<ReponseQcm>;
 
  constructor(private sharedService:SharedService) { }

  ngOnInit() {
    this.sharedService.subject.subscribe(item=>{
      this.repItems.push(item);
    })
  }
  @Input()
  get items(){
    return this.repItems;
  }
  @Output()
  itemsChange= new EventEmitter();

  set items(value){
    this.repItems=value;
    this.itemsChange.emit(this.repItems);
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
