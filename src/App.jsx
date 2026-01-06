import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './layouts/Header'
import { ContextProvider } from './services/Context'
import MovieDetails from './pages/MovieDetails'


function App() {

  return (
    <>
    <ContextProvider>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
      </ContextProvider>
    </>
  )
}

export default App
