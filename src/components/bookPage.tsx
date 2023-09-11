import React from 'react'
import {BooksListType} from '../types/type'
import {useHistory} from 'react-router-dom'

const BookPage = ({id, books}: BooksListType) => {
  const history = useHistory()
  const getBookById = books.find(b => b.id === id)

  if (!getBookById) return null

  return (
    <>
      <button
        className="load-more book-page-button"
        onClick={() => history.replace('/')}
      >
        back
      </button>
      <div className="book-page">
        <img
          className="book-page-img"
          src={getBookById.volumeInfo.imageLinks && getBookById.volumeInfo.imageLinks.thumbnail}
          alt="img"
        />
        <div className="book-page-wrap">
          <p className="book-page-categories">
            {getBookById.volumeInfo.categories}
          </p>
          <i className="book-item__i">{getBookById.volumeInfo.authors}</i>
          <p className="book-page__title">
            {getBookById.volumeInfo.title}
          </p>
          <p className="book-item__description">
            {getBookById.volumeInfo.description}
          </p>
        </div>
      </div>
    </>

  )
}

export default BookPage