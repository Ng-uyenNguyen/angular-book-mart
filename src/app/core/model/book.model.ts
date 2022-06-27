export class Book {
    constructor(public readonly id: number, public readonly title: string, public readonly isbn: string, public readonly pageCount: number,
        public readonly publishedDate: string, public readonly thumbnailUrl: string, public readonly shortDescription: string, public readonly longDescription: string,
        public readonly status: string, public readonly authors: string[], public readonly categories: string[], public readonly price: number, public readonly reviews: []) {
    }
}