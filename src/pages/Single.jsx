import { useState, useEffect } from "react";
import { FcStart } from "react-icons/fc";
import styles from "../Styles/single.module.css";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import CircleRating from "../components/CircleRating";
import CarouselElement from "../components/CarouselElement";
import Cast from "../components/Cast";
import { useLocation } from "react-router-dom";

const API_KEY = 'ef6d335af07081934aa88a703974311c'; 

const Single = () => {
  const location = useLocation();
  const { movie } = location.state || {}; 

  const [similarData, setSimilarData] = useState([]);
  const [recommendationData, setRecommendationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genreList, setGenreList] = useState([]); 
  const [movieGenres, setMovieGenres] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          `https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=${API_KEY}`,
          `https://api.themoviedb.org/3/movie/${movie.id}/recommendations?api_key=${API_KEY}`,
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}` // Fetch genre list
        ];

        const [similarResponse, recommendationResponse, genreResponse] = await Promise.all(
          urls.map(url => fetch(url))
        );

        if (!similarResponse.ok || !recommendationResponse.ok || !genreResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const [similarData, recommendationData, genreData] = await Promise.all([
          similarResponse.json(),
          recommendationResponse.json(),
          genreResponse.json() 
        ]);

        setSimilarData(similarData.results);
        setRecommendationData(recommendationData.results);
        setGenreList(genreData.genres); 
        
        const genreMap = genreData.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});

        const genres = movie.genre_ids
          ? movie.genre_ids
              .map(id => genreMap[id]) 
              .filter(name => name) 
          : [];

        setMovieGenres(genres);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [movie.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!movie) return <div>Movie data not available</div>;

  
  const posterSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <>
      <NavBar />
      <div className={styles.parent}>
        <div
          className="bgBlur"
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.90) 100%),no-repeat, url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: '0',
            left: "0",
            opacity: "0.3",
            filter: "blur(4px)",
            backgroundRepeat:'no-repeat',
            backgroundPosition:'center',
           
          }}
        ></div>

        <div className={styles.container}>
          <div className={styles.image}>
            <img
              style={{ height: '100%', width: '100%' }}
              src={posterSrc}
              alt={movie.title}
            />
          </div>

          <div className={styles.details}>
            <div className={styles.title}>
              <h1>{movie.title}</h1>
            </div>
            <div className={styles.subTitle}>
              <h3>{movie.original_title || "Movie Sub Title"}</h3>
            </div>
            <div className={styles.genre}>
              {movieGenres.length > 0 ? (
                movieGenres.map((genre, index) => (
                  <span key={index} className={styles.genreItem}>
                    {genre}
                  </span>
                ))
              ) : (
                <span>No genres available</span>
              )}
            </div>
            <div className={styles.rating}>
              <span>
                <CircleRating vote_average={movie.vote_average.toFixed(1)} />
              </span>
              <span>
                <FcStart style={{ fontSize: "82px" }} />
              </span>
              <h2 style={{ fontWeight: "500", fontSize: "20px" }}>
                Watch Trailer
              </h2>
            </div>
            <div className={styles.heading}>Overview</div>
            <div className={styles.description}>
              <span>{movie.overview || "No description available"}</span>
            </div>
            <div className={styles.info}>
              <span>Status: {movie.status || "N/A"}</span>
              <span>Release Date: {movie.release_date || "N/A"}</span>
              <span>
                Runtime: {movie.runtime ? `${movie.runtime} minutes` : "N/A"}
              </span>
            </div>
            <hr />
            <div className={styles.info}>
              <span>Director: {movie.director || "N/A"}</span>
            </div>
            <hr />
            <div className={styles.info}>
              <span>Writer: {movie.writer || "N/A"}</span>
            </div>
            <hr />
          </div>
        </div>
      </div>

      <div className="container" style={{ margin: "0 auto", padding: "0 15px" }}>
        <Cast movieId={movie.id} />
        <CarouselElement title={"Recommendation"} popularData={recommendationData} />
        <CarouselElement title={"Similar"} popularData={similarData} />
      </div>

      <Footer />
    </>
  );
};

export default Single;
