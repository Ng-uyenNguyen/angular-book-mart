import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginBoxComponent } from './login-box/login-box.component';
import { SignupComponent } from './login-box/signup/signup.component';
import { SigninComponent } from './login-box/signin/signin.component';
import { ShareModule } from '../shared/share-module.module';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginBoxComponent,
    SignupComponent,
    SigninComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild([{ path: 'auth', component: AuthComponent }])
  ],
  exports: [
    LoginBoxComponent,
    SignupComponent,
    SigninComponent,
    AuthComponent,
  ],
})
export class AuthModule { }
