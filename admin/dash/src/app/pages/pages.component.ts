import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'pages',
  template: `
  <div class="wrapper" >  
<div class="sidebar" data-color="green" data-image="">   
  <app-sidebar></app-sidebar>
  <div class="sidebar-background" style="background-image: url(/assets/img/sidebar-7.jpg)" ></div>
</div>
<div class="main-panel">
  <navbar-cmp></navbar-cmp>    
  <router-outlet >
  </router-outlet>   
  <footer-cmp></footer-cmp>
</div>

</div>
    `
})
export class Pages {
  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);
 
  

  constructor() {
  }

  ngOnInit() {

  }
}
