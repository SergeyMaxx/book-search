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
import {useHistory} from 'react-router-dom'
import Select from './select'

const NavBar = () => {
  const search = useSelector(getSearch())
  const startIndex = useSelector(getStartIndex())
  const maxResults = useSelector(getMaxResults())
  const selectedCategory = useSelector(getSelectedCategory())
  const selectedSort = useSelector(getSelectedSort())
  const dispatch: any = useDispatch()
  const history = useHistory()

  const categories = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry']
  const sort = ['relevance', 'newest']

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(onClear())

    if (search.trim()) {
      history.push('/')
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
      </form>
      <div className="nav-container">
        <Select
          name='Categories'
          options={categories}
          chooseOption={(data:string) => dispatch(categoryChoose(data))}
          selectedOption={selectedCategory}
        />
        <Select
          name='Sorting by'
          options={sort}
          chooseOption={(data:string) => dispatch(sortChoose(data))}
          selectedOption={selectedSort}
        />
      </div>
    </div>
  )
}

export default NavBar