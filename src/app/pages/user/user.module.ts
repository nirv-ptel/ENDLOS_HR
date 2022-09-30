import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { MatTableModule } from '@angular/material/table';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserTimeSheetComponent } from './user-time-sheet/user-time-sheet.component';


@NgModule({
  declarations: [
    UserComponent,
    CreateUserComponent,
    ViewUserComponent,
    UserTimeSheetComponent
  ],
  imports: [
    CommonModule,
    Ng2OrderModule,
    MatTableModule,
    Ng2SmartTableModule,
    NgxPaginationModule,
    NbCardModule,
    NbButtonModule,  
    NbCheckboxModule,
    NbSelectModule,
    NbIconModule,
    NbRadioModule, 
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
