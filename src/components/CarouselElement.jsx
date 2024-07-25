//fix css first then import it

import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import  '../Styles/carouselElement.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CircleRating from './CircleRating';
import { Link } from 'react-router-dom';
const CarouselElement = ({title}) => {
 

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
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
  <>
    <div className="container" style={{marginBottom : '15px',marginTop:'10px'}}>
      <p style={{marginBottom : '10px', fontWeight:'bolder',fontSize:'24px'}}>{title} on Movie Club</p> <div className="card">
      <Carousel responsive={responsive}>
   
          <Link to='/Single'>
          <div className="swiper-slide" style={{marginRight:"10px"}}>
            <img
              src="https://image.tmdb.org/t/p/w500/ba7hnMx1HAze0QSJSNfsTBycS8U.jpg"
              alt=""
            /><CircleRating  />
            <p>Movie Title</p>
            <p>Release Date</p>
          </div>
          </Link>

        <Link  to='/Single'>
        <div className="swiper-slide" style={{marginRight:"10px"}}>
            <img
              src="https://image.tmdb.org/t/p/w500/c3XBgBLzB9Sh7k7ewXY2QpfH47L.jpg"
              alt=""
            /><CircleRating  />
             <p>Movie Title</p>
             <p>Release Date</p>
          </div>
          </Link>

           <Link   to='/Single'>
          <div className="swiper-slide" style={{marginRight:"10px"}}>
            <img
              src="https://image.tmdb.org/t/p/w500/b5rOkbQ0jKYvBqBf3bwJ6nXBOtx.jpg"
              alt=""
            /><CircleRating  />
             <p>Movie Title</p>
             <p>Release Date</p>
          </div>
          </Link>

         <Link    to='/Single'>
          <div className="swiper-slide" style={{marginRight:"10px"}}>
            <img
              src="https://image.tmdb.org/t/p/w500/aNsrgElf0fiKBSR8cWWEL6XUTte.jpg"
              alt=""
            /><CircleRating  />
             <p>Movie Title</p>
             <p>Release Date</p>
          </div>
          </Link>

          <Link     to='/Single'>
          <div className="swiper-slide" style={{marginRight:"10px"}}>
            <img
              src="https://image.tmdb.org/t/p/w500/dueiWzWc81UAgnbDAyH4Gjqnh4n.jpg"
              alt=""
            /><CircleRating  />
             <p>Movie Title</p>
             <p>Release Date</p>
          </div>
          </Link>
          
          <Link      to='/Single'>
          <div className="swiper-slide" style={{marginRight:"10px"}}>
            <img
              src="https://image.tmdb.org/t/p/w500/hwNRc9ZWrakGdql22srY7DqtmRQ.jpg"
              alt=""
            /><CircleRating  />
             <p>Movie Title</p>
             <p>Release Date</p>
          </div>
          </Link>

          <Link       to='/Single'>
          <div className="swiper-slide" style={{marginRight:"10px"}}>
            <img
              src="https://image.tmdb.org/t/p/w500/trAOGwksvgHYNpbK4GewbjYQ1pi.jpg"
              alt=""
            /><CircleRating  />
             <p>Movie Title</p>
             <p>Release Date</p>
          </div>
          </Link>

          <Link        to='/Single'>
          <div className="swiper-slide" style={{marginRight:"10px"}}>
            <img
              src="https://image.tmdb.org/t/p/w500/zAIippNnm6o0gYEtjapbjQSxP8G.jpg"
              alt=""
            /><CircleRating  />
             <p>Movie Title</p>
             <p>Release Date</p>
          </div>
          </Link>

          <Link         to='/Single'>
          <div className="swiper-slide" style={{marginRight:"10px"}}>
            <img
              src="https://image.tmdb.org/t/p/w500/tNyJxHK3m7NAAKNYITLJ5oxS0YR.jpg"
              alt=""
            /><CircleRating  />
             <p>Movie Title</p>
             <p>Release Date</p>
          </div>
          </Link>

         <Link          to='/Single'>
          <div className="swiper-slide" style={{marginRight:"10px"}}>
            <img
              src="https://image.tmdb.org/t/p/w500/hMh1mR2kNl8kHjpIuPh4TICTwjo.jpg"
              alt=""
            /><CircleRating  />
             <p>Movie Title</p>
             <p>Release Date</p>
          </div>
          </Link>
          
          <Link           to='/Single'>
          <div className="swiper-slide" style={{marginRight:"10px"}}>
            <img
              src="https://image.tmdb.org/t/p/w500/c4EkF5JAZ83bUqNErhuSd9xw6uJ.jpg"
              alt=""
            />
            <CircleRating  />
             <p>Movie Title</p>
             <p>Release Date</p>
          </div>
          </Link>
      </Carousel>
    </div>
  </div>
  </>
  );
};

export default CarouselElement;

