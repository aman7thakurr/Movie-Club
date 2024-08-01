import { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../Styles/SearchResult.module.css'; 
import { IoSearchOutline } from "react-icons/io5";
import CircleRating from '../components/CircleRating';
import { Link } from 'react-router-dom';

const SearchResult = () => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchInput.length > 2) {
      setLoading(true);
      setError(null);

      const fetchData = async () => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=ef6d335af07081934aa88a703974311c&query=${searchInput}`);
          const data = await response.json();
          setResults(data.results); 
        } catch (err) {
          setError('Failed to fetch results');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setResults([]);
    }
  }, [searchInput]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <form
          className={styles.searchForm}
          onSubmit={(e) => e.preventDefault()} 
        >
          <input
            type="text"
            placeholder="Search here..."
            className={styles.searchInput}
            onChange={handleInputChange}
            value={searchInput}
          />
          <button type='button' className={styles.btn}>
            <IoSearchOutline />
          </button>
        </form>
        <h1 style={{fontSize: '26px'}}>Search Results  for {searchInput} </h1>
        {loading && 
    <>
    {/* <NavBar /> */}
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10em' }}>
      <div className='loader'></div>
    </div>
  </>

}
        {error && <p className={styles.error}>{error}</p>}
        {results.length === 0 &&searchInput.length !== 0 && !loading && !error && <p>No results found.</p>}
        <div
          className="card"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {results.map((movie) => (
            <Link
              to="/Single"
              state={{ movie }}
              key={movie.id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                className="swiper-slide"
                style={{ margin: '10px', textAlign: 'center' }}
              >
                <img
                  style={{
                    height: '480px',
                    width: 'auto',
                    borderRadius: '8px',
                    objectFit: 'cover', // Ensures the image covers the space properly
                  }}
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title ? `${movie.title} poster` : 'Movie poster'}
                  onError={(e) => e.currentTarget.src = 'path/to/fallback/image.jpg'} // Fallback image
                />
                <CircleRating vote_average={movie.vote_average.toFixed(1)} />
                <span
                  style={{
                    display: 'block',
                    marginTop: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  {movie.title}
                </span>
                <p>{movie.release_date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default SearchResult;
