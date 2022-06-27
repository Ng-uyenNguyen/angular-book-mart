import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Subject } from 'rxjs';
import { BOOKS_PER_PAGE } from 'src/app/shared/constants/constants';
import { Book } from '../model/book.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  allCategories: string[] = [
    "Open Source",
    "Mobile",
    "Java",
    "Software Engineering",
    "Internet",
    "Web Development",
    "Miscellaneous",
    "Microsoft .NET",
    "Microsoft",
    "Next Generation Databases",
    "PowerBuilder",
    "Client-Server",
    "Computer Graphics",
    "Object-Oriented Programming",
    "Networking",
    "Theory",
    "Programming",
    "Python",
    "Mobile Technology",
    "Business",
    "XML",
    "Perl",
    "Microsoft/.NET",
    "Miscella",
    "Object-Technology Programming",
  ]
  categoriesFilter: string[] = [];
  searchText: string = '';
  currentPage: number = 1;
  pageLength: number;
  pageLenghtChanged = new Subject<number>();
  listAllBooks: Book[] = [];
  listBookFiltered: Book[] = [];
  displayBooks: Book[] = [];
  displaybooksChanged = new BehaviorSubject<Book[]>(this.displayBooks);

  constructor(private http: HttpClient) {
    this.fetchBooks().subscribe(res => {
      this.listAllBooks = [...res];
      this.listBookFiltered = this.listAllBooks.slice();
      this.setListBooksEachPage();
    });
  }

  // Get books from service
  fetchBooks() {
    return this.http.get<any>("https://bookmart-server.herokuapp.com/books")
      .pipe(map(res => {
        return res.map(
          (book: any) => new Book(book._id, book.title, book.isbn, book.pageCount, book.publishedDate, book.thumbnailUrl,
            book.shortDescription, book.longDescription, book.status, book.authors, book.categories, book.price, book.reviews)
        )
      }))
  }

  // getAllBooks() {
  //   console.log(this.listAllBooks, "listttt");
  //   return this.listAllBooks.slice();
  // }

  getAllCategories() {
    return this.allCategories.slice();
  }

  // Handle filter detail
  filterHandling() {
    if (this.categoriesFilter.length == 0) {
      this.searchBook(this.searchText, this.listAllBooks);
      return;
    }
    let booksFilterByCat = this.listBookFiltered.filter((book: Book) => {
      return book.categories.sort().join('').includes(this.categoriesFilter.sort().join(''));
    });

    this.listBookFiltered = [...booksFilterByCat];
    this.setListBooksEachPage();
  }

  // Filter book by category service
  filterBooks(event: boolean, payload: string) {
    if (event == true) {
      this.categoriesFilter.push(payload);
    }
    else {
      const index = this.categoriesFilter.indexOf(payload);
      this.categoriesFilter.splice(index, 1);
      this.searchBook(this.searchText, this.listAllBooks);
    }
    this.filterHandling();
  }

  // Pagination service
  setListBooksEachPage() {
    this.pageLength = Math.ceil(this.listBookFiltered.length / BOOKS_PER_PAGE);
    this.pageLenghtChanged.next(this.pageLength);
    this.displayBooks = this.listBookFiltered.slice(BOOKS_PER_PAGE * (this.currentPage - 1), BOOKS_PER_PAGE * this.currentPage);
    this.displaybooksChanged.next(this.displayBooks);
  }

  // Set current page function
  setCurrentPage(page: number) {
    this.currentPage = page;
    this.setListBooksEachPage();
  }

  // Search book by title service
  searchBook(text: string = this.searchText, bookList: Book[] = this.listBookFiltered) {
    if (this.categoriesFilter.length == 0)
      bookList = this.listAllBooks.slice();
    this.searchText = text;
    bookList = this.listAllBooks.filter((book: Book) => {
      return book.categories.sort().join('').includes(this.categoriesFilter.sort().join(''));
    });
    console.log(bookList, "booklisttttttttt");
    this.listBookFiltered = bookList.filter(book => book.title.toLowerCase().includes(text.toLowerCase()));
    this.setListBooksEachPage();
  }

}
