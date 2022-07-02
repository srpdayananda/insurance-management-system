import { ManagerGuard } from './core/guards/manager-guard/manager.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'manager',
    loadChildren: () =>
      import('./modules/manager/manager.module').then((m) => m.ManagerModule),
    canActivate: [ManagerGuard]
  },
  {
    path: 'advisor',
    loadChildren: () =>
      import('./modules/advisor/advisor.module').then((m) => m.AdvisorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
