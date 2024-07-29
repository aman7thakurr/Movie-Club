import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CircleRating from './CircleRating';
import { Link } from 'react-router-dom';

const CarouselElement = ({ title, popularData = [], isTV = false }) => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 6 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  if (!Array.isArray(popularData) || popularData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="container" style={{ marginBottom: '15px', marginTop: '10px' }}>
      <p style={{ marginBottom: '10px', fontWeight: 'bolder', fontSize: '34px' }}>{title}</p>
      <div className="card">
        <Carousel responsive={responsive}>
          {popularData.map(item => (
            <Link 
              to="/Single"
              state={{ movie: isTV ? null : item, tv: isTV ? item : null }}
              key={item.id}
            >
              <div className="swiper-slide" style={{ marginRight: "10px" }}>
                <img 
                  style={{ height: '480px', width: 'auto' }}
                  src={item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image'}
                  alt={item.title || item.name || 'Poster'}
                />
                <CircleRating vote_average={item.vote_average ? item.vote_average.toFixed(1) : 'N/A'} />
                <span>{item.title || item.name || 'No Title'}</span>
                <p>{item.release_date || item.first_air_date || 'No Release Date'}</p>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselElement;
