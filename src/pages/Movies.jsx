import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import CircleRating from "../components/CircleRating";
import SkeletonHome from "../skeleton/SkeletonHome";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoviesData,
  resetMovies,
  setPageNo,
  setSortBy,
  setGenre,
} from "../store/slice/moviesSlice";

const Movies = () => {
  useEffect(() => {
    const title = "Movies - Movie Club";
    const description = "Explore the latest movies available for streaming.";
    const url = window.location.href;
    const image = "https://img.freepik.com/free-photo/view-3d-cinema-theatre-room_23-2151067055.jpg?ga=GA1.1.1071293010.1722833002&semt=sph"; 

    document.title = title;

    document.querySelector('meta[property="og:url"]').setAttribute('content', url);
    document.querySelector('meta[property="og:title"]').setAttribute('content', title);
    document.querySelector('meta[property="og:image"]').setAttribute('content', image);
    document.querySelector('meta[property="og:description"]').setAttribute('content', description);

    return () => {
   
      document.querySelector('meta[property="og:url"]').removeAttribute('content');
      document.querySelector('meta[property="og:title"]').removeAttribute('content');
      document.querySelector('meta[property="og:image"]').removeAttribute('content');
      document.querySelector('meta[property="og:description"]').removeAttribute('content');
    };
  }, []);



  const dispatch = useDispatch();
  const { data, totalPageNo, pageNo, error, status, genre, sortBy } =
    useSelector((state) => state.movies);
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

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      if (pageNo < totalPageNo && status !== "loading") {
        dispatch(setPageNo(pageNo + 1));
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, pageNo, status]);

  const handleGenreChange = (event) => {
    dispatch(setGenre(event.target.value));
  };

  const handleSortChange = (event) => {
    dispatch(setSortBy(event.target.value));
  };

  // console.log(data);
  // if (status === 'loading') {
  //   return (
  //     <>
  //     <NavBar />
  //     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10em' }}>
  //       <div className='loader'></div>
  //     </div>
  //   </>
  //   );
  // }

  if (status === "failed") {
    return (
      <>
        <NavBar />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            className="container"
            style={{
              marginBottom: "15px",
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>Error fetching data: {error}</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="container"
          style={{
            marginBottom: "15px",
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="movieheader"
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              paddingRight: "6%",
              paddingLeft: "6%",
            }}
          >
            <div className="pDiv">
              <p
                style={{
                  marginBottom: "10px",
                  fontWeight: "bolder",
                  fontSize: "34px",
                }}
              >
                Movies
              </p>
            </div>

            <div className="selectDiv" style={{ width: "100%" }}>
              <span
                className="spanS"
                style={{ position: "relative", right: "-64%", color: "black" }}
              >
                <select
                  name="Genre"
                  className="selectS"
                  value={genre}
                  onChange={handleGenreChange}
                  style={{ width: "17%", borderRadius: "21px", color: "black" }}
                >
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
              </span>
              <span
                className="spanS"
                style={{ position: "relative", right: "-66%", color: "black" }}
              >
                <select
                  name="Sort"
                  className="selectS"
                  value={sortBy}
                  onChange={handleSortChange}
                  style={{ width: "17%", borderRadius: "21px", color: "black" }}
                >
                  <option value="popularity.asc">Popularity: Ascending</option>
                  <option value="popularity.desc">
                    Popularity: Descending
                  </option>
                  <option value="vote_average.asc">Rating: Ascending</option>
                  <option value="vote_average.desc">Rating: Descending</option>
                </select>
              </span>
            </div>
          </div>
<div className="movieCard">
          <div
            className="card"
            // style={{
            //   display: "flex",
            //   flexDirection:'column',
            //   flexWrap: "wrap",
            //   justifyContent: "center",
            //   maxWidth:'324px'
            // }}
          >
            {data.map((movie) => (
              <Link
                to="/Single"
                state={{ movie }}
                key={movie.id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="swiper-slide"
                  style={{ margin: "10px", textAlign: "center" }}
                >
                  <img
                    style={{
                      height: "480px",
                      width: "auto",
                      borderRadius: "8px",
                    }}
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title || "Movie poster"}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x450?text=No+Image";
                    }}
                  />

                  {/* <CircleRating vote_average={movie.vote_average.toFixed(1)} /> */}
                  <span
                    style={{
                      display: "block",
                      marginTop: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {movie.title}
                  </span>
                  <p>{movie.release_date}</p>
                </div>
              </Link>
            ))}
            {status === "loading" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SkeletonHome />
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
      <a href="#" className="top">
        Back to Top &#8593;
      </a>
      <Footer />
    </>
  );
};
export default Movies;
