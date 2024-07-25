import React from 'react'
import { FcStart} from "react-icons/fc";
import styles from '../Styles/single.module.css'
import NavBar from '../components/Navbar'
import Footer from '../components/Footer'
import CircleRating from '../components/CircleRating'
import CarouselElement from '../components/CarouselElement'
import Cast from '../components/Cast';

const Single = () => {
  return (
    <>
    <NavBar/>
    <div className={styles.parent}>
    <div className={styles.container}>
       <div className={styles.image}> <img src="" alt="" /></div>
        <div className={styles.details}> 
            <div className={styles.title}> <h1> Movie Title</h1></div>
            <div className={styles.subTitle}><h3> Movie Sub Title</h3></div>
            <div className={styles.genre}><span>Genre</span></div>
            <div className={styles.rating}><span><CircleRating/></span> <span><FcStart style={{fontSize:'82px'}} /></span><h2 style={{fontWeight:'500',fontSize:'20px'}}>Watch Trailer</h2></div>
            <div className={styles.heading}>Overview</div>
            <div className={styles.description}><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam pariatur id molestiae ratione suscipit quidem provident ea magnam soluta ipsam?</span></div>
            <div className={styles.info}><span>Status : </span> <span>Release Date : </span> <span>Runtime : </span></div><hr />
            <div className={styles.info}> <span>Director :</span></div><hr />
            <div className={styles.info}><span>Writer :</span> </div><hr />
        </div> 
    </div>
    <Cast/>
    <CarouselElement title={'Recommendation'}/>
    <CarouselElement title={'Similar'}/>
    </div>
    <Footer/>
  </>
  )
}

export default Single