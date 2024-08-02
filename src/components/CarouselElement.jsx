import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CircleRating from './CircleRating';
import { Link } from 'react-router-dom';

const CarouselElement = ({ text,title, popularData = [], isTV = false }) => {
  // console.log(popularData);
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 6 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1080, min: 464 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  if (!Array.isArray(popularData) || popularData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="container" style={{ marginBottom: '15px', marginTop: '30px',display:'flex',flexDirection:'column',  }}>
      <span style={{ marginBottom: '10px',marginTop:'20px', fontWeight: 'bolder', fontSize: '34px', textAlign:'center' }}>{title}</span>
     
     <span style={{textAlign:'end',marginBottom:'10px', marginRight:'4%',cursor:'pointer'}}><Link to={`${text}`} style={{cursor:'pointer'}}> View More &gt;&gt;</Link></span>
     
      <div className="card">
        <Carousel responsive={responsive}>
          {popularData.map(item => (
            <Link 
              to="/Single"
              state={{ movie: isTV ? null : item, tv: isTV ? item : null }}
              key={item.id}
              
            >
              <div className="swiper-slide" style={{marginRight : '10px' }}>
                <img 
                  style={{   width: "100% !important",
                    height: "auto !important",
                    margin: "0 !important",
                    borderRadius: "16px",
                    border: "1px solid #232f41",}}
                  src={item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image'}
                  alt={item.title || item.name || 'Poster'}
                />
                {/* <p style={{marginLeft : '17%'}}><CircleRating vote_average={item.vote_average ? item.vote_average.toFixed(1) : 'N/A'} /></p> */}
                <span style={{  fontSize: "20px",
                  marginBottom: "10px",
                  lineHeight: "24px",
                  display: "-webkit-box",
                  webkitLineClamp: "1",
                  webkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  marginLeft: "0 !important",
                  fontWeight: "600",
                  marginTop: "10px",}}>{item.title || item.name || 'No Title'}</span>
                <p style={{ fontSize: "14px",
    opacity: ".5",
    lineHeight: "1",
    fontWeight: "500",
    color: "#fff"
    ,marginLeft: "0 !important" }}>{item.release_date || item.first_air_date || 'No Release Date'}</p>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselElement;
