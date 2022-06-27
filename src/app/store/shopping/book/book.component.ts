import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/core/model/book.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  animations: [
    trigger('bookState', [
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0px)',
      })),
      transition('void => visible', [
        style({
          transform: 'translateY(30px)',
          opacity: 0
        }),
        animate(500)
      ]),
    ])
  ]
})
export class BookComponent implements OnInit {
  @Input() book: Book;
  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
  }
  addToCart() {
    this.cartService.addToCart(this.book);
    this.cartService.changeState('in');
  }
  onNavigate() {
    this.router.navigate(
      ['/store/book-detail/' + this.book.id]
    );
  }
}
