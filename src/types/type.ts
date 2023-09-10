export interface BookProps {
  id: string
  volumeInfo: {
    authors: string[]
    categories: string[]
    description: string
    imageLinks: {
      thumbnail: string
    }
    publishedDate: string
    title: string
  }
}

export interface BooksListType {
  id?: string
  books: BookProps[]
}

export interface QueryType {
  search?: string
  query?: string
  startIndex: number
  maxResults: number
}