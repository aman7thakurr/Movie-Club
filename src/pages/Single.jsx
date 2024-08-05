import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContentDetails, setContentGenres } from '../store/slice/singleContentSlice';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import CircleRating from '../components/CircleRating';
import CarouselElement from '../components/CarouselElement';
import Cast from '../components/Cast';
import styles from "../Styles/single.module.css";
import { FcStart } from "react-icons/fc";
import Modal from '../components/Modal';
import Carousel from 'react-multi-carousel';
import { SlSocialYoutube } from "react-icons/sl";
import PlayIcon from '../assets/PlayIcon';

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 6 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };
  

const Single = () => {
  useEffect(() => {
    const title = "Details - Movie Club";
    const description = "Explore the latest movies available for streaming.";
    const url = window.location.href;
    const image = "https://img.freepik.com/free-photo/view-3d-cinema-theatre-room_23-2151067055.jpg?ga=GA1.1.1071293010.1722833002&semt=sph"; 

    document.title = title;

    document.querySelector('meta[property="og:url"]').setAttribute('content', url);
    document.querySelector('meta[property="og:title"]').setAttribute('content', title);
    document.querySelector('meta[property="og:image"]').setAttribute('content', image);
    document.querySelector('meta[property="og:description"]').setAttribute('content', description);
   
    document.querySelector('meta[property="twitter:url"]').setAttribute('content', url);
    document.querySelector('meta[property="twitter:title"]').setAttribute('content', title);
    document.querySelector('meta[property="twitter:image"]').setAttribute('content', image);
    document.querySelector('meta[property="twitter:description"]').setAttribute('content', description);

    return () => {
   
      document.querySelector('meta[property="og:url"]').removeAttribute('content');
      document.querySelector('meta[property="og:title"]').removeAttribute('content');
      document.querySelector('meta[property="og:image"]').removeAttribute('content');
      document.querySelector('meta[property="og:description"]').removeAttribute('content');
      
      document.querySelector('meta[property="twitter:url"]').removeAttribute('content');
      document.querySelector('meta[property="twitter:title"]').removeAttribute('content');
      document.querySelector('meta[property="twitter:image"]').removeAttribute('content');
      document.querySelector('meta[property="twitter:description"]').removeAttribute('content');
    };
  }, []);


  const location = useLocation();
  const { movie, tv } = location.state || {}; // Extract movie or TV show data
  const isMovie = !!movie;
  const content = isMovie ? movie : tv;
  const dispatch = useDispatch();
  const { similarData, recommendationData, genreList, contentGenres, status, error } = useSelector(state => state.singleContent);

  const [results, setResults] = useState([]);
  const [castResults, setCastResults] = useState([]);
  const [key, setKey] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  // console.log(content.status);
  useEffect(() => {
    const contentId = content?.id;
    const isMovie = !!movie;

    if (contentId) {
      dispatch(fetchContentDetails({ id: contentId, isMovie }));
    }
  }, [dispatch, content, movie, tv]);

  useEffect(() => {
    if (genreList.length > 0) {
      const genreMap = genreList.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {});

      const genres = (movie?.genre_ids || tv?.genre_ids || []).map(id => genreMap[id]).filter(name => name);
      dispatch(setContentGenres(genres));
    }
  }, [genreList, movie, tv, dispatch]);

  useEffect(() => {
    if (content?.id) {
      const fetchData = async () => {
        const endpoint = isMovie
          ? `https://api.themoviedb.org/3/movie/${content.id}/videos?api_key=ef6d335af07081934aa88a703974311c`
          : `https://api.themoviedb.org/3/tv/${content.id}/videos?api_key=ef6d335af07081934aa88a703974311c`;

        try {
          const response = await fetch(endpoint);
          const data = await response.json();
          setResults(data.results);
          if (data.results.length > 0) {
            setKey(data.results[0].key);
          }
        } catch (err) {
          console.error('Failed to fetch results:', err);
        }
      };

      fetchData();
    }
  }, [content, isMovie]);

  
  useEffect(() => {
    if (content?.id) {
      const fetchData = async () => {
        const endpoint = isMovie
          ? `https://api.themoviedb.org/3/movie/${content.id}/credits?api_key=ef6d335af07081934aa88a703974311c`
          : `https://api.themoviedb.org/3/tv/${content.id}/credits?api_key=ef6d335af07081934aa88a703974311c`;

        try {
          const response = await fetch(endpoint);
          const data = await response.json();
          setCastResults(data?.cast);
          // console.log(data.crew);
          
        } catch (err) {
          console.error('Failed to fetch results:', err);
        }
      };

      fetchData();
    }
  }, [content, isMovie]);  

  if (status === 'loading') {
    return (
      <>
        <NavBar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10em' }}>
          <div className='loader'></div>
        </div>
      </>
    );
  }

  if (status === 'failed') {
    return <div>Error fetching data: {error}</div>;
  }

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

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
          
            opacity: "0.3",
            filter: "blur(4px)",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        ></div>

        <div className="container">
          <div className={styles.movieDetail}>
          <div className={styles.image}>
            <img
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
            <div style={{display:'flex'}}>
              <span style={{marginTop:'10px'}}>
                <CircleRating vote_average={voteAverage?.toFixed(1)} />
              </span>
            
              <button>
              
              
             
      <div className={styles.playbtn} onClick={openModal} style={{ display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer' }}>
        <PlayIcon style={{ width: '70px', stroke: 'red' ,marginLeft:'40px'}} />
      </div>
 
              
              
              <div onClick={openModal} style={{marginLeft:'40px', fontWeight: "500", fontSize: "20px" }}>
                Watch Trailer
              </div>
              </button></div>
              <Modal isOpen={isModalOpen} onClose={closeModal}>
                <button>Watch This Video</button>
                <iframe
            
                  src={`https://www.youtube.com/embed/${key}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Modal>
            </div>
            <h3 className={styles.heading}>Overview</h3>

            <div className={styles.description}>
              <p>{overview || "No description available"}</p>
              <div className={styles.movieInfo}>
                <p>
                <span>Status: {content?.status || "N/A"}</span>
              <span>Release Date: {releaseDate || "N/A"}</span>
              <span>
                Runtime: {runtime ? `${runtime} minutes` : "N/A"}
              </span>
                </p>
              <p>
              <span>Director: {content?.director || "N/A"}</span>
              </p>
              <p>
              <span>Writer: {content?.writer || "N/A"}</span>
              </p>                
              </div>
            </div>
          </div>

        </div>
        </div>
      </div>

      <div className="container" style={{ margin: "0 auto", padding: "0 15px" }}>
       
        <Cast castResults={castResults} contentId={content?.id} isMovie={isMovie} />
        
          <h1 style={{ marginBottom: '10px', fontWeight: 'bolder', fontSize: '34px',textAlign:'center' }}>Official Videos</h1>
          <Carousel responsive={responsive}>
          { 
          results.map((videoKey)=>{
            return <> 
            <div className="videoThumbnail" style={{marginRight:'10px'}} >
                <img onClick={openModal} style={{ width: '100%',cursor:'pointer' }}
                  src={`https://img.youtube.com/vi/${videoKey.key}/mqdefault.jpg`}
                />
                {/* <SlSocialYoutube /> */}
              </div>
              <div onClick={openModal} style={{cursor: 'pointer',marginLeft : '17%'}} className="videoTitle">{videoKey.name}</div>
            
            </>
            })}
            </Carousel> 
        
        <CarouselElement title={"Recommendation"} text={'/movie'} popularData={recommendationData} isTV={!isMovie} />
        <CarouselElement title={"Similar"} text={'/movie'} popularData={similarData} isTV={!isMovie} />
      </div>

      <Footer />
    </>
  );
};

export default Single;
