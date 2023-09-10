import React from 'react'
import {useParams} from 'react-router-dom'
import BookPage from '../components/bookPage'
import BooksList from '../components/booksList'
import {useSelector} from 'react-redux'
import {getBooks} from '../store/books'

const Books = () => {
  const {bookId} = useParams<RouteParams>()
  const books = useSelector(getBooks())

  return (
    <>
      {bookId
        ? <BookPage id={bookId} books={books} />
        : <BooksList books={books} />
      }
    </>
  )
}

interface RouteParams {
  bookId: string
}

export default Books