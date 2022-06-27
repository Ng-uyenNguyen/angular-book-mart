import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../interfaces/cart.interface';
import { Book } from '../model/book.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartState = new BehaviorSubject('out');

  cart: Cart = {
    books: [],
    totalAmount: 0,
    totalPrice: 0,
  }
  cartChanged = new BehaviorSubject(this.cart);

  constructor() { }

  getCart() {
    return this.cartChanged;
  }

  addToCart(book: Book) {
    let index = this.cart.books.findIndex(item => item.book.id === book.id);

    if (index === -1) {
      this.cart.books.push({ book: book, amount: 1, subTotal: book.price });
      this.cart.totalAmount++;
      this.cart.totalPrice += book.price
    }
    else {
      this.cart.books[index].amount++;
      this.cart.books[index].subTotal *= this.cart.books[index].amount;
      this.cart.totalAmount++;
      this.cart.totalPrice += book.price

    }
    this.cartChanged.next(this.cart);
  }

  changeState(state: string) {
    this.cartState.next(state);
  }


}
