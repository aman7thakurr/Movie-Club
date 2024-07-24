import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Movies from './pages/Movies.jsx'
import { TvShows } from './pages/TvShows.jsx'
import SearchResult from './pages/SearchResult.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>
  }
  ,

  {
    path : '/Movies',
    element : <Movies/>
  },
  {
    path : '/TvShows',
    element : <TvShows/>
  },
  {
    path : '/SearchResult',
    element : <SearchResult/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
