// src/pages/Home.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularData, fetchTrendingData, fetchTopRatedData } from '../store/slice/homeSlice';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import CarouselElement from '../components/CarouselElement';
import BannerHome from '../components/BannerHome';
import Toast from '../components/Toast';

const Home = () => {    
    const dispatch = useDispatch();
    const { popular, trending, topRated, status, error } = useSelector((state) => state.home);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPopularData());
            dispatch(fetchTrendingData());
            dispatch(fetchTopRatedData());
        }
    }, [dispatch, status]);

    if (status === 'loading') {
        return (
          <>
            <Toast />
            <NavBar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10em' }}>
              <div className='loader'></div>
            </div>
          </>
        );
    }

    if (status === 'failed') {
        return (
            <>
                <NavBar />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div>Error fetching data: {error}</div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Toast />
            <NavBar />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <BannerHome />
                <CarouselElement title={'Trending'} text={'/movie'} popularData={trending} />
                <CarouselElement title={'Top Rated Tv show'} text={'/movie'} popularData={topRated} /> 
                <CarouselElement title={"What's Popular"} text={'/movie'} popularData={popular} />
            </div>
            <Footer />
        </>
    );
};

export default Home;
