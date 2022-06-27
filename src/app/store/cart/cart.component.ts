import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Cart } from 'src/app/core/interfaces/cart.interface';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('cartState', [
      state('in', style({
        transform: 'translateX(0%)',
        opacity: 1
      })),
      state('out', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition('out <=> in', [
        animate('.2s')
      ])
    ])]
})
export class CartComponent implements OnInit {
  cart: Cart;
  state: string;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartChanged.subscribe(cart => this.cart = cart);
    this.cartService.cartState.subscribe(state => this.state = state);
  }

  closeCart(): void {
    this.cartService.changeState('out');
  }
}
