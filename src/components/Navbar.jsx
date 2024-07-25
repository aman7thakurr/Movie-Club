import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../Styles/navbar.module.css"; // Import CSS Module
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import { IoSearchOutline } from "react-icons/io5";
import userIcon from '../assets/user.png'
function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const handleSubmit = (e)=>{
    e.preventDefault()
}
  return (
    <nav className={styles.navbar}> {/* Use styles.navbar for the main nav */}
      <div className={styles["nav-container"]}> {/* Use styles["nav-container"] */}
        <NavLink exact to="/" className={styles["nav-logo"]}> {/* Use styles["nav-logo"] */}
          <span>Movie Club</span>
          <span className={styles.icon}>
            <CodeIcon />
          </span>
        </NavLink>

        <ul className={click ? `${styles["nav-menu"]} ${styles.active}` : styles["nav-menu"]}> {/* Conditional class based on click state */}
          <li className={styles["nav-item"]}>
            <NavLink
              exact
              to="/"
              activeclassname={styles.active}
              className={styles["nav-links"]}
              onClick={handleClick}
            >
              Home
            </NavLink>
          </li>
          <li className={styles["nav-item"]}>
            <NavLink
              exact
              to="/Movies"
              activeclassname={styles.active}
              className={styles["nav-links"]}
              onClick={handleClick}
            >
              Movies
            </NavLink>
          </li>
          <li className={styles["nav-item"]}>
            <NavLink
              exact
              to="/TvShows"
              activeclassname={styles.active}
              className={styles["nav-links"]}
              onClick={handleClick}
            >
              Tv Shows
            </NavLink>
           
          </li>
          <li className={styles["nav-item"]}>
           <NavLink
              exact
              to="/Webseries"
              activeclassname={styles.active}
              className={styles["nav-links"]}
              onClick={handleClick}
            >
              Web Series
            </NavLink>

         </li>
          <div   className={`ml-auto flex items-center gap-5 right-10 ${styles.custom}`}>
                    <form  className='flex items-center gap-2' onSubmit={handleSubmit}>
                        <input 
                            type='text'
                            placeholder='Search here...'
                            className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block'
                            // onChange={(e)=>setSearchInput(e.target.value)}
                            // value={searchInput}
                        />
                        <button className='text-2xl text-white'>
                                <IoSearchOutline/>
                        </button>
                    </form>
                    <div className='w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all'>
                        <img
                            src={userIcon}
                            width='w-ful h-full' 
                        />
                    </div>
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
