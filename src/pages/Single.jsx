import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import CircleRating from '../components/CircleRating';
import CarouselElement from '../components/CarouselElement';
import Cast from '../components/Cast';
import styles from "../Styles/single.module.css";
import { FcStart } from "react-icons/fc";

const API_KEY = 'ef6d335af07081934aa88a703974311c';

const Single = () => {
  const location = useLocation();
  const { movie, tv } = location.state || {}; // Handle both 'movie' and 'tv'

  const [similarData, setSimilarData] = useState([]);
  const [recommendationData, setRecommendationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genreList, setGenreList] = useState([]);
  const [contentGenres, setContentGenres] = useState([]);

  useEffect(() => {
    const contentId = movie?.id || tv?.id;
    const isMovie = !!movie;

    if (!contentId) {
      setError(new Error("No content data found."));
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const urls = [
          isMovie
            ? `https://api.themoviedb.org/3/movie/${contentId}/similar?api_key=${API_KEY}`
            : `https://api.themoviedb.org/3/tv/${contentId}/similar?api_key=${API_KEY}`,
          isMovie
            ? `https://api.themoviedb.org/3/movie/${contentId}/recommendations?api_key=${API_KEY}`
            : `https://api.themoviedb.org/3/tv/${contentId}/recommendations?api_key=${API_KEY}`,
          `https://api.themoviedb.org/3/genre/${isMovie ? 'movie' : 'tv'}/list?api_key=${API_KEY}`
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

        setSimilarData(similarData.results || []);
        setRecommendationData(recommendationData.results || []);
        setGenreList(genreData.genres || []);

        const genreMap = genreData.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});

        const genres = isMovie
          ? movie?.genre_ids?.map(id => genreMap[id]).filter(name => name)
          : tv?.genre_ids?.map(id => genreMap[id]).filter(name => name);

        setContentGenres(genres);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [movie, tv]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const isMovie = !!movie;
  const content = isMovie ? movie : tv;
  const backdropPath = content?.backdrop_path;
  const posterPath = content?.poster_path;
  const title = isMovie ? content?.title : content?.name;
  const originalTitle = isMovie ? content?.original_title : content?.original_name;
  const overview = content?.overview;
  const voteAverage = content?.vote_average;
  const releaseDate = isMovie ? content?.release_date : content?.first_air_date;
  const runtime = isMovie ? content?.runtime : null;

  const posterSrc = posterPath
    ? `https://image.tmdb.org/t/p/original${posterPath}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <>
      <NavBar />
      <div className={styles.parent}>
        <div
          className="bgBlur"
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.90) 100%),no-repeat, url(https://image.tmdb.org/t/p/original${backdropPath})`,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: '0',
            left: "0",
            opacity: "0.3",
            filter: "blur(4px)",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        ></div>

        <div className={styles.container}>
          <div className={styles.image}>
            <img
              style={{ height: '100%', width: '100%' }}
              src={posterSrc}
              alt={title}
            />
          </div>

          <div className={styles.details}>
            <div className={styles.title}>
              <h1>{title}</h1>
            </div>
            <div className={styles.subTitle}>
              <h3>{originalTitle || "Sub Title"}</h3>
            </div>
            <div className={styles.genre}>
              {contentGenres.length > 0 ? (
                contentGenres.map((genre, index) => (
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
                <CircleRating vote_average={voteAverage?.toFixed(1)} />
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
              <span>{overview || "No description available"}</span>
            </div>
            <div className={styles.info}>
              <span>Status: {content?.status || "N/A"}</span>
              <span>Release Date: {releaseDate || "N/A"}</span>
              <span>
                Runtime: {runtime ? `${runtime} minutes` : "N/A"}
              </span>
            </div>
            <hr />
            <div className={styles.info}>
              <span>Director: {content?.director || "N/A"}</span>
            </div>
            <hr />
            <div className={styles.info}>
              <span>Writer: {content?.writer || "N/A"}</span>
            </div>
            <hr />
          </div>
        </div>
      </div>

      <div className="container" style={{ margin: "0 auto", padding: "0 15px" }}>
        <Cast contentId={content?.id} isMovie={isMovie} />
        <CarouselElement title={"Recommendation"} popularData={recommendationData} isTV={!isMovie} />
        <CarouselElement title={"Similar"} popularData={similarData} isTV={!isMovie} />
      </div>

      <Footer />
    </>
  );
};

export default Single;
