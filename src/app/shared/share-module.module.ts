import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    // ToggleDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule
  ]
})
export class ShareModule { }
