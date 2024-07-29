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
    },
    {
      path : '/Webseries',
      element : <WebSeries/>
    },
    {
      path : '/Single',
      element : <Single/>
    }
    ,{
      path : '/Login',
      element : <Login/>
    }
  ])

  export default router