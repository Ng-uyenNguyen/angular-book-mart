import { Book } from "../model/book.model";

type bookInCart = { book: Book, amount: number, subTotal: number }

export interface Cart {
    books: bookInCart[],
    totalAmount: number;
    totalPrice: number;
}