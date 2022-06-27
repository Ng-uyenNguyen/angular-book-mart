import { Component, OnInit } from '@angular/core';

import { Book } from 'src/app/core/model/book.model';
import { ShoppingService } from 'src/app/core/services/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  searchText = '';
  displayBooks: Book[];
  pageLength: number;
  currentPage: number = 1;
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.shoppingService.displaybooksChanged.subscribe(
      (books) => (this.displayBooks = books)
    );
    this.shoppingService.pageLenghtChanged.subscribe(
      (length) => (this.pageLength = length)
    );
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
    this.shoppingService.setCurrentPage(page);
  }

  onSearch(event: any) {
    if (event.key === 'Enter') {
      this.shoppingService.searchBook(this.searchText);
    }
  }

  onChangePage(type: string) {
    if (type === 'prev' && this.currentPage - 1 === 0) return;
    type === 'next'
      ? this.setCurrentPage(++this.currentPage)
      : this.setCurrentPage(--this.currentPage);
  }
}
