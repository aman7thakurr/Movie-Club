import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import CircleRating from './CircleRating';
import { Link } from 'react-router-dom';

const CarouselElement = ({ title, popularData = [] }) => {

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="container" style={{ marginBottom: '15px', marginTop: '10px' }}>
      <p style={{ marginBottom: '10px', fontWeight: 'bolder', fontSize: '34px' }}>{title}</p>
      <div className="card">
        <Carousel responsive={responsive}>
          {popularData.map(movie => (
            <Link 
              to="/Single"
              state={{ movie }} // Correctly pass the movie data
              key={movie.id}
            >
              <div className="swiper-slide" style={{ marginRight: "10px" }}>
                <img 
                  style={{ height: '480px', width: 'auto' }}
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title || 'Movie poster'} // Provide fallback alt text
                />
                <CircleRating vote_average={movie.vote_average.toFixed(1)} />
                <span>{movie.title}</span>
                <p>{movie.release_date}</p>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselElement;
