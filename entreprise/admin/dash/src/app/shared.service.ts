import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
@Injectable()
export class SharedService {
public subject:Subject<any>= new Subject<any>();
  constructor() { }

}
