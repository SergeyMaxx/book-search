import {createSlice} from '@reduxjs/toolkit'
import {RootState} from './createStore'
import axios from 'axios'
import {QueryType} from '../types/type'

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    isLoading: true,
    search: '',
    query: '',
    selectedCategory: 'all',
    selectedSort: 'relevance',
    startIndex: 0,
    maxResults: 30
  },
  reducers: {
    booksRequested(state) {
      state.isLoading = true
    },
    searchBooks(state: any, action) {
      state.books = [...state.books, ...action.payload]
      state.isLoading = false
    },
    setSearch(state, action) {
      state.search = action.payload
    },
    setQuery(state, action) {
      state.query = action.payload
    },
    chooseCategory(state, action) {
      state.selectedCategory = action.payload
    },
    chooseSort(state, action) {
      state.selectedSort = action.payload
    },
    nextPage(state) {
      state.startIndex += state.maxResults
    }
  }
})

const {
  searchBooks,
  booksRequested,
  setSearch,
  setQuery,
  chooseCategory,
  chooseSort,
  nextPage
} = booksSlice.actions

const {reducer} = booksSlice

export const loadBooksList = ({search, startIndex, maxResults}: QueryType) => {
  return async (dispatch: any) => {
    dispatch(booksRequested())
    try {
      const {data} = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyDWIm_6z03QP1YfqkjqtyirotywD-eB1w8&startIndex=${startIndex.toString()}&maxResults=${maxResults.toString()}`)
      dispatch(searchBooks(data.items))

    } catch (error) {
      console.log(error)
    }
  }
}

export const categoryChoose = (data: string) => chooseCategory(data)
export const sortChoose = (data: string) => chooseSort(data)
export const onSearch = (data: string) => setSearch(data)
export const onQuery = (data: string) => setQuery(data)
export const loadMore = () => nextPage()
export const getBooks = () => (state: RootState) => state.booksReducer.books
export const getLoadingStatus = () => (state: RootState) => state.booksReducer.isLoading
export const getSearch = () => (state: RootState) => state.booksReducer.search
export const getQuery = () => (state: RootState) => state.booksReducer.query
export const getSelectedCategory = () => (state: RootState) => state.booksReducer.selectedCategory
export const getSelectedSort = () => (state: RootState) => state.booksReducer.selectedSort
export const getStartIndex = () => (state: RootState) => state.booksReducer.startIndex
export const getMaxResults = () => (state: RootState) => state.booksReducer.maxResults

export default reducer