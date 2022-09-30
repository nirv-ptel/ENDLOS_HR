import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserTimeSheetComponent } from './user-time-sheet/user-time-sheet.component';
import { UserComponent } from './user.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  children: [
    {
      path: 'create-user',
      component: CreateUserComponent,
    },
    {
      path: 'view-user',
      component: ViewUserComponent,
    },
    {
      path: 'one-user/:id',
      component: UserTimeSheetComponent,
    },
    {
      path: '**',
      redirectTo: 'create-user',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
