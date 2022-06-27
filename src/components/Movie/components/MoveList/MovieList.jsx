import tmdbApi, { category } from 'api/tmdbApi';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.scss';

const MovieList = (props) => {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};
      
      try {
        if (props.category === 'movie') {
          response = await tmdbApi.getMovieList(props.type, { params });
        } else if (props.category === 'tv') {
          response = await tmdbApi.getTvList(props.type, { params });
        }
      } catch (error) {
        console.log('Fail to fetch movie list: ', error)
      }
      setItems(response.results);
    };
    getList();
    return () => {
      setItems({}); 
    };
  }, [props.category, props.type]);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={0} slidesPerView={'auto'}>
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={props.category}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
