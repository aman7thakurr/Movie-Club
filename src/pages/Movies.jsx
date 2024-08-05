import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import CircleRating from "../components/CircleRating";
import SkeletonHome from "../skeleton/SkeletonHome";
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoviesData,
  resetMovies,
  setPageNo,
  setSortBy,
  setGenre,
} from "../store/slice/moviesSlice";

const Movies = () => {
  const currentUrl = window.location.href;

  const dispatch = useDispatch();
  const { data, totalPageNo, pageNo, error, status, genre, sortBy } = useSelector((state) => state.movies);
  const params = useParams();

  useEffect(() => {
    dispatch(resetMovies());
    dispatch(fetchMoviesData({ page: 1, sortBy, genre }));
  }, [dispatch, params.explore, sortBy, genre]);

  useEffect(() => {
    if (pageNo < totalPageNo) {
      dispatch(fetchMoviesData({ page: pageNo, sortBy, genre }));
    }
  }, [dispatch, pageNo, sortBy, totalPageNo, genre]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        if (pageNo < totalPageNo && status !== "loading") {
          dispatch(setPageNo(pageNo + 1));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, pageNo, status, totalPageNo]);

  const handleGenreChange = (event) => {
    dispatch(setGenre(event.target.value));
  };

  const handleSortChange = (event) => {
    dispatch(setSortBy(event.target.value));
  };

  if (status === "failed") {
    return (
      <>
        <Helmet>
          <meta property="og:url" content={currentUrl} />
          <meta property="og:title" content="Movies" />
          <title>Movies</title>
        </Helmet>
        <NavBar />
        <div className="error-container">
          <div>Error fetching data: {error}</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content="Movies" />
        <title>Movies</title>
      </Helmet>
      <NavBar />
      <div className="movies-container">
        <div className="header">
          <h1>Movies</h1>
          <div className="filters">
            <select name="Genre" value={genre} onChange={handleGenreChange}>
              <option value="">-- Select Genre --</option>
              <option value="28">Action</option>
              <option value="12">Adventure</option>
              <option value="16">Animation</option>
              <option value="35">Comedy</option>
              <option value="18">Drama</option>
              <option value="10751">Family</option>
              <option value="14">Fantasy</option>
              <option value="878">Sci-Fi</option>
            </select>
            <select name="Sort" value={sortBy} onChange={handleSortChange}>
              <option value="popularity.asc">Popularity: Ascending</option>
              <option value="popularity.desc">Popularity: Descending</option>
              <option value="vote_average.asc">Rating: Ascending</option>
              <option value="vote_average.desc">Rating: Descending</option>
            </select>
          </div>
        </div>
        <div className="movies-list">
          {data.map((movie) => (
            <Link to="/Single" state={{ movie }} key={movie.id}>
              <div className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title || "Movie poster"}
                  onError={(e) => e.target.src = "https://via.placeholder.com/300x450?text=No+Image"}
                />
                <span>{movie.title}</span>
                <p>{movie.release_date}</p>
              </div>
            </Link>
          ))}
          {status === "loading" && <SkeletonHome />}
        </div>
      </div>
      <a href="#" className="back-to-top">Back to Top &#8593;</a>
      <Footer />
    </>
  );
};

export default Movies;
