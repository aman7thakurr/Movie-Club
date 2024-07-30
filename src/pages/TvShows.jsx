import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import CircleRating from '../components/CircleRating';
import ReactPaginate from 'react-paginate';
import '../Styles/tvshow.css'
import SkeletonHome from '../skeleton/SkeletonHome';
const TvShows = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = 'ef6d335af07081934aa88a703974311c';

  const fetchData = async (page = 1) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get('https://api.themoviedb.org/3/discover/tv', {
        params: {
          api_key: apiKey,
          page,
        },
      });

      if (response.data && response.data.results) {
        setData(response.data.results);
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

  const handlePageChange = (selectedPage) => {
    setPageNo(selectedPage.selected + 1);   
  };

  useEffect(() => {
    fetchData(pageNo);
  }, [pageNo]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
    fetchData(1);
  }, [params.explore]);

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
                  Tv Shows
                </p>
                </div>
              
  
  <div className='selectDiv'  style={{width:'100%'}}>
    <span className='spanS' style={{position:'relative',right:'-64%', color:'black'}} ><select className='selectS' name="Genre" id="" style={{width:'17%',borderRadius:'21px', color:'black'}}>
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
          {data.length === 0 && !loading && !error ? (
            <p>No TV shows found.</p>
          ) : (
            <>
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
                        alt={show.name || 'Show poster'}
                      />
                      <CircleRating vote_average={show.vote_average.toFixed(1)} />
                      <span style={{ display: 'block', marginTop: '10px', fontWeight: 'bold' }}>{show.name}</span>
                      <p>{show.first_air_date}</p>
                    </div>
                  </Link>
                ))}
                {<>
 
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
    <SkeletonHome /></div>
  </>  && <p>Loading...</p> }
              </div>
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={totalPageNo}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
              />
            </>
          )}
        </div>
      </div>
      <a href="#" className="top">Back to Top &#8593;</a>
      <Footer />
    </>
  );
};

export default TvShows;
