import {Component,Input,Output,EventEmitter,ChangeDetectionStrategy,OnInit} from '@angular/core';
import { GlobalState } from './../../global.state';
@Component({
  selector: 'auto-completer',
  templateUrl: './autoCompleter.html',
  styleUrls:['./autoCompleter.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AutoCompleter implements OnInit {
  private showDropdown=false;
  private searchText="";
 @Input()
items:any=[];
@Input()
private createAction=false;

  constructor(private globalState:GlobalState) {

  }
  ngOnInit(){
  }
onBlur(e){
 this.showDropdown=false;
}
onFocus(){
  this.showDropdown=true;
}
selectedItem(i){
  this.searchText=i.nom;
  this.showDropdown=false;
  this.globalState.notifyDataChanged("auto-completer-selection",i);
}
createItem(){
  this.globalState.notifyDataChanged("auto-completer-creation",this.searchText);
  this.searchText="";
}
}

