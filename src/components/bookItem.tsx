import React from 'react'
import {useHistory} from 'react-router-dom'
import {BookProps} from '../types/type'

const BookItem = ({book}: BookItemProps) => {
  const history = useHistory()

  return (
    <li className="book-item" onClick={() => history.push(`/${book.id}`)}>
      <img
        className="book-item__img"
        src={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail}
        alt="img"
      />
      <div className="book-item__wrap">
        <p className="book-item__categories">{book.volumeInfo.categories}</p>
        <p className="book-item__title">{book.volumeInfo.title}</p>
        <i className="book-item__authors">{book.volumeInfo.authors}</i>
      </div>
    </li>
  )
}

interface BookItemProps {
  book: BookProps
}

export default BookItem