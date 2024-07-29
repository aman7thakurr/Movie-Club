import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import CircleRating from '../components/CircleRating';

const WebSeries = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    fetchData();
  }, [params.explore]);

  return (
    <>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="container" style={{ marginBottom: '15px', marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ marginBottom: '10px', fontWeight: 'bolder', fontSize: '34px' }}>
            Popular Web Series
          </p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {data.length === 0 && !loading && !error ? (
            <p>No web series found.</p>
          ) : (
            <div className="card" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {data.map(show => (
                <Link 
                  to="/Single"
                  state={{ show }} 
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
              {loading && <p>Loading more...</p>}
            </div>
          )}
          <button
            onClick={handleLoadMore}
            disabled={loading || pageNo >= totalPageNo}
            style={{
              padding: '10px 20px',
              marginTop: '20px',
              fontSize: '16px',
              cursor: loading || pageNo >= totalPageNo ? 'not-allowed' : 'pointer',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            {loading ? 'Loading...' : pageNo >= totalPageNo ? 'No More Data' : 'Load More'}
          </button>
        </div>
      </div>
      <a href="#" className="top">Back to Top &#8593;</a>
      <Footer />
    </>
  );
};

export default WebSeries;
