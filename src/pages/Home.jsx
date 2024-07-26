import { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import CarouselElement from '../components/CarouselElement';

const Home = () => {
  const [popularData, setPopularData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [topRatedData, setTopRatedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const urls = [
          'https://api.themoviedb.org/3/discover/movie?api_key=ef6d335af07081934aa88a703974311c',
          'https://api.themoviedb.org/3/trending/movie/week?api_key=ef6d335af07081934aa88a703974311c',
          'https://api.themoviedb.org/3/movie/popular?api_key=ef6d335af07081934aa88a703974311c'
        ];

      
        const [discoverResponse, trendingResponse, popularResponse] = await Promise.all(
          urls.map(url => fetch(url))
        );

        
        if (!discoverResponse.ok || !trendingResponse.ok || !popularResponse.ok) {
          throw new Error('Network response was not ok');
        }

        
        const [discoverData, trendingData, popularData] = await Promise.all([
          discoverResponse.json(),
          trendingResponse.json(),
          popularResponse.json()
        ]);

        
        setPopularData(popularData.results);
        setTrendingData(trendingData.results);
        setTopRatedData(discoverData.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <>
      <NavBar />
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <CarouselElement title={'Trending'} popularData={trendingData} />
        <CarouselElement title={"What's Popular"} popularData={popularData} />
        <CarouselElement title={'Top Rated'} popularData={topRatedData} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
