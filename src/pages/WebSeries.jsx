import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchWebSeries, setPageNo, setGenre, setSortBy } from '../store/slice/webSeriesSlice';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import CircleRating from '../components/CircleRating';
import SkeletonHome from '../skeleton/SkeletonHome';

const WebSeries = () => {

  useEffect(() => {
    const title = "Web Series - Movie Club";
    const description = "Explore the latest movies available for streaming.";
    const url = window.location.href;
    const image = "https://img.freepik.com/free-photo/view-3d-cinema-theatre-room_23-2151067055.jpg?ga=GA1.1.1071293010.1722833002&semt=sph";

  
    document.title = title;


    const setMetaTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };


    setMetaTag('og:url', url);
    setMetaTag('og:title', title);
  

    return () => {
     
      const removeMetaTag = (property) => {
        const tag = document.querySelector(`meta[property="${property}"]`);
        if (tag) {
          tag.remove();
        }
      };

      removeMetaTag('og:url');
      removeMetaTag('og:title');

    };
  }, []);

  const dispatch = useDispatch();
  const { data, totalPageNo, pageNo, status, error, genre, sortBy, hasMore } = useSelector((state) => state.webSeries);
  const params = useParams();

  useEffect(() => {
    dispatch(fetchWebSeries({ page: pageNo, genre, sortBy }));
  }, [dispatch, pageNo, genre, sortBy]);

  useEffect(() => {
    dispatch(setPageNo(1)); // Reset to page 1 on genre or sort change
    dispatch(fetchWebSeries({ page: 1, genre, sortBy }));
  }, [genre, sortBy]);

  const handleLoadMore = () => {
    if (pageNo < totalPageNo) {
      dispatch(setPageNo(pageNo + 1));
    }
  };

  const isLoading = status === 'loading';

  return (
    <>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="container" style={{ marginBottom: '15px', marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="movieheader" style={{ display: 'flex', justifyContent: 'center', width: '100%', paddingRight: '6%', paddingLeft: '6%' }}>
            <div className='pDiv'>
              <p style={{ marginBottom: '10px', fontWeight: 'bolder', fontSize: '34px', width: 'max-content' }}>
                Web Series
              </p>
            </div>

            <div className='selectDiv' style={{ width: '100%' }}>
              <span className='spanS' style={{ position: 'relative', right: '-64%', color: 'black' }}>
                <select
                  className='selectS'
                  name="Genre"
                  value={genre}
                  onChange={(e) => dispatch(setGenre(e.target.value))}
                  style={{ width: '17%', borderRadius: '21px', color: 'black' }}
                >
                  <option value="">-- Select Genre --</option>
                  <option value="10759">Action</option>
                  <option value="16">Animation</option>
                  <option value="80">Crime</option>
                  <option value="35">Comedy</option>
                  <option value="99">Documentary</option>
                  <option value="18">Drama</option>
                  <option value="10751">Family</option>
                  <option value="10764">Reality</option>
                  <option value="10765">Sci-Fi</option>
                </select>
              </span>
              <span className='spanS' style={{ position: 'relative', right: '-66%', color: 'black' }}>
                <select
                  className='selectS'
                  name="Sort"
                  value={sortBy}
                  onChange={(e) => dispatch(setSortBy(e.target.value))}
                  style={{ width: '17%', borderRadius: '21px', color: 'black' }}
                >
                  <option value="air_date.asc">Air Date: Ascending</option>
                  <option value="air_date.desc">Air Date: Descending</option>
                  <option value="popularity.asc">Popularity: Ascending</option>
                  <option value="popularity.desc">Popularity: Descending</option>
                  <option value="vote_average.asc">Rating: Ascending</option>
                  <option value="vote_average.desc">Rating: Descending</option>
                </select>
              </span>
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
  style={{
    height: '480px',
    width: 'auto',
    borderRadius: '8px',
  }}
  src={`https://image.tmdb.org/t/p/original${show.poster_path}`}
  alt={show.title || 'Movie poster'}
  onError={(e) => {
    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
  }}
/>

                  {/* <CircleRating vote_average={show.vote_average.toFixed(1)} /> */}
                  <span style={{ display: 'block', marginTop: '10px', fontWeight: 'bold' }}>{show.name}</span>
                  <p>{show.first_air_date}</p>
                </div>
              </Link>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <SkeletonHome />
              </div>
            )}
          </div>
          {hasMore && !isLoading && (
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
