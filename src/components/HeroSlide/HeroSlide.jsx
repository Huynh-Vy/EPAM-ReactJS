import tmdbApi, { movieType } from 'api/tmdbApi';
import React, { useEffect, useState } from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import './HeroSlide.scss';
import HeroSlideItem from './HeroSlideItem';

HeroSlide.propTypes = {};

function HeroSlide(props) {
  SwiperCore.use([Autoplay]);
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMovieList(movieType.popular, {
          params,
        });
        setMovieItems(response.results.slice(0, 4));
        console.log(response);
      } catch (error) {
        console.log('Fail to fetch movie list: ', error);
      }
    };
    getMovies();

    return () => {
      setMovieItems({});
    }
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? 'active' : ''}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroSlide;
