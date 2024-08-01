import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchTvShows, setPageNo, setGenre, setSortBy } from '../store/slice/tvShowsSlice';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import CircleRating from '../components/CircleRating';
import ReactPaginate from 'react-paginate';
import '../Styles/tvshow.css';
import SkeletonHome from '../skeleton/SkeletonHome';

const TvShows = () => {
  const dispatch = useDispatch();
  const { data, totalPageNo, pageNo, status, error, genre, sortBy } = useSelector((state) => state.tvShows);
  const params = useParams();

  useEffect(() => {
    dispatch(fetchTvShows({ page: pageNo, genre, sortBy }));
  }, [dispatch, pageNo, genre, sortBy]);

  useEffect(() => {
    dispatch(setPageNo(1)); // Reset to page 1 on genre or sort change
    dispatch(fetchTvShows({ page: 1, genre, sortBy }));
  }, [genre, sortBy]);

  const handlePageChange = ({ selected }) => {
    dispatch(setPageNo(selected + 1));
  };

  const handleGenreChange = (event) => {
    dispatch(setGenre(event.target.value));
  };

  const handleSortChange = (event) => {
    dispatch(setSortBy(event.target.value));
  };

  const isLoading = status === 'loading';
  
  if (status === 'loading') {
    return (
      <>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10em' }}>
        <div className='loader'></div>
      </div>
    </>
    );
  }
  return (
    <>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="container" style={{ marginBottom: '15px', marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="movieheader" style={{ display: 'flex', justifyContent: 'center', width: '100%', paddingRight: '6%', paddingLeft: '6%' }}>
            <div className='pDiv'>
              <p style={{ marginBottom: '10px', fontWeight: 'bolder', fontSize: '34px', width: 'max-content' }}>
                Tv Shows
              </p>
            </div>

            <div className='selectDiv' style={{ width: '100%' }}>
              <span className='spanS' style={{ position: 'relative', right: '-64%', color: 'black' }}>
                <select
                  className='selectS'
                  name="Genre"
                  value={genre}
                  onChange={handleGenreChange}
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
                  onChange={handleSortChange}
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
          {data.length === 0 && !isLoading && !error ? (
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
                {isLoading && (
                  <>
                  <NavBar />
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10em' }}>
                    <div className='loader'></div>
                  </div>
                </>
                )}
              </div>
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={totalPageNo}
                marginPagesDisplayed={1}
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
