import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularData, fetchTrendingData, fetchTopRatedData } from '../store/slice/homeSlice';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import CarouselElement from '../components/CarouselElement';
import SkeletonHome from '../skeleton/SkeletonHome';
import BannerHome from '../components/BannerHome';

const Home = () => {

      useEffect(() => {
        const title = "Details - Movie Club";
        const description = "Explore the latest movies available for streaming.";
        const url = window.location.href;
        const image = "https://img.freepik.com/free-photo/view-3d-cinema-theatre-room_23-2151067055.jpg?ga=GA1.1.1071293010.1722833002&semt=sph";
    
      
        document.title = title;
    

        const setMetaTag = (property, content) => {
          let tag = document.querySelector(`meta[property="${property}"]`);
          if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('property', property);
            document.head.appendChild(tag);
          }
          tag.setAttribute('content', content);
        };
    

        setMetaTag('og:url', url);
        setMetaTag('og:title', title);
        setMetaTag('og:image', image);
        setMetaTag('og:description', description);
    
        return () => {
         
          const removeMetaTag = (property) => {
            const tag = document.querySelector(`meta[property="${property}"]`);
            if (tag) {
              tag.remove();
            }
          };
    
          removeMetaTag('og:url');
          removeMetaTag('og:title');
          removeMetaTag('og:image');
          removeMetaTag('og:description');
        };
      }, []);

    
    


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
            <NavBar />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <BannerHome/>
                <CarouselElement title={'Trending'} text={'/movie'} popularData={trending} />
               <CarouselElement title={'Top Rated Tv show'} text={'/movie'} popularData={topRated} /> 
                <CarouselElement title={"What's Popular"} text={'/movie'} popularData={popular} />
            </div>
            <Footer />
        </>
    );
};

export default Home;
