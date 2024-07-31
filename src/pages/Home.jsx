import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularData, fetchTrendingData, fetchTopRatedData } from '../store/slice/homeSlice';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import CarouselElement from '../components/CarouselElement';
import SkeletonHome from '../skeleton/SkeletonHome';

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
                <NavBar />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <SkeletonHome />
                </div>
                <Footer />
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
            <NavBar />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <CarouselElement title={'Trending'} popularData={trending} />
                <CarouselElement title={"What's Popular"} popularData={popular} />
                <CarouselElement title={'Top Rated'} popularData={topRated} />
            </div>
            <Footer />
        </>
    );
};

export default Home;
