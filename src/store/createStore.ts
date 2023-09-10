import {combineReducers, configureStore} from '@reduxjs/toolkit'
import reducer from './books'
import {thunk} from './middleware/thunk'

const rootReducer = combineReducers({
  booksReducer: reducer
})

export function createStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: defaultMiddleware => defaultMiddleware().concat(thunk)
  })
}

export type RootState = ReturnType<typeof rootReducer>