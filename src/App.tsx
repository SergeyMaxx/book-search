import React from 'react'
import NavBar from './components/navBar'
import {Route, Switch} from 'react-router-dom'
import Books from './layout/books'

function App() {
  return (
    <div className="app">
      <NavBar />
      <Switch>
        <Route path="/:bookId?" component={Books} />
      </Switch>
    </div>
  )
}

export default App