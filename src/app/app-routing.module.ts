import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'store', redirectTo: 'store/home', pathMatch: 'full' },
  { path: 'about', redirectTo: 'store/home', pathMatch: 'full' },
  { path: 'contact', redirectTo: 'store/home', pathMatch: 'full' },
  { path: 'blog', redirectTo: 'store/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
