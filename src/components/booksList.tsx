import React, {useEffect, useState} from 'react'
import BookItem from './bookItem'
import {BooksListType} from '../types/type'
import {useDispatch, useSelector} from 'react-redux'
import Loader from './loader'
import {
  getSelectedCategory,
  getLoadingStatus,
  getSelectedSort,
  loadMore,
  loadBooksList,
  getStartIndex,
  getMaxResults,
  getQuery
} from '../store/books'

const BooksList = ({books}: BooksListType) => {
  const query = useSelector(getQuery())
  const startIndex = useSelector(getStartIndex())
  const maxResults = useSelector(getMaxResults())
  const loadingStatus = useSelector(getLoadingStatus())
  const selectedCategory = useSelector(getSelectedCategory())
  const selectedSort = useSelector(getSelectedSort())
  const [flag, setFLag] = useState(false)
  const dispatch: any = useDispatch()

  let filteredBook = selectedCategory !== 'all'
    ? books.filter(b => b.volumeInfo.categories &&
      b.volumeInfo.categories.length > 0 &&
      b.volumeInfo.categories[0].toLowerCase() === selectedCategory)
    : books

  if (selectedSort === 'newest') {
    filteredBook = [...filteredBook].sort((a, b) => {
      const dateA: any = new Date(a.volumeInfo.publishedDate)
      const dateB: any = new Date(b.volumeInfo.publishedDate)
      return dateB - dateA
    })
  }

  useEffect(() => {
    if (!loadingStatus && flag) {
      dispatch(loadBooksList({query, startIndex, maxResults}))
      setFLag(false)
    }
  }, [startIndex])

  const idGenerator = () => Math.random().toString(36).slice(2)

  const loadMoreBooks = () => {
    setFLag(true)
    dispatch(loadMore())
  }

  if (filteredBook.length && !loadingStatus) {
    return (
      <div className="books-list">
        <p className="books-list-result">
          Found {filteredBook.length} result
        </p>
        <ul className="item-container">
          {filteredBook.map(b => <BookItem key={b.id + idGenerator()} book={b} />)}
        </ul>
        <button
          className="load-more"
          onClick={loadMoreBooks}
        >
          Load more
        </button>
      </div>
    )
  }

  return (
    <>
      {books.length > 0 && <Loader />}
    </>
  )
}

export default BooksList