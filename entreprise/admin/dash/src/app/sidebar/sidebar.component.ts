import { Component, OnInit } from '@angular/core';
import { SharedService } from './../shared.service';
import { Router,NavigationEnd} from '@angular/router';
import { LynkService } from './../lynk.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    id:number;
    display:boolean;
}
// on a ajouter id qui refere les ids des fonctionnalités dans la base de données pour une fonctionnalité avec id 0 ç avaut dire on le gére pas
export const ROUTES: RouteInfo[] = [
    { path: '/pages/dashboard', title: 'Dashboard',  icon: 'pe-7s-home', class: '', id: 0, display: true},
    { path: '/pages/user', title: 'User Profile',  icon:'pe-7s-user', class: '', id: 0 , display: true },
    { path: '/pages/accounts', title: 'Comptes utilisateurs',  icon: 'pe-7s-users', class: '', id: 1 , display: false },
    { path: '/pages/cv', title: 'Liste des offres',  icon: 'pe-7s-news-paper', class: '', id: -1 , display: false },
    // { path: '/pages/questions', title: 'Questions',  icon: 'pe-7s-help1', class: '' , id: 2 , display:false },
    // { path: '/pages/cv-anonymes', title: 'CV Anonyme',  icon:'pe-7s-paperclip', class: '', id: 0 , display: true },
    // { path: '/pages/tests', title: 'Tests',  icon:'pe-7s-note2', class: '', id: 3 , display: false },
    // { path: '/pages/competences', title: 'Competences',  icon:'pe-7s-note2', class: '', id: 4 , display: false},
//     { path: 'typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '' , id:0 , display:  true},
//     { path: 'icons', title: 'Icons',  icon:'pe-7s-science', class: '' , id: 0 , display:  true},
//     { path: 'maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' , id: 0 , display: true},
//     { path: 'notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '', id: 0 , display: true},
//     { path: 'upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class: 'active-pro' , id: 0 , display: true},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public userDetails:any={};
  constructor(private sharedService:SharedService,private router:Router,private service:LynkService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.sharedService.subject.subscribe(data=>{
        if(data.currentUser){
            this.userDetails=data.currentUser;
            console.log("currentuser slider")
            console.log(this.userDetails);
          /*   if(this.userDetails.role=='GESTIONNAIRE'){
                this.userDetails.fonctions.forEach(el=>{
                    this.menuItems.map(m=>{
                        if(el.id==m.id){
                            m.display=true;
                        }
                    })
                })
            }
            else{ */
                this.menuItems = this.menuItems.filter(menuItem => {
                    console.log("filter")
                    menuItem.display=true;
                    return menuItem;
                });
           // }
        }
        console.log( this.userDetails);
        console.log(this.menuItems)
    });
    setInterval(()=>{
        //console.log(this.userDetails);
    },1000)
  }
deconnexion(){
    this.service.logout().subscribe(res=>{
        this.router.navigate(["/login"]);
    })
  
}
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
