import React from 'react'
import {useHistory} from 'react-router-dom'
import {BookProps} from '../types/type'

const BookItem = ({book}: BookItemProps) => {
  const history = useHistory()

  return (
    <li
      className="book-item"
      onClick={() => history.push(`/${book.id}`)}
    >
      <img
        className="book-item__img"
        src={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail}
        alt="img"
      />
      <p>{book.volumeInfo.categories}</p>
      <p className="book-item__title">
        {book.volumeInfo.title}
      </p>
      <p>{book.volumeInfo.authors}</p>
    </li>
  )
}

interface BookItemProps {
  book: BookProps
}

export default BookItem