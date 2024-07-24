import React from 'react'
import NavBar from '../components/Navbar'
import Footer from '../components/Footer'
import CarouselElement from '../components/CarouselElement'
const Home = () => {
  return (
    <>
    <NavBar/>
    <div style={{display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"}}>
    <CarouselElement  title={'Trending'}/>
    <CarouselElement title={"What's Popular"}/>
    <CarouselElement title={'Top Rated'}/>
    </div>
    <Footer/>
    </>
  )
}

export default Home