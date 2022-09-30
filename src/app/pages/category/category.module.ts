import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { MainCategoryComponent } from './main-category/main-category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbDialogModule, NbInputModule, NbRadioModule, NbSelectModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { MatTreeModule } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    CategoryComponent,
    MainCategoryComponent,
    SubCategoryComponent
  ],
  imports: [
    CommonModule,
    MatTreeModule,
    Ng2OrderModule,
    MatTableModule,
    Ng2SmartTableModule,
    NgxPaginationModule,
    NbCardModule,
    NbButtonModule,
    NbCheckboxModule,
    NbSelectModule,
    NbRadioModule, 
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    NbDialogModule.forChild(),
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
