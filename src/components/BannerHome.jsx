import { useEffect, useState } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BannerHome = () => {
    const [bannerData, setBannerData] = useState([]);
    const [imageURL, setImageURL] = useState('https://image.tmdb.org/t/p/original');
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=ef6d335af07081934aa88a703974311c');
                const data = await response.json();
                setBannerData(data.results);
            } catch (error) {
                console.error('Error fetching banner data:', error);
            }
        };

        fetchBannerData();
    }, []);

    const handleNext = () => {
        setCurrentImage(prev => (prev < bannerData.length - 1 ? prev + 1 : 0));
    };

    const handlePrevious = () => {
        setCurrentImage(prev => (prev > 0 ? prev - 1 : bannerData.length - 1));
    };

    useEffect(() => {
        const interval = setInterval(handleNext, 5000);
        return () => clearInterval(interval);
    }, [currentImage, bannerData.length]);

    return (
        <section className='w-full h-full'>
            <div className='flex min-h-full max-h-[91vh] overflow-hidden relative group'>
                {
                    bannerData.length > 0 ? bannerData.map((data, index) => (
                        <div
                            key={`${data.id}-bannerHome-${index}`}
                            className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative transition-transform duration-500'
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img
                                src={`${imageURL}${data.backdrop_path}`}
                                alt={data.title || data.name}
                                className='h-full w-full object-cover'
                                style={{opacity:'0.5'}} 
                            />

                            {/* Navigation buttons */}
                            <div className='absolute top-0 w-full h-full flex items-center justify-between px-4'>
                                <button
                                    onClick={handlePrevious}
                                    aria-label='Previous Slide'
                                    className='bg-white p-2 rounded-full text-xl z-10 text-black'>
                                    <FaAngleLeft />
                                </button>
                                <button
                                    onClick={handleNext}
                                    aria-label='Next Slide'
                                    className='bg-white p-2 rounded-full text-xl z-10 text-black'>
                                    <FaAngleRight /> 
                                </button>
                            </div>

                            <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>

                            <div className='container mx-auto'>
                                <div className='w-full absolute bottom-0 max-w-md px-3 py-4'>
                                    <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>
                                        {data?.title || data?.name}
                                    </h2>
                                    <p className='text-ellipsis line-clamp-3 my-2'>
                                        {data.overview}
                                    </p>
                                    <div className='flex items-center gap-4'>
                                        <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                                        <span>|</span>
                                        <p>Views: {Number(data.popularity).toFixed(0)}</p>
                                    </div>
                                    <Link 
                                        to="/single"
                                        state={{ movie: data }}
                                    >
                                        <button className='bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'>
                                            Play Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p>...</p>
                    )
                }
            </div>
        </section>
    );
};

export default BannerHome;
