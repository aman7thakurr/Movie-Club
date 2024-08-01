import { useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../Styles/navbar.module.css";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import { IoSearchOutline } from "react-icons/io5";
import userIcon from '../assets/user.png';
import axios from 'axios';

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

function NavBar() {
  const [click, setClick] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [displayedResults, setDisplayedResults] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const apiKey = 'ef6d335af07081934aa88a703974311c';

  const fetchData = useCallback(
    (value) => {
      if (value.trim() === "") {
        setSearchResults([]);
        setDisplayedResults([]);
        setShowMore(false);
        return;
      }
      axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: apiKey,
          query: value,
          language: 'en-US',
          page: 1,
          include_adult: false,
        },
      })
      .then((response) => {
        const results = response.data.results;
        setSearchResults(results);
        setDisplayedResults(results.slice(0, 4));
        setShowMore(results.length > 4);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setSearchResults([]);
        setDisplayedResults([]);
        setShowMore(false);
      });
    },
    [apiKey]
  );

  const debouncedFetchData = useCallback(debounce(fetchData, 300), [fetchData]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value.length >= 3) {
      debouncedFetchData(value);
    } else {
      setSearchResults([]);
      setDisplayedResults([]);
      setShowMore(false);
    }
  };

  const handleResultClick = (movie) => {
    navigate('/search', { state: { movie } });
    setSearchInput('');
    setSearchResults([]);
    setDisplayedResults([]);
    setShowMore(false);
  };

  const handleShowMore = () => {
    setDisplayedResults(searchResults);
    setShowMore(false);
  };

  const handleClick = () => setClick(!click);

  return (
    <nav className={styles.navbar}>
      <div className={styles["nav-container"]}>
        <NavLink exact to="/" className={styles["nav-logo"]}>
          <span>Movie Club</span>
          <span className={styles.icon}>
            <CodeIcon />
          </span>
        </NavLink>

        <ul className={click ? `${styles["nav-menu"]} ${styles.active}` : styles["nav-menu"]}>
          <li className={styles["nav-item"]}>
            <NavLink
              exact
              to="/"
              className={({ isActive }) => isActive ? styles.active : styles["nav-links"]}
              onClick={handleClick}
            >
              Home
            </NavLink>
          </li>
          <li className={styles["nav-item"]}>
            <NavLink
              exact
              to="/movie"
              className={({ isActive }) => isActive ? styles.active : styles["nav-links"]}
              onClick={handleClick}
            >
              Movies
            </NavLink>
          </li>
          <li className={styles["nav-item"]}>
            <NavLink
              exact
              to="/tv"
              className={({ isActive }) => isActive ? styles.active : styles["nav-links"]}
              onClick={handleClick}
            >
              TV Shows
            </NavLink>
          </li>
          <li className={styles["nav-item"]}>
            <NavLink
              exact
              to="/webseries"
              className={({ isActive }) => isActive ? styles.active : styles["nav-links"]}
              onClick={handleClick}
            >
              Web Series
            </NavLink>
          </li>
          <li className={`${styles["nav-item"]} ${styles.hideOnLarge}`}>
            <NavLink
              exact
              to="/login"
              className={({ isActive }) => isActive ? styles.active : styles["nav-links"]}
              onClick={handleClick}
            >
              Login
            </NavLink>
          </li>

          <div className={`ml-auto flex items-center gap-5 right-10 ${styles.custom}`}>
            <div className="relative">
              <input 
                type='text'
                placeholder='Search for movies...'
                className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block'
                value={searchInput}
                onChange={handleSearchChange}
              />
              {/* <button type='button' className='text-2xl text-white'>
                <IoSearchOutline />
              </button> */}

              {searchInput.length > 0 && (
                <div className={styles["search-results"]}>
                  {searchInput.length < 3 ? (
                    <div className={styles["loading"]}><span className={styles ["loader1"]}></span></div>
                  ) : (
                    <>
                      {displayedResults.length > 0 && (
                        <>
                          {displayedResults.map((result) => (
                            <div 
                              key={result.id} 
                              className={styles["search-result"]}
                              onClick={() => handleResultClick(result)}
                            >
                              {result.poster_path && (
                                <img
                                  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                                  alt={result.title}
                                  className={styles["result-image"]}
                                />
                              )}
                              <div className={styles["result-text"]}>
                                {result.title}
                              </div>
                            </div>
                          ))}
                          {showMore && (
                            <button
                              className={styles["show-more"]}
                              onClick={handleShowMore}
                            >
                              Show More
                            </button>
                          )}
                        </>
                      )}
                      {searchResults.length === 0 && searchInput.length >= 3 && (
                        <div className={styles["no-results"]}>
                          No results found
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            <NavLink to='/login'>
              <div className='w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all'>
                <img
                  src={userIcon}
                  alt="User"
                  className='w-full h-full'
                />
              </div>
            </NavLink>
          </div>
        </ul>

        <div className={styles["nav-icon"]} onClick={handleClick}>
          {click ? (
            <span className={styles.icon}>
              <HamburgetMenuClose />
            </span>
          ) : (
            <span className={styles.icon}>
              <HamburgetMenuOpen />
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
