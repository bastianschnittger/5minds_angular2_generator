import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {<%=moduleName%>MockRepository} from './repositories';
import {<%=moduleName%>DefaultService} from './services';
import {<%=moduleName%>RoutingModule} from './<%=moduleFileName%>-routing.module';
import {<%=moduleName%>Component} from './<%=moduleFileName%>.component';

@NgModule({
  imports: [
    CommonModule,
    <%=moduleName%>RoutingModule,
  ],
  declarations: [
    <%=moduleName%>Component,
  ],
  exports: [
    <%=moduleName%>Component,
  ],
  providers: [
    {
      provide: 'I<%=moduleName%>Repository',
      useClass: <%=moduleName%>MockRepository,
    },
    {
      provide: 'I<%=moduleName%>Service',
      useClass: <%=moduleName%>DefaultService,
    },
  ],
})

export class <%=moduleName%>Module {}
