import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbRadioModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserComponent,
    CreateUserComponent,
    ViewUserComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,  
    NbCheckboxModule,
    NbRadioModule, 
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
