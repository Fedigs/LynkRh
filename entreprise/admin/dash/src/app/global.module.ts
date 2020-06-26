import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule,XHRBackend, RequestOptions,Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { LbdModule } from './lbd/lbd.module';
import { InterceptorService } from 'ng2-interceptors';
import { UserComponent } from './user/user.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { ModalModule } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LynkService } from './lynk.service';
import { RouteGuard } from './guard';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastOptions} from 'ng2-toastr';
import { ServerUrlInterceptorService } from './server-url-interceptor.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedService} from './shared.service';
import{Data} from './data';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AceEditorModule } from 'ng2-ace-editor';
import { UiSwitchModule } from '../../node_modules/angular2-ui-switch/src';
import { TooltipModule } from 'ngx-bootstrap';
import { ChartsModule } from 'ng2-charts';
import {NgSelectModule} from '@ng-select/ng-select';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, serverURLInterceptor:ServerUrlInterceptorService){ // Add it here
  let service = new InterceptorService(xhrBackend, requestOptions);
  service.addInterceptor(serverURLInterceptor); // Add it here
  return service;
}
export class CustomOption extends ToastOptions {
  animate = 'flyRight'; // you can override any options available
  newestOnTop = false;
  showCloseButton = true;
  positionClass='toast-bottom-right';
}
export const COMPONENTS=[ UserComponent,
  TablesComponent,
  TypographyComponent,
  IconsComponent,
  MapsComponent,
  NotificationsComponent,
  UpgradeComponent,]
export const MODULES=[ BrowserModule,NgSelectModule,
  BrowserModule,
  FormsModule,
  HttpModule,
  NavbarModule,
  FooterModule,
  SidebarModule,
  RouterModule,
  LbdModule,ModalModule, BrowserAnimationsModule, ToastModule,NgbModule,
  FroalaEditorModule,
  FroalaViewModule,
  AceEditorModule,UiSwitchModule,TooltipModule,ChartsModule,NgxMyDatePickerModule]
  export const SERVICES=[
    RouteGuard,BsModalService,LynkService,SharedService,Data,{provide: ToastOptions, useClass: CustomOption}/* {
      provide: Http,
      useFactory: interceptorFactory,
      deps: [XHRBackend, RequestOptions, ServerUrlInterceptorService] 
    } ,ServerUrlInterceptorService */
  ]
@NgModule({
  imports:[
    BrowserModule,
    FormsModule,
    HttpModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    RouterModule,
    LbdModule,ModalModule.forRoot(), BrowserAnimationsModule, ToastModule.forRoot(),NgbModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    AceEditorModule,UiSwitchModule,TooltipModule.forRoot(),ChartsModule,NgxMyDatePickerModule.forRoot()
  ],
  exports: [
    ...MODULES
  ],
  providers:[...SERVICES]

})
export class GlobalModule { 
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: GlobalModule,
      providers: [
        ...SERVICES
      ],
    };
  }
}