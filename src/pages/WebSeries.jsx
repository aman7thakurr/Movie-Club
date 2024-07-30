import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import CircleRating from '../components/CircleRating';
import SkeletonHome from '../skeleton/SkeletonHome'; // Assuming you have a similar Skeleton component

const WebSeries = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true); // To track if there is more data to load
  const apiKey = 'ef6d335af07081934aa88a703974311c';

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get('https://api.themoviedb.org/3/discover/tv', {
        params: {
          api_key: apiKey,
          page: pageNo,
          sort_by: 'air_date.asc',
        },
      });

      if (response.data && response.data.results) {
        setData(prev => [
          ...prev,
          ...response.data.results
        ]);
        setTotalPageNo(response.data.total_pages);

        if (pageNo >= response.data.total_pages) {
          setHasMore(false); // No more data to load
        }
      } else {
        console.error('Unexpected response structure:', response);
      }
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // const handleScroll = () => {
  //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
  //     if (pageNo < totalPageNo && !loading) {
  //       setPageNo(prev => prev + 1);
  //     }
  //   }
  // };

  const handleLoadMore = () => {
    if (pageNo < totalPageNo) {
      setPageNo(prev => prev + 1);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pageNo]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
    setHasMore(true); // Reset 'hasMore' when params change
  }, [params.explore]);

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [loading, pageNo]);

  return (
    <>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="container" style={{ marginBottom: '15px', marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="movieheader" style={{display: 'flex',justifyContent:'center' ,width:'100%',paddingRight:'6%',paddingLeft:'6%'}}>
            
            <div className='pDiv'>    <p
                  style={{
                    marginBottom: "10px",
                    fontWeight: "bolder",
                    fontSize: "34px",width: 'max-content'
                  }}
                >
                  Web Series
                </p>
                </div>
              
  
  <div  className='selectDiv' style={{width:'100%'}}>
    <span className='spanS'  style={{position:'relative',right:'-64%', color:'black'}} ><select name="Genre" className='selectS' id="" style={{width:'17%',borderRadius:'21px', color:'black'}}>
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
    <span className='spanS' style={{position:'relative',right:'-66%',color:'black'}}><select className='selectS' name="Sort" id=""  style={{width:'17%',borderRadius:'21px',color:'black'}}>
      <option value="" >-- Sort By --</option>
      <option value="" >Popularity : Ascending</option>
      <option value="" >Popularity : Descending</option>
      <option value="" >Rating : Ascending</option> 
      <option value="" >Rating : Descending</option>
      </select></span>
    
    </div>
            </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="card" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {data.map(show => (
              <Link 
                to="/Single"
                state={{ tv: show }} 
                key={show.id}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="swiper-slide" style={{ margin: '10px', textAlign: 'center' }}>
                  <img 
                    style={{ height: '480px', width: 'auto', borderRadius: '8px' }}
                    src={`https://image.tmdb.org/t/p/original${show.poster_path}`}
                    alt={show.name || 'Web series poster'}
                  />
                  <CircleRating vote_average={show.vote_average.toFixed(1)} />
                  <span style={{ display: 'block', marginTop: '10px', fontWeight: 'bold' }}>{show.name}</span>
                  <p>{show.first_air_date}</p>
                </div>
              </Link>
            ))}
            {loading && (
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <SkeletonHome />
              </div>
            )}
          </div>
          {hasMore && !loading && (
            <button
              onClick={handleLoadMore}
              style={{
                padding: '10px 20px',
                margin: '20px',
                fontSize: '16px',
                cursor: 'pointer',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: '#007bff',
                color: '#fff'
              }}
            >
              Load More
            </button>
          )}
        </div>
      </div>
      <a href="#" className="top">Back to Top &#8593;</a>
      <Footer />
    </>
  );
};

export default WebSeries;
