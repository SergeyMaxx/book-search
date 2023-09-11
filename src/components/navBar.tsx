import React, {FormEvent} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import glass from '../assets/Glass.svg'
import {
  categoryChoose,
  getMaxResults,
  getSearch,
  getSelectedCategory,
  getSelectedSort,
  getStartIndex,
  loadBooksList, onClear,
  onQuery,
  onSearch,
  sortChoose
} from '../store/books'

const NavBar = () => {
  const search = useSelector(getSearch())
  const startIndex = useSelector(getStartIndex())
  const maxResults = useSelector(getMaxResults())
  const selectedCategory = useSelector(getSelectedCategory())
  const selectedSort = useSelector(getSelectedSort())
  const dispatch: any = useDispatch()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(onClear())

    if (search.trim()) {
      dispatch(loadBooksList({search, startIndex, maxResults}))
      dispatch(onQuery(search))
      dispatch(onSearch(''))
    }
  }

  return (
    <div className="nav">
      <h1 className="nav-header">
        Search for books
      </h1>
      <form className="nav-form" onSubmit={handleSubmit}>
        <div className="nav-wrap">
          <input
            className="nav-form__input"
            type="text"
            value={search}
            onChange={e => dispatch(onSearch(e.target.value))}
            onKeyPress={e => e.key === 'Enter' ? handleSubmit(e) : null}
            placeholder="Enter your book name"
          />
          <button className="nav-form__button" type="submit">
            <img className="nav-img-search" src={glass} alt="img-glass" />
          </button>
        </div>
        <div className="nav-container">
          <label className="nav-form__label" htmlFor="categories">Categories</label>
          <select
            className="dropdown"
            id="categories"
            value={selectedCategory}
            onChange={e => dispatch(categoryChoose(e.target.value))}
          >
            <option value="all">all</option>
            <option value="art">art</option>
            <option value="biography">biography</option>
            <option value="computers">computers</option>
            <option value="history">history</option>
            <option value="medical">medical</option>
            <option value="poetry">poetry</option>
          </select>
          <label className="nav-form__label" htmlFor="sort">Sorting by</label>
          <select
            className="dropdown"
            id="sort"
            value={selectedSort}
            onChange={e => dispatch(sortChoose(e.target.value))}
          >
            <option value="relevance">relevance</option>
            <option value="newest">newest</option>
          </select>
        </div>
      </form>
    </div>
  )
}

export default NavBar