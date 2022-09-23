import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { MainCategoryComponent } from './main-category/main-category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';

const routes: Routes = [{
  path: '',
  component: CategoryComponent,
  children: [
    {
      path: 'main-category',
      component: MainCategoryComponent,
    },
    {
      path: '**',
      redirectTo: 'main-category',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
