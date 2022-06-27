import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { HomeComponent } from './home/home.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ShareModule } from '../shared/share-module.module';
import { SidebarComponent } from './shopping/sidebar/sidebar.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { BookComponent } from './shopping/book/book.component';
import { CartComponent } from './cart/cart.component';
import { ToggleDirective } from '../shared/directives/toggle.directive';
import { FormsModule } from '@angular/forms';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AuthGuardsService } from '../core/services/auth-guards.service';



@NgModule({
  declarations: [
    HomeComponent,
    StoreComponent,
    ShoppingComponent,
    SidebarComponent,
    ShoppingListComponent,
    BookComponent,
    CartComponent,
    ToggleDirective,
    BookDetailComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: 'store', component: StoreComponent, canActivate: [AuthGuardsService], children: [
        { path: 'home', component: HomeComponent },
        { path: 'shopping', component: ShoppingComponent },
        { path: 'book-detail/:book_id', component: BookDetailComponent },
      ]
    }]),
    ShareModule,
  ],
  exports: [StoreComponent]
})
export class StoreModule { }
