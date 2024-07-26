import {useState,useEffect} from "react";
import { FcStart } from "react-icons/fc";
import styles from "../Styles/single.module.css";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import CircleRating from "../components/CircleRating";
import CarouselElement from "../components/CarouselElement";
import Cast from "../components/Cast";
import { useLocation } from "react-router-dom";
import { replaceIDs } from "@iconify/react/dist/iconify.js";

const Single = () => {
  const location = useLocation();
  const { movie } = location.state || {}; // Safe access to movie

const  [similarData, setSimilarData] = useState([])
const  [recommendationData, setRecommendationData] = useState([])
const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(()=>{
  const fetchData = async () => {
    try{
      const urls =[
        `https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=ef6d335af07081934aa88a703974311c`,
        `https://api.themoviedb.org/3/movie/${movie.id}/recommendations?api_key=ef6d335af07081934aa88a703974311c`
      ];
      const [similarResponse,recommendationResponse] = await Promise.all(
        urls.map(url => fetch(url))
      )
      if(!similarResponse.ok || !recommendationResponse.ok){
        throw new Error("Network Response Was not OK");
      }

      const [similarData,recommendationData] = await Promise.all([
        similarResponse.json(),
        recommendationResponse.json()
      ])

      setSimilarData(similarData.results);
      setRecommendationData(recommendationData.results)
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }
  fetchData();
},[])

if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error fetching data: {error.message}</div>;
}
  if (!movie) return <div>Movie Data not Available</div>;

  // Handle missing or undefined movie poster
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
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            width: "100%",
            height: "100%",
            position: "absolute",
            top:'0',
            left: "0",
            opacity: "0.5",
            filter: "blur(4px)",
          }}
        ></div>

        <div className={styles.container}>
          
          <div  className={styles.image}>
            <img
            style={{height:'100%',width:'100%'}}
              // style={{ height: "560px" }}
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
              <span>
                {movie.genres?.map((genre) => genre.name).join(", ") || "Genre"}
              </span>
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

      <div className="container" style={{  margin: "0 auto",
        padding: "0 15px"}}>
  <Cast movieId={movie.id} />
      <CarouselElement title={"Recommendation"} popularData={recommendationData} />
      <CarouselElement title={"Similar"} popularData={similarData}/>
     </div>

      <Footer />
    </>
  );
};

export default Single;
