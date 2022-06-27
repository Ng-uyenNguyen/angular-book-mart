import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Book } from 'src/app/core/model/book.model';
import { CartService } from 'src/app/core/services/cart.service';
import { ShoppingService } from 'src/app/core/services/shopping.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {

  currentTab = 0;
  book: Book;
  listAllBooks: Book[];

  constructor(private route: ActivatedRoute, private shoppingService: ShoppingService, private cartService: CartService) { }

  ngOnInit(): void {
    (async () => {
      this.listAllBooks = await firstValueFrom(this.shoppingService.fetchBooks());
      let bookId = this.route.snapshot.params['book_id'];
      let foundBook = this.listAllBooks.find(book => book.id == bookId);
      if (foundBook !== undefined)
        this.book = foundBook
    })();
  }
  setCurrentTab(tab: number): void {
    this.currentTab = tab;
  }

  addToCart() {
    this.cartService.addToCart(this.book);
    this.cartService.changeState('in');
  }
}
