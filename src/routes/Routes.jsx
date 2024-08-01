import { createBrowserRouter } from "react-router-dom"
import Movies from '../pages/Movies.jsx'
import TvShows from '../pages/TvShows.jsx'
import SearchResult from '../pages/SearchResult.jsx'
import WebSeries from '../pages/WebSeries.jsx'
import Single from '../pages/Single.jsx'
import Login from '../pages/Login.jsx'
import App from '../App.jsx'

const router = createBrowserRouter([
    {
      path : "/",
      element : <App/>
    }
    ,
  
    {
      path : '/movie',
      element : <Movies/>
    },
    {
      path : '/tv',
      element : <TvShows/>
    },
    {
      path : '/search',
      element : <SearchResult/>
    },
    {
      path : '/webseries',
      element : <WebSeries/>
    },
    {
      path : '/Single',
      element : <Single/>
    }
    ,{
      path : '/login',
      element : <Login/>
    }
  ])

  export default router