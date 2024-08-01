import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import styles from "../Styles/navbar.module.css"; // Import CSS Module
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import { IoSearchOutline } from "react-icons/io5";
import userIcon from '../assets/user.png';

function NavBar() {
  const [click, setClick] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || "";
    setSearchInput(query);
  }, [location.search]);

  useEffect(() => {
    if (searchInput.length > 2) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput, navigate]);

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
              Tv Shows
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
          <li className={`${styles["nav-item"]} `
          //  ${styles.hideOnLarge}`
          }>
           <NavLink to='/search' className={({ isActive }) => isActive ? styles.active : styles["nav-links"]}>
             Search
              <button type='button'  className='text-2xl text-white'>
                {/* <IoSearchOutline /> */}
              </button>
            </NavLink>
            </li>
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
