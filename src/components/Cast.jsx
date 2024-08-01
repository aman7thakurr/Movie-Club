import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'; // Import styles
import styles from '../Styles/cast.module.css';

// Sample data for the cast (replace with actual data or props)
// const castData = [
//   { id: 1, name: 'Actor 1', character: 'Character 1', imgSrc: 'https://via.placeholder.com/150' },
//   { id: 2, name: 'Actor 2', character: 'Character 2', imgSrc: 'https://via.placeholder.com/150' },
//   { id: 3, name: 'Actor 3', character: 'Character 3', imgSrc: 'https://via.placeholder.com/150' },
//   { id: 4, name: 'Actor 4', character: 'Character 4', imgSrc: 'https://via.placeholder.com/150' },
//   { id: 5, name: 'Actor 5', character: 'Character 5', imgSrc: 'https://via.placeholder.com/150' },
//   { id: 6, name: 'Actor 6', character: 'Character 6', imgSrc: 'https://via.placeholder.com/150' },
// ];

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const Cast = ({castResults}) => {
  // console.log(castResults);
  return (
    <>
      <h1 style={{ fontSize: '35px', marginTop: '200px', fontWeight: '600' }}>Cast</h1>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={3000}
        transitionDuration={500}
        containerClass="carousel-container"
      >
        {castResults?.map((cast) => (
          <div key={cast.id} className={styles.card}>
            <div className={styles.image}>
              <img src={`https://image.tmdb.org/t/p/original${cast.profile_path}`} alt={cast.name} />
            </div>
            <p className={styles.name}>{cast.name}</p>
            <p className={styles.character}>{cast.character}</p>
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default Cast;
