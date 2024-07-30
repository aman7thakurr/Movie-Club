import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import CircleRating from "../components/CircleRating";
import SkeletonHome from "../skeleton/SkeletonHome";

const Movies = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [loading, setLoading] = useState(false);
  const apiKey = "ef6d335af07081934aa88a703974311c";

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: apiKey,
            page: pageNo,
            sort_by: "popularity.desc",
          },
        }
      );
      setData((prev) => [...prev, ...response.data.results]);
      setTotalPageNo(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      if (pageNo < totalPageNo && !loading) {
        setPageNo((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
  }, [params.explore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, pageNo]);

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
          <div className="movieheader" style={{display: 'flex',justifyContent:'center' ,width:'100%',paddingRight:'6%',paddingLeft:'6%'}}>
            
          <div className="pDiv">    <p 
                style={{
                  marginBottom: "10px",
                  fontWeight: "bolder",
                  fontSize: "34px",
                }}
              >
                Movies
              </p>
              </div>
            

<div className="selectDiv" style={{width:'100%'}}>
  <span className='spanS' style={{position:'relative',right:'-64%', color:'black'}} ><select name="Genre" className='selectS' id="" style={{width:'17%',borderRadius:'21px', color:'black'}}>
    <option value="action" style={{color:'black'}}>-- Select Genre --</option>
    <option value="action" style={{color:'black'}}>Action</option>
    <option value="adventure" style={{color:'black'}}>Adventure</option>
    <option value="animation" style={{color:'black'}}>Animation</option>
    <option value="comedy" style={{color:'black'}}>Comedy</option>
    <option value="drama" style={{color:'black'}}>Drama</option>
    <option value="family" style={{color:'black'}}>Family</option>
    <option value="kids" style={{color:'black'}}>Kids</option>
    <option value="fantasy" style={{color:'black'}}>Fantasy</option>
    <option value="sci-fi" style={{color:'black'}}>Sci-Fi</option>
    </select></span>
  <span className='spanS' style={{position:'relative',right:'-66%',color:'black'}}><select name="Sort" id=""  className='selectS' style={{width:'17%',borderRadius:'21px',color:'black'}}>
    <option value="" >-- Sort By --</option>
    <option value="" >Popularity : Ascending</option>
    <option value="" >Popularity : Descending</option>
    <option value="" >Rating : Ascending</option> 
    <option value="" >Rating : Descending</option>
    </select></span>
  
  </div>
          </div>
          
          
          <div
            className="card"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
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
                  />
                  <CircleRating vote_average={movie.vote_average.toFixed(1)} />
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
            {loading && (
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
      <a href="#" className="top">
        Back to Top &#8593;
      </a>
      <Footer />
    </>
  );
};

export default Movies;
